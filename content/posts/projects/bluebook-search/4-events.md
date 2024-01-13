---
title: Recherche plain texte sur Cloud Firestore à l'aide de MeiliSearch 4 - Événements
description: Configuration et connexion de l'API à l'instance MeiliSearch
tags: [gcp, nodejs, cloud-functions,vm, meilisearch, firestore]
topics: [gcp, nodejs]
date: 2022-01-22
slug: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-4-evenements
next: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-5-problemes
prev: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-3-meilisearch
---

Content de vous revoir. Précédemment, nous avons configuré notre VM, installé et configuré MeiliSearch.

Dans cette partie, nous allons créer une fonction cloud événementielle 
qui sera déclenchée lorsque les opérations seront effectuées dans nos données Cloud Firestore.

### Ce que nous voulons
Nous voulons 3 choses :

- lorsqu'un nouveau post est ajouté: nous voulons prendre ce post et l'envoyer à MeiliSearh pour qu'il soit enregistré
- lorsqu'un article est mis à jour: nous voulons prendre l'article mis à jour et mettre à jour le document correspondant dans MeiliSearh
- quand un post est supprimé : on veut supprimer le document correspondant dans MeiliSearh


## Déclencheurs Google Cloud Firestore
Cloud Firestore a la capacité de déclencher un événement lorsqu'une opération est effectuée dans la base de données

> Attention, cette fonctionnalité est encore en bêta.

Les événements pris en charge sont les événements de création, de mise à jour, de suppression et d'écriture. 
L'événement d'écriture se déclenche toutes les modifications d'un document.

Voici un exemple des données envoyées par les déclencheurs Firestore à la fonction Cloud

```json
{
  "oldValue": {
    "createTime": "2021-05-11T04:18:53.600783Z",
    "fields": {
      "description": {
        "stringValue": "Sed voluptates eos. "
      },
      "title": {
        "stringValue": "Rerum cupiditate in vel. "
      }
    },
    "name": "projects/bluebook-search/databases/(default)/documents/posts/ksP4335m2bhSzNYZ5YEG",
    "updateTime": "2021-05-11T04:21:16.351247Z"
  },
  "updateMask": { "fieldPaths": ["title", "description"] },
  "value": {
    "createTime": "2021-05-11T04:18:53.600783Z",
    "fields": {
      "description": {
        "stringValue": "Vero reiciendis ."
      },
      "title": {
        "stringValue": "Et corrupti et rerum ex asperiores enim consequatur. Nihil et fugiat optio aliquid. Dolore."
      }
    },
    "name": "projects/bluebook-search/databases/(default)/documents/posts/ksP4335m2bhSzNYZ5YEG",
    "updateTime": "2021-05-11T04:21:16.351247Z"
  }
}
```

Plus d'exemple dans ce [commit](https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/0944184d17bf797677bb8c97b5dd772c31111ed3/posts-api-event-handler/events-data)

La description
```javascript
{
    "oldValue": { // Update and Delete operations only
        // Un objet Document contenant un instantané de document de pré-opération
    },
    "updateMask": { // Update operations only
        // Un objet DocumentMask qui répertorie les champs modifiés.
    },
    "value": {
        // Un objet Document contenant un instantané de document post-opération
    }
}
```

Puisque nous devons réagir à 3 événements de Firestore (créer, mettre à jour et supprimer), nous devons écrire et déployer 3 nouvelles fonctions Cloud.
L'utilisation de l'événement d'écriture peut être une alternative, mais elle introduira une nouvelle logique.


## Le connecteur VPC
Tout d'abord, créons le Serverless VPC Access
```shell
gcloud compute networks vpc-access connectors  create posts-handlers-connector \ 
  --network default \
  --region europe-west1 \
  --range 10.8.0.0/28
```

Nous pouvons vérifier la création de notre connecteur avec la commande
```shell
gcloud compute networks vpc-access connectors describe posts-handlers-connector \
--region europe-west1
```


