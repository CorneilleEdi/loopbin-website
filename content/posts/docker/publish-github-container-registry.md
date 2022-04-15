---
title: Partager ses images dockers sur Github
description: Rendre ses images dockers publique grâce au répertoire Github Packages et utilisant les commandes docker et avec Github Action.
tags: [github, docker, actions, ci/cd]
topics: [ github, docker]
date: 2022-04-01
slug: partager-ses-images-dockers-sur-github
---

Dans ce tutoriel, nous allons voir comment, comme nos codes, nous pouvons rendre nos images Docker diponibles sur Github grâce a Github Packages en utilisant les commandes docker localement puis en le service d’automatisation Github Actions.

Ce post est une version écrite d’une partie de ma session live [`conteneur en production`](https://meet.loopbin.dev/docker-en-production).


Dans le monde de la technologie des conteneurs, le terme répertoire fait référence à un espace central utiliser pour le stockage et la distribution d'images de conteneurs. Un répertoire ou registre peut être privé ou public. Le registre par défaut de Docker est Docker Hub mis, il existe plusieurs autres comme :

- Container Registry offert par Google Cloud Platform
- Amazon Elastic Container Registry (ECR) offert par AWS
- Azure Container Registry offert par Microsoft Azure
- Github Container registry (Github Packages) offert par Github
- Gitlab Container registry  par Gitlab

Avoir votre propre registre est un excellent moyen de compléter et d'intégrer votre système CI/CD. Dans un flux de travail normal, une validation dans votre système de contrôle de révision source lancerait une construction sur votre système d'intégration continue, qui, en cas de succès, pousserait une nouvelle image vers votre registre.

GitHub Packages est une plate-forme d'hébergement faisant partie des services offerte par Github pour la gestion de packages, y compris des conteneurs et d'autres dépendances. Ce service inclut des registres pour npm (NodeJs), RubyGems (Ruby), Apache Maven (Java), Gradle (Java), Docker et NuGet (.Net), parmi d'autres gestionnaires de packages populaires.

### Pourquoi utiliser le service Github Packages ?

- facile à mettre en place et à utiliser
- fiable et sécurisé
- intégration dans les services et les protocoles de sécurité de Github

Bien sûr ce n’est pas un service gratuit et il est assez limité pour les utilisateurs qui sont sur le plan gratuit de Github (500MB de stockage).

Avec une restriction aussi drastique, avoir une image de petite taille devient nécessaire.

## Localement

### Ajouter Github Container registry à ses repertoires

Pour ajouter un nouveau répertoire son moteur docker, il faut se connecter à ce répertoire.

Toutes les actions à venir se feront sur une machine Linux avec Docker installer dessus.

Pour commencer, nous allons obtenir une clé d’authentification pour notre compte Github dans nos [réglagles](https://github.com/settings/tokens).

Rendez-vous dans les réglages de vos comptes Github, developers sections puis Personal access tokens ou sur [https://github.com/settings/tokens](https://github.com/settings/tokens).

Les jetons d'accès personnels fonctionnent comme des jetons d'accès OAuth ordinaires nous permettant de nous authentifier durant l’utilisation de services Github. Une des avantages des tokens est qu’on peut spécifier les permissions de chacun afin de réduire leur champ d’action et d’augmenter la sécurité.

Alors nous allons cliquer sur Generate Token et créer un nouveau token.

Nous allons lui donner le nom `github-ctr-token` ct pour container registry. Comme permission, nous allons choisir `write:packages.`

Il est conseillé d’ajouter une date d’expiration pour le token juste par précaution.

Ensuite, nous allons copier notre docker (ne s’affiche qu’une seule fois) et le sauvegarder pour les prochaines commandes.

Maintenant, nous allons revenir sur notre machine et taper la commande suivante :

```bash
export GITHUB_CRT_TOKEN=<votre_token>
```

Pour enregistrer le token dans une variable et

```bash
echo $GITHUB_CRT_TOKEN | docker login ghcr.io -u <nom_utilisateur_github> --password-stdin
```

Pour s’authentifier et ajouter le répertoire Github à nos répertoires locaux. Changer `<votre_token>` par le token que vous avez crée et `<nom_utilisateur_github>` par votre nom d’utilisateur.

Une fois l'opération réussie, le message sera `Login Succeeded` .

### C’est quoi ghcr.io ?

Imaginer `ghcr.io` comme un identifiant unique pointant vers le répertoire de container de Github. Chaque répertoire peut avoir un ou plusieurs identifiants uniques. Par exemple, Google Cloud a comme identifiant unique : `gcr.io`, `us.gcr.io`, `asia.gcr.io` et beaucoup d’autre.

### Construire l’image Docker

Cette partie est laissée à vos soins. Il s’agit juste d’une opération de build standard. La seule chose qui change, c’est le tag de l’image. Le tag doit suivre un format spécifique.

```bash
ghcr.io/<NOM_UTILISATEUR>/<NOM_IMAGE>:<VERSION_IMAGE>
```

exemple

```bash
docker build -t ghcr.io/corneilleedi/expresso-multistages-actions:2.0.0 -f Dockerfile.multistage .
```

<action-button type="github" text="Code Source" link="https://github.com/CorneilleEdi/docker-meet/tree/main/expresso"></action-button>

### Partager l’image

Il suffit de faire un `docker push` et voila

```bash
docker push <TAG_IMAGE>
```

remplace TAG_IMAGE par le tag de votre image.

exemple

```bash
docker push ghcr.io/corneilleedi/expresso-multistages-actions:2.0.0
```

Et boom, votre image est disponible sur Github

![package](/images/docker/package.png)

### Utiliser l’image

Pour cela il suffit juste de faire un `docker pull`

```bash
docker push <TAG_IMAGE>
```

exemple

```bash
docker pull ghcr.io/corneilleedi/expresso-multistages-actions:2.0.0
```

## Avec Github Actions

La procédure avec Github Action est assez simple. Il suffit de mettre en place le script de workflow.

Github Actions est l'outil d'intégration continue et de livraison continue offert par Github. Il nous permet d’automatiser nos taches de développement (tester, packager, et déployer) logiciel depuis GitHub.

Nous allons créer un fichier de workflow sous un chemin `.github/worflows` dans notre projet.

```yaml[build-publish.yaml]
name: Créer et publier une image Docker

on:
  push:
    branches: ['main']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Log in to the Container registry
        uses: docker/login-action@v1
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v2
        with:
          context: ./expresso
          push: true
          file: ./expresso/Dockerfile.multistage
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
```

Ceci n’est pas un tuto à propos des workflows sur Github Action, mais voici une explication du script.

- `on - push - branch` nous permet de définir les événements qui lance le workflow. Dans ce cas, il s’agit d’un push sur la branche main.
- `env` nous permet de définir quelques variables d’environnement que nous utiliserons dans le script
- `build-and-push-image` est le job qui sera lancé. Il tournera sur `ubuntu-latest` (la derniere version disponible d'Ubuntu) et aura les permissions `write:package` et `read:content`.
- permirent étape `Checkout repository` nous permet de mettre en place notre code dans l’environnement du workflow
- deuxième étape `Log in to the Container registry` est l’étape de connexion au registre. Nous passons comme paramètre l’id du registre, le nom d’utilisateur et un token comme mot de passe.
- dernière étape `Build and push Docker image` contruit l’image Docker en se basant sur les paramètres passés. Remarquez l’argument `push: true` qui nous permet de dire qu’on veut publier après la construction de l’image.

## Conclusion

Github Packages, plus spécifiquement Github Container Registry est un service très utile pour mettre en place un bon flow de livraison d’application conteneuriser. Avec Github Actions, le processus devient encore plus facile.
