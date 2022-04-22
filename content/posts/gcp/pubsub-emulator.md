---
title: Google Cloud Pub/Sub et son émulateur
description: Configurer l'émulateur Cloud PubSub localement pour le développement
tags: [gcp, pubsub]
topics: [gcp]
date: 2022-02-17
slug: google-cloud-pub-sub-et-son-emulateur
---

l ne fait aucun doute que Cloud Pub/Sub est l'un des produits les plus populaires sur Google Cloud Platform.

Pub/Sub est un service entièrement géré qui permet de mettre en œuvre une messagerie asynchrone entre les applications et les services. Pub/Sub aide les développeurs à se connecter entre des applications/services écrits individuellement en dissociant les expéditeurs et les destinataires.

En tant qu'utilisateur de RabbitMQ, c'est l'alternative parfaite offerte sur GCP.

Dans cet article, je vais parler de la façon de tirer parti de l'émulateur Pub/Sub localement pour une meilleure expérience de développement.

Prérequis:

- Compréhension de base de l'architecture Pub/Sub
- Compréhension de base sur Cloud PubSub
- GCloud SDK

J'utiliserai Ubuntu, ma distribution Linux préférée. Allons-y.

## Pull or Push, telle est la question

L'approche évidente pour un système pubsub, en général, est qu'un abonné s'abonne à un sujet `topic` et écoute quand un message est publié. C'est ainsi que fonctionnent la plupart des systèmes Pub/Sub. C'est ce qu'on appelle l’approche `pull` dans Cloud Pub/Sub. Un sujet `topic` est créé et un abonnement  `subscription`lié au sujet est également créé. un service doit écouter les messages sur les abonnements `subscriptions` pour obtenir le message. Simple non ?

Cloud Pub/Sub propose également une autre approche : la méthode push. Imaginez une fonction (Cloud Function) qui communique via Cloud Pub/Sub. Il lui sera difficile de rester disponibles pour écouter le message. Dans l'approche push, Pub/Sub envoie des messages à un point de terminaison *HTTPS* prédéfini à l'aide d'une requête HTTP Post. Pour accuser réception du message, le service doit répondre par un code de réponse réussie ( 101, 200, 201, 202, 204).

Le choix de l'approche (Push ou Pull) est crucial et doit être fait correctement.

## L'émulateur, notre sauveur.

Travailler avec Cloud Pub/Sub est une bonne expérience. C'est un service simple, efficace et puissant qui permet aux développeurs de construire des services incroyablement découplée. Malgré tout cela, il sera difficile de travailler directement dans le Cloud pendant le processus de développement. Imaginez que vous deviez envoyer un message à Cloud Pub/Sub et recevez-le pour tester votre code. Ce serait horrible. Heureusement, GCP nous fournit l'émulateur Pub/Sub.

Il imite le fonctionnement de Cloud Pub/Sub, mais avec quelques limitations