## Lorsqu'un post est ajouté
Lorsqu'un article est ajouté, nous voulons le prendre et l'envoyer à MeiliSearch pour qu'il soit enregistré.
Nous utiliserons le SDK JavaScript MeiliSearch. Il faut d'abord l'installer

```shell
npm install --save meilisearch
```

Ensuite nous l'initialiserons avec nos configurations
```javascript
const { MeiliSearch } = require('meilisearch')

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
  apiKey: 'masterKey',
})
```

Dans notre configuration, notre host est l'adresse IP privée de notre VM puisque nous nous y connectons via le VPC Serverless Access et l'apiKey est la clé Master que nous avons enregistrée dans Secret Manager (partie 3).
Pour accéder à notre secret, nous aurons besoin de NodeJS Librairie for Secret Manager.
```shell
npm install --save @google-cloud/secret-manager
```

Dans le `secrets.service.js` nous aurons un code comme celui-ci

```javascript[secrets.service.js]
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function getSecretVersion(secretName) {
    const [version] = await client.accessSecretVersion({ name: secretName, });
    const payload = version.payload.data.toString();
    return payload
}

module.exports = {
    getSecretVersion,
}
```

> N'oubliez pas d'ajouter l'autorisation `secretmanager.versions.access` au compte de service AppEngine et 
> que le secretName doit suivre le format `projects/my-project/secrets/my-secret/versions/latest`


La fonction pour gérer l'événement post-ajouté ressemble à ceci

```javascript
async function onPostAdded(event) {
    const client = await searchService.getMeilisearchClient();
    const index = config.meilisearchPostsIndex

    // Get the added document
    const addedDocument = event.value;

    // Get the id, title and description
    const postId = addedDocument.name.split('/posts/')[1]
    const postTitle = addedDocument.fields.title.stringValue;
    const postDescription = addedDocument.fields.description.stringValue;

    // Add the document to the posts index in meilisearch
    return await client.index(index).addDocuments(
        [
            {
                id: postId,
                title: postTitle,
                description: postDescription
            }
        ]
    )
}
```

Pour le déployer, nous allons utiliser cette très longue commande

```shell
gcloud functions deploy postAddedHandler \
--entry-point=postAddedHandler \
--runtime nodejs14 \
--set-env-vars MEILISEARCH_ADDRESS=http://10.132.0.2 \
--trigger-event "providers/cloud.firestore/eventTypes/document.create" \
--trigger-resource "projects/bluebook-search/databases/(default)/documents/posts/{id}" \
--region=europe-west1 \
--vpc-connector posts-handlers-connector
```


## Lorsqu'un post est mis à jour

```javascript

async function onPostUpdated(event) {
    const client = await searchService.getMeilisearchClient();
    const index = config.meilisearchPostsIndex

    // Get the added document
    const updatedDocument = event.oldValue;

    if (updatedDocument) {
        // Get the id, title and description
        const postId = updatedDocument.name.split('/posts/')[1]
        const postTitle = updatedDocument.fields.title.stringValue;
        const postDescription = updatedDocument.fields.description.stringValue;

        try {
            const response = await client.index(index).updateDocuments(
                [
                    {
                        id: postId,
                        title: postTitle,
                        description: postDescription
                    }
                ]
            )
            console.log(`updating document to ${index} with operation : ${response.updateId}`)

        } catch (error) {
            console.error(`updating document to ${index} failed`);
            throw error;
        }
    }

}
```

Déploiement

```shell
gcloud functions deploy postUpdatedHandler \
--entry-point=postUpdatedHandler \
--runtime nodejs14 \
--set-env-vars MEILISEARCH_ADDRESS=http://10.132.0.2 \
--trigger-event "providers/cloud.firestore/eventTypes/document.update" \
--trigger-resource "projects/bluebook-search/databases/(default)/documents/posts/{id}" \
--region=europe-west1 \
--vpc-connector posts-handlers-connector
```

Pour le code complet, jetez un oeil à ce [commit](https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/b23640e3bda9620e225084267fb1a66a5fc0f6de)

