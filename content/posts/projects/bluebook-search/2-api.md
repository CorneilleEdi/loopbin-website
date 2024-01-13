---
title: Recherche plain texte sur Cloud Firestore à l'aide de MeiliSearch 2 - api
description: Créer une API avec Cloud Firestore et Cloud Functions
tags: [gcp, nodejs, cloud-functions,vm, meilisearch, firestore]
topics: [gcp, nodejs]
date: 2022-01-20 
slug: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-2-api
next: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-3-meilisearch
prev: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-1-introduction
---

Content de vous revoir. Dans cette partie, nous allons configurer et créer l'API CRUD Restful avec Cloud Firestore et Cloud Functions. Cette partie ne contiendra pas la logique des événements.

##### Schéma
Les données que nous allons stocker dans notre collection de publications sont :

- titre `title`
- description `description`

## Setup

Nous allons tirer parti de l'émulateur Google Cloud Firestore et de l'émulateur local de la fonction cloud pour créer et tester les fonctions Cloud en local. Nous irons même plus loin et utiliserons l'interface utilisateur de l'émulateur Firebase. Cela vous aidera à consulter notre base de données 😎.

les prérequis :

- SDK Google Cloud (gcloud)
- NodeJS (8+) et NPM
- Java (8+)

Rappel : J'utilise des émulateurs Firebase au lieu des émulateurs Google Cloud Firestore afin d'avoir accès à une interface utilisateur, rien d'autre. Vous pouvez simplement utiliser les émulateurs Google Cloud Firestore.

Installer l'émulateur Cloud Firestore

```bash
gcloud components install cloud-firestore-emulator
```

Installer les outils CLI Firebase

```bash
npm install -g firebase-tools
```

Après l'installation, n'oubliez pas de vous connecter avec Firebase.

Pour GCP, je vais utiliser mon projet bluebook-search. Pour garder les choses simples, je vais activer le service APP ENGINE et télécharger un service account (il a le rôle d'éditeur) pour travailler localement. La prochaine étape consistera à ajouter les variables d'environnement requises.

```bash
export GCP_PROJECT=bluebook-search
export GOOGLE_APPLICATION_CREDENTIALS=keys/bluebook-search.json
```

Nous pouvons configurer le SDK gcloud avec

```bash
gcloud init
```

### Configurer Firebase pour utiliser l'interface utilisateur de l'émulateur Firebase

> Rappel : J'utilise des émulateurs Firebase au lieu des émulateurs Google Cloud Firestore afin d'avoir accès à une interface utilisateur, rien d'autre. Vous pouvez simplement utiliser les émulateurs Google Cloud Firestore
>

la commande suivante est exécutée dans le dossier du projet

```bash
firebase init emulators
```

puis je dois choisir l'option Ajouter Firebase à un projet Google Cloud Platform existant, car le projet bluebook-search n'est qu'un projet GCP.

Je vais configurer l'émulateur Firebase avec les émulateurs Firestore de configuration suivants : 8787 UI : 9000

Mon fichier firebase.json ressemble à

```json[firebase.json]
{
  "emulators": {
    "firestore": {
      "port": 8787
    },
    "ui": {
      "enabled": true,
      "port": 9000
    }
  }
}
```

Nous pouvons définir la variable d'environnement pour l'émulateur

```bash
export FIRESTORE_EMULATOR_HOST=localhost:8787
```

Maintenant je peux lancer mon émulateur avec

```bash
firebase emulators:start --import="./firebase-data" --export-on-exit="./firebase-data"
```

### Configurer les  Cloud Functions

Comme nous n'utilisons pas les Firebase Cloud Functions, il nous suffit de configurer un projet NodeJS dans notre dossier. Pour faire simple, je vais suivre les étapes de la documentation officielle du NodeJS Cloud Function Framework ([github.com/GoogleCloudPlatform/functions-fr](http://github.com/GoogleCloudPlatform/functions-fr) ..)

De plus, je vais installer express pour gérer le routage.

Découvrez la configuration du [code du projet Cloud Functions](https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/44c570da524547213fb57c7fee869840c3401b92)

L'API CRUD
Après avoir configuré le projet comme dans la documentation. La prochaine étape sera de créer une application express standard pour gérer nos demandes

L'API posts ressemblera à

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRouter = require('./posts.router');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postsRouter)

module.exports = app
```

Et notre fichier index des fonctions sera

```javascript
const postsApi = require('./posts-api')

exports.postsApi = postsApi
```

Découvrez la configuration du code Posts CRUD API commit

Pour ajouter Cloud Firestore, nous ajouterons @google-cloud/firestore à notre projet

```bash
yarn add @google-cloud/firestore
```

À ce moment-là, l'API est terminée, posts.service ressemble à

le code complet Posts CRUD API [https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/c1f07695a09017b635ffce8142339bdb62607718](https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/c1f07695a09017b635ffce8142339bdb62607718)

```javascript
const Firestore = require('@google-cloud/firestore');
const PostNotFoundException = require('../exceptions/post-not-found.exception');

const db = new Firestore()
const postsCollection = db.collection('posts')

const getPosts = async () => {
    const snapshot = await postsCollection.get();

    return snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
};

const getPost = async (id) => {
    const snapshot = await postsCollection.doc(id).get();

    if (!snapshot.exists) {
        throw new PostNotFoundException(id);
    }
    const result = { id: snapshot.id, ...snapshot.data() };
    return result;
};
const addPost = async ({ title, description }) => {
    const res = await postsCollection.add({ title, description });

    return {
        id: res.id,
        ...{ title, description },
    };
};
const updatePost = async (id, data) => {
    const snapshot = await postsCollection.doc(id).get();

    if (!snapshot.exists) {
        throw new PostNotFoundException(id);
    }

    Object.keys(data).forEach(key => data[key] === undefined && delete data[key])
    await postsCollection.doc(id).set({ ...snapshot.data(), ...data });
    return {
        id,
        ...snapshot.data(),
        ...data,
    };
};
const deletePost = async (id) => {
    const snapshot = await postsCollection.doc(id).get();

    if (!snapshot.exists) {
        throw new PostNotFoundException(id);
    }
    await postsCollection.doc(id).delete();
    return { message: `document ${id} is deleted` };
};

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
}
```

### Déployer

Maintenant que notre fonction est terminée, nous pouvons la déployer

```bash
gcloud functions deploy postsApi \
--entry-point=postsApi \
--runtime nodejs14 \
--trigger-http \
--region=europe-west1 \
--allow-unauthenticated
```

L’url de la fonction doit ressembler à [https://europe-west1-bluebook-search.cloudfunctions.net/postsApi](https://europe-west1-bluebook-search.cloudfunctions.net/postsApi) après le déploiement réussi.

Bravo. déployons maintenant notre moteur MeiliSearch sur GCE dans la partie suivante