[https://cloud.google.com/pubsub/docs/emulator#known_limitations](https://cloud.google.com/pubsub/docs/emulator#known_limitations).

Pour utiliser l'émulateur Pub/Sub, vous devez disposer du SDK Cloud et effectuer certaines configurations.

Pour installer le SDK Cloud, rendez vous sur [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install).

## Configurer l'émulateur Pub/Sub

La première chose est d'avoir un projet GCP. Vous pouvez utiliser le site GCP ou le SDK Cloud. Une fois que vous avez un projet, vous devrez créer un compte de service `service account` qui vous permettra d'accéder aux services GCP. Pour en créer et en télécharger un, vous pouvez suivre ces étapes :

- Initiez votre SDK Cloud avec `gcloud init`
- Créez un compte de service avec la commande

```bash
gcloud iam service-accounts create <service-account-name>
```

- Donne l'autorisation appropriée au compte de service

  Nous donnerons la permission `roles/pubsub.editor` car cela devra travailler avec PubSub.


```bash
gcloud projects add-iam-policy-binding <project-id> --member "serviceAccount:<service-account-name>@<project-id>.iam.gserviceaccount.com" --role "roles/pubsub.editor"
```

Si vous souhaitez avoir un compte de service de développement avec un accès complet, vous pouvez utiliser le rôle `roles/owner` . Faite attention s'il-vous-plaît.

- Créez une clé de compte de service et téléchargez-la

```bash
 gcloud iam service-accounts keys create credentials.json --iam-account <service-account-name>@<project-id>.iam.gserviceaccount.com
```

Le fichier json s'appellera `credentials.json` et sera stocké sur votre ordinateur.

- Configurer les variables d'environnement requises (GOOGLE_APPLICATION_CREDENTIALS, PUBSUB_EMULATOR_HOST,GCP_PROJECT_ID )

```bash
export GOOGLE_APPLICATION_CREDENTIALS="<absolute-path-to-the credentials>/credentials.json"

export PUBSUB_EMULATOR_HOST=localhost:8085

export GCP_PROJECT_ID=<project-id>
```

La variable `PUBSUB_EMULATOR_HOST` est cruciale. C'est celle qui indiquera à votre code de ne pas utiliser le service Cloud Pub/Sub réel dans le Cloud mais d'utiliser l'émulateur local sur le port défini. L'émulateur Pub/Sub démarre normalement sur le port 8085 lorsqu'il est disponible. la variable `GCP_PROJECT_ID` n'est pas obligatoire mais elle peut être pratique.

## Démarrer l'émulateur

Il est possible que l'émulateur ne soit pas installé pas la première fois que vous souhaitez le lancer. Vous pouvez l'installer en utilisant la commande :

```bash
gcloud components install pubsub-emulator
gcloud components update
```

Pour démarrer l'émulateur, utilisez la commande suivante

```bash
gcloud beta emulators pubsub start --project=<project-id> --host-port=<addresse-ip>:<port>
```

ou

```bash
gcloud beta emulators pubsub start --project=$GCP_PROJECT_ID --host-port=$PUBSUB_EMULATOR_HOST
```

Puisque nous avons la variable GCP_PROJECT_ID.

Vous obtiendrez quelque chose comme ça

```bash
Executing: /home/corneilleedi/Softwares/google-cloud-sdk/platform/pubsub-emulator/bin/cloud-pubsub-emulator --host=localhost --port=8085
[pubsub] This is the Google Pub/Sub fake.
[pubsub] Implementation may be incomplete or differ from the real system.
[pubsub] Mar 22, 2022 9:24:08 PM com.google.cloud.pubsub.testing.v1.Main main
[pubsub] INFO: IAM integration is disabled. IAM policy methods and ACL checks are not supported
[pubsub] SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
[pubsub] SLF4J: Defaulting to no-operation (NOP) logger implementation
[pubsub] SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
[pubsub] Mar 22, 2022 9:24:09 PM com.google.cloud.pubsub.testing.v1.Main main
[pubsub] INFO: Server started, listening on 8085
```

Notez le port sur lequel il écoute : 8085
> Attention: Un émulateur en cours d'exécution contient toujours les informations.
> Il conservera les topics et les subscriptions jusqu'à ce qu'il soit arrêté.
> Lorsque l'émulateur est lancé ou relancé, il est vide, pas de sujet, pas d'abonnement

  ## Test

  Pour tester tout cela, on peut utiliser le jeu d'exemples PubSub (en nodejs ou avec d'autres langages).

  Avec NodeJs, rendez vous sur [https://cloud.google.com/nodejs/docs/reference/pubsub/latest](https://cloud.google.com/nodejs/docs/reference/pubsub/latest)

  Ce petit bout de code va créer 3 sujets `topics` et les lister ensuite.

```javascript
async function main() {

  const { PubSub } = require('@google-cloud/pubsub');


  const pubSubClient = new PubSub();

  const topicsToCreate = [
    "users-auth-created",
    "users-auth-blocked",
    "users-auth-deleted",
  ]

  async function createTopic() {
    topicsToCreate.forEach(async (topic) => {
      await pubSubClient.createTopic(topic);
      console.log(`Topic ${topic} created.`);
    })
  }

  async function listAllTopics() {
    const [topics] = await pubSubClient.getTopics();
    console.log('Topics:');
    topics.forEach(topic => console.log(topic.name));
  }

  createTopic().catch(console.error);;

  listAllTopics().catch(console.error);
}

main();
```

  Résultat:

```bash
Topic users-auth-created created.
Topic users-auth-deleted created.
Topic users-auth-blocked created.
Topics:
projects/<project_id>/topics/users-auth-blocked
projects/<project_id>/topics/users-auth-created
projects/<project_id>/topics/users-auth-deleted
```

On peut aussi remarquer qu'un nouveau message a été écrit par l'émulateur

```bash
[pubsub] INFO: Detected HTTP/2 connection.
```

Ce message sera affiché chaque fois qu'une connexion sera établie avec l'émulateur.