## Simplification
Nous pouvons réduire les fonctions cloud du gestionnaire d'événements en utilisant l'événement d'écriture `write` de Cloud Firestore couplé à une certaine logique. 
Puisque nous avons déjà la logique 3 pour la gestion de l'opération de création `create`, de mise à jour `update` et de suppression `delete`, nous n'avons qu'à lancer la bonne fonction en fonction de l'événement.

La nouvelle logique ressemblera à ceci :

La différence entre les valeurs de chaque événement peut nous aider à savoir de quel événement il s'agit
- Si l'objet de valeur `value` dans l'événement n'est pas vide et que l'objet `oldValue` n'est pas vide non plus, il s'agit d'un événement de mise à jour. Nous pouvons également vérifier l'objet `updateMask`. S'il n'est pas vide, il s'agit d'un événement de mise à jour.
- Si l'objet de valeur `value`dans l'événement n'est pas vide et que `oldValue` est vide, il s'agit d'un événement de création.
- Si l'objet `oldValue` dans l'événement n'est pas vide et que la valeur est vide, il s'agit d'un événement de suppression.

code

```javascript
const { onPostAdded } = require('./post-added.handler')
const { onPostDeleted } = require('./post-deleted.handler')
const { onPostUpdated } = require('./post-updated.handler')
const isEmpty = require('lodash/isEmpty')


async function onPostWritten(event) {
    const value = event.value;
    const oldValue = event.oldValue;
    const updateMask = event.updateMask;

    if (!isEmpty(updateMask)) {
        // It is an update event
        await onPostUpdated(event)
    } else if (isEmpty(value) && !isEmpty(oldValue)) {
        // It is an delete event
        await onPostDeleted(event)
    } else if (!isEmpty(value) && isEmpty(oldValue)) {
        // It is an create event
        await onPostAdded(event)
    } else {
        console.error('the event does not match any condition')
    }
}
```

```javascript[index.js]
require('dotenv').config()
const { onPostWritten } = require('./handlers')

exports.postWrittenHandler = onPostWritten
```

Déploiement

```shell
gcloud functions deploy postWrittenHandler \
--entry-point=postWrittenHandler \
--runtime nodejs14 \
--set-env-vars MEILISEARCH_ADDRESS=http://10.132.0.2 \
--trigger-event "providers/cloud.firestore/eventTypes/document.write" \
--trigger-resource "projects/bluebook-search/databases/(default)/documents/posts/{id}" \
--region=europe-west1 \
--vpc-connector posts-handlers-connector
```

## La recherche
La dernière étape de cet article consiste à ajouter l'endpoint de recherche à l'API.
Pour simplifier les choses, nous ajouterons la recherche au point de terminaison `/posts` déjà existant.
Si un paramètre de requête `q` est ajouté avec une valeur alors nous ferons la recherche avec notre moteur de recherche.

```javascript[posts.service.js]
const searchPosts = async (key) => {
    const client = await searchService.getMeilisearchClient();
    const index = config.meilisearchPostsIndex;

    return client.index(index).search(key);
};
```

```javascript[posts.controller.js]
const getPosts = catchAsync(async (req, res) => {
    const key = req.query.q
    let posts = [];

    if (key) {
        const result = await postsService.searchPosts(key);
        posts = result.hits;
    } else {
        posts = await postsService.getPosts();
    }
    return res.status(200).send(posts);
});

```

Puisque notre API se connecte maintenant à notre VPC d'accès sans serveur, nous devons mettre à jour la commande de déploiement.

```shell
gcloud functions deploy postsApi \
--entry-point=postsApi \
--set-env-vars MEILISEARCH_ADDRESS=http://10.132.0.2 \
--runtime nodejs14 \
--trigger-http \
--region=europe-west1 \
--vpc-connector posts-handlers-connector \
--allow-unauthenticated
```


.
#### Test
![test](/images/bluebook/test.png)


Félicitation 👌🏾, tout fonctionne bien.

Dans la prochaine et dernière, nous explorerons les petits problèmes de notre approche.
