---
title: Développement local Flutter avec les émulateurs Firebase
description: Présentation, installation, configuration et codelab.
tags: [firebase, flutter]
topics: [firebase]
date: 2021-05-02
slug: developpement-local-flutter-avec-les-emulateurs-firebase
---

Firebase est sans doute l'un des services Cloud les plus utilisés par les développeurs Flutter. Pour faciliter le développement avec leurs services les plus populaires (Firestore, Firebase Auth, Firebase Functions, Firebase Realtime Database et Firebase Pub/Sub), l'équipe Firebase a developpé l'émulateur Firebase permettant aux développeurs de travailler et tester leurs applications offline. Dans cet article, nous allons explorer le Firebase Emulator et l'utiliser avec Flutter.

## Firebase, qu'est ce que s'est ?

S'il existe un service que les développeurs mobile et web aiment le plus c'est Firebase.

Firebase est une plateforme de développement d'applications mobiles et Web, soutenue par Google, pour aider les développeurs à offrir des expériences d'application plus riches.

C'est ce qu'on appelle un BaaS (Backend as a Service).

Firebase gère sa propre infrastructure avec un bel ensemble d'outils pour simplifier le flux de travail du développeur en lui fournissant des kits de développement et un tableau de bord en ligne.

Ce que ça signifie, c'est que Firebae offre aux développeurs un backend avec plusieurs services et un ensemble de librairies pour interagir avec ces services facilement et rapidement.

### Les services offerts par Firebase

Voici les services les plus populaires de Firebase:

- Cloud Firestore: c'est une base de donnée NoSQL en temps reel. Il offre une architecture de Collection/Document. Il convient de noter que Firestore est techniquement un produit Google Cloud, pas un produit Firebase. Pourquoi est-il répertorié avec Firebase? Firebase ajoute des SDK à utiliser dans votre application mobile pour rendre possible l'accès direct aux données, supprimant ainsi le besoin de ce composant middleware embêtant.
- Realtime Database: c'est une base de donnee NoSQL en temps réel tout comme Cloud Firestore. Très utile pour des système de messagerie
- Cloud storage: Firebase Storage offre un moyen simple d'enregistrer des fichiers binaires, le plus souvent des images, mais ce n'est que Google Cloud Storage.
- Authentication: Firebase auth dispose d'un système d'authentification par e-mail / mot de passe intégré, par verification de numero de telephone (avec un systeme d'OTP). Il prend également en charge OAuth2 pour Google, Facebook, Twitter et GitHub.
- Hosting: Firebase comprend un service d'hébergement facile à utiliser pour tous vos fichiers statiques (HTML, CSS, JS, images). Il les sert à partir d'un CDN global avec HTTP/2.
- Firebase Cloud Messaging: il permet d'envoyer des messages et des notifications aux utilisateurs
- Cloud Functions: un autre produit Google Cloud. À l'aide des SDK Firebase pour Cloud Functions, vous pouvez écrire et déployer du code, exécuté sur l'infrastructure «sans serveur» (serverless) de Google, qui répond automatiquement aux événements provenant d'autres produits Firebase.

Bien sûr, la liste est plus longue

![Services Firebase](/images/bluestorm/firebase-services.png)

## Les émulateurs Firebase

Firebase Local Emulator Suite est une collection d'outils avancés pour les développeurs qui cherchent à créer et tester des applications localement à l'aide de Cloud Firestore, Realtime Database, Authentication, Cloud Functions, Pub/Sub et Firebase Hosting.

Il offre une interface utilisateur riche pour vous aider à créer, exécuter et à prototyper rapidement.

Imaginez-les comme Firebase, mais sur votre ordinateur. C'est cool n'est ce pas ?

Il supporte actuellement 6 services de Firebase.

![Services des émulateurs](/images/bluestorm/components.png)

Les émulateurs viennent avec une interface très riche qui vous permet de :

- savoir les services qui tournent et ou les contacter
- interagir avec les bases de donnée (Realtime Database et Firestore)
- Gérer les utilisateurs
- Explorer les logs

![UI](/images/bluestorm/Firebase-Emulator-Suite.png)

## Les limitations des Emulateurs (pour l'instant)

Dans mon utilisation, j'ai rencontré quelques problèmes, quelques limitations.

- Manque de Cloud Storage.
- Manque des Indexes avec Cloud Firestore
- Quotas et Usage : il n'existe pour l'instant aucun moyen de savoir combien d'opération vous faite avec vos bases de donnée afin d'optimiser votre code s'il le faut

## Installation

Pour installer l'emulateur, il vous faudra:

- NodeJS (version 8 et plus)
- Java (version 8 et plus)

Si vous n'avez pas encore installé Firebase CLI, installez-le en allant sur [https://firebase.google.com/docs/cli](https://firebase.google.com/docs/cli). Vous pouvez le faire aussi avec NPM (Node Package Manager) qui vient avec NodeJS

```bash
npm install -g firebase-tools
```

Vous aurez besoin de la version CLI 8.14.0 ou supérieure pour utiliser Emulator Suite. Vous pouvez vérifier la version que vous avez installée à l'aide de la commande suivante:

```bash
firebase --version
```

## Configuration

Maintenant, initialisez le répertoire de travail actuel en tant que projet Firebase, en suivant les invites à l'écran pour spécifier les produits à utiliser:

```bash
firebase init
```

Cette commande démarre un assistant de configuration qui vous permet de sélectionner les émulateurs qui vous intéressent, de télécharger les fichiers binaires d'émulateur correspondants et de définir les ports d'émulateur si les valeurs par défaut ne sont pas appropriées.

```bash
firebase init emulators
```

Dans l'initialisation des émulateurs, vous aurez à spécifier les émulateurs que vous voulez ainsi que les ports sur lesquels elles devront tourner.

Voici un exemple de la configuration finale que vous aurez

```json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "functions": {
      "port": 9098
    },
    "firestore": {
      "port": 9097
    },
    "database": {
      "port": 9096
    },
    "hosting": {
      "port": 9095
    },
    "pubsub": {
      "port": 9094
    },
    "ui": {
      "enabled": true,
      "port": 9000
    }
  }
}
```

Dans ce cas, l'émulateur du service d'authentification tourne sur le port `9099` et l'interface est accessible sur le port `9000`

## Utilisation

Démarrez les émulateurs pour les produits Firebase configurés dans firebase.json.

```bash
firebase emulators:start
```

Les processus d'émulateur continueront à s'exécuter jusqu'à leur arrêt explicite. Le lancement des émulateurs pour la première fois téléchargera les émulateurs s'ils ne sont pas déjà installés.

- Firebase emulators aura besoin de Java pour lancer les émulateurs vu qu'ils sont des fichiers `.jar`
- Firebase hosting et Cloud Functions auront besoin de configurations supplémentaires

## Sauvegarde

L'arrêt des émulateurs supprimera toutes les informations qu'elles contiennent comme les utilisateurs et les données dans les bases de donnes. Il est possible de remédier à cette action par défaut en spécifiant au moment du lancement un dossier d'export ou les informations y seront enregistrées ainsi que le dossier d'où les informations seront importées au moment du lancement. Ces dossiers seront les mêmes dans notre cas.

Pour cela, il faudra ajouter quelques options à notre commande de démarrage.

- `—import` pour spécifier le dossier où se trouve les données des émulateurs à importer
- `—export-on-exit` pour spécifier le l’emplacement vers lequel les émulateurs devront exporter les données lors de l'arrêt

exemple

```bash
firebase emulators:start --import="./firebase-data" --export-on-exit="./firebase-data"
```

Dans ce cas le dossier est `firebase-data`

## Utilisation avec Flutter

L'utilisation des émulateurs avec Flutter ne diffère que dans les configurations des instances des services. Pour le reste, votre code et votre manière, de procéder restera le même.

Biensur, avec Flutter nous utilisons FlutterFire, l'ensemble officiel des Plugins de Firebase pour Flutter pour configurer notre projet.

[https://firebase.flutter.dev/](https://firebase.flutter.dev/)

La prochaine étape sera d'ajouter les librairies dans les fichiers de dépendance.

![deps](/images/bluestorm/flutters-dps.png)

Comme je l'avais préciser, tout ce qui changera dans votre façon habituelle de procéder avec Firebase dans Flutter, c'est la configuration des instances de vos services Firebase.

Par exemple, l'instance de Firestore deviendra:

```dart
String host = defaultTargetPlatform == TargetPlatform.android
      ? '10.0.2.2:9055'
      : 'localhost:9055';

FirebaseFirestore.instance.settings = Settings(host: host, sslEnabled: false);
_firestore = FirebaseFirestore.instance;
```

Le code commence par choisir l'adresse sur laquelle on se contactera a l'émulateur de Firestore. Il le faut parce que normalement les emulateurs sont diponible localement (donc `localhost` ) mais du a la façon dont les émulateurs android accede aux serveurs locals grâce a l'adresse ip `10.0.2.2` il faudra faire une exception dans le cas des android.

Ensuite, nous réglons l'instance se Firestore avec un nouveau réglage en précisant l'adresse local de firestore.

Dans le cas de Firebase Auth, le code ressemblera à :

```dart
String host = defaultTargetPlatform == TargetPlatform.android
      ? '10.0.2.2:9054'
      : 'localhost:9054';

FirebaseAuth.instance.useEmulator(host);
_auth = FirebaseAuth.instance;
```

Et bim, c'est tout.

Bravo, vous pouvez maintenant travailler avec Firebase localement.

Pour un exemple complet, rendez vous sur mon repo Github [https://github.com/CorneilleEdi/flutter-firebase-emulators-bluestorm](https://github.com/CorneilleEdi/flutter-firebase-emulators-bluestorm)

## Meet

Ce post est une version écrite de la session live que j'ai tenue le 1 mai 2021

[https://meet.loopbin.dev/bluestorm](https://meet.loopbin.dev/bluestorm)

Je prévois tenir d'autres sessions encore plus intéressante donc n'hésitez pas à vous rendre sur mon site [https://meet.loopbin.dev](https://meet.loopbin.dev) pour vous enregistrer dans ma liste de contact mail afin de recevoir des notifications sur mes prochaines sessions.
