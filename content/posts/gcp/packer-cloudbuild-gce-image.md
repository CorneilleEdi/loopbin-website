---
title: Cloud Build + Packer - Automatiser la création d’image machine
description: "Comment automatiser la création d’image machine personnalisée sur GCP avec Packer et Cloud Build"
tags: [gcp, packer, gce]
topics: [gcp, packer]
date: 2023-03-26
slug: cloud-build-packer-automatiser-la-creation-dimage-machine
---

Dans ce tutoriel, nous allons mettre en place une solution nous permettant de construire nos images machines pour GCE grâce à Packer avec l’aide de Cloud Build.

Ce poste est la suite du poste:
<post-item-with-id slug="creer-une-image-machine-personnalisees-sur-gcp-avec-packer"></post-item-with-id>
## Logique

Afin d’atteindre notre but, nous allons utiliser le builder communautaire `packer` de Cloud Build.

Il est bien sûr possible d’utiliser une autre image docker de packer

Voici les étapes :

1- Récupérer le builder https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/packer

2- Construire l’image docker qui sera utilisé et l’enregistrer sur Google Cloud Container Registry

3- Écrire le fichier packer

4- Définir le fichier de configuration pour Cloud Build **`cloudbuild.yaml`**

5- Lancer le build avec Cloud Build

<action-button type="github" text="GoogleCloudPlatform/cloud-builders-community" link="https://github.com/GoogleCloudPlatform/cloud-builders-community"></action-button>

## 1- Le builder de packer

Le builder packer pour Cloud Build est assez simple. Il s’agit juste d’un Dockerfile qui définit les étapes pour télécharger et mettre en place Packer.

Le code ci-dessous montre le contenu du Dockerfile.

```docker
FROM alpine:3.14 AS build

ARG PACKER_VERSION
ARG PACKER_VERSION_SHA256SUM

COPY packer_${PACKER_VERSION}_linux_amd64.zip .
RUN echo "${PACKER_VERSION_SHA256SUM}  packer_${PACKER_VERSION}_linux_amd64.zip" > checksum && sha256sum -c checksum

RUN /usr/bin/unzip packer_${PACKER_VERSION}_linux_amd64.zip

FROM gcr.io/google.com/cloudsdktool/cloud-sdk:slim
RUN apt-get -y update && apt-get -y install ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=build packer /usr/bin/packer
ENTRYPOINT ["/usr/bin/packer"]
```

Nous allons cloner le repo. Dans le dossier packer on y trouvera nos deux fichiers: `Dockerfile` et **`cloudbuild.yaml`**

```bash
git clone https://github.com/GoogleCloudPlatform/cloud-builders-community.git

cd cloud-builders-community/packer
```

```bash
➜  packer git:(master) tree .                                          
.
├── cloudbuild.yaml
├── Dockerfile
├── examples
│  └── gce
│      ├── build.pkr.hcl
│      ├── cloudbuild.yaml
│      ├── README.md
│      └── variables.pkrvars.hcl
└── README.md

2 directories, 7 files
```

La version de packer est définie dans le fichier `cloudbuild.yaml` et nous allons la modifier pour utiliser la version 1.8.7 afin d’être à jour.

```yaml
steps:
  - name: 'gcr.io/cloud-builders/wget'
    args: [ "https://releases.hashicorp.com/packer/${_PACKER_VERSION}/packer_${_PACKER_VERSION}_linux_amd64.zip" ]
  - name: 'gcr.io/cloud-builders/docker'
    args: [ 'build', '-t', 'gcr.io/$PROJECT_ID/packer:${_PACKER_VERSION}',
            '-t', 'gcr.io/$PROJECT_ID/packer',
            '--build-arg', 'PACKER_VERSION=${_PACKER_VERSION}',
            '--build-arg', 'PACKER_VERSION_SHA256SUM=${_PACKER_VERSION_SHA256SUM}',
            '.' ]
substitutions:
  _PACKER_VERSION: 1.8.7
  _PACKER_VERSION_SHA256SUM: 30d2f21bf882b619697e3af0e9080cbf4a3e89066c7ae11debfd9ea243d5946f

images:
  - 'gcr.io/$PROJECT_ID/packer:latest'
  - 'gcr.io/$PROJECT_ID/packer:${_PACKER_VERSION}'
tags: [ 'cloud-builders-community' ]
```

## 2- Construire l’image docker

Pour construire notre image, nous allons utiliser la commande suivante:

```bash
gcloud builds submit .
```

Une fois le build terminé, on peut vérifier l’image Docker avec la commande

```bash
gcloud container images list
```

```bash
NAME
gcr.io/<project_id>/packer
```

Voir ces tags

```bash
gcloud container images list-tags gcr.io/<project_id>/packer
```

```bash
DIGEST        TAGS          
ac3a246e203a  1.8.7,latest  
```

## 3- Écrire un fichier Packer

Nous allons utiliser le fichier écrit dans le tutoriel Packer sur GCP précèdent. Il contient aussi plus d’explication à propos de Packer et du fichier.

```hcl
packer {
  required_plugins {
    googlecompute = {
      version = ">= 1.1.1"
      source = "github.com/hashicorp/googlecompute"
    }
  }
}

variable "project_id" {
  type    = string
    description = "Google Cloud Project ID"
  default = "XXXXXX"
}
source "googlecompute" "nodejs-base" {
  project_id             = var.project_id
  source_image           = "ubuntu-minimal-2204-jammy-v20230523"
  zone                   = "europe-west3-a"
  machine_type           = "e2-medium"
  image_name             = "loop-node-18-ubuntu-minimal-2204"
  image_family           = "loop-ubuntu-2204"
  image_description      = "Loopbin organisation golden image for node 18 on ubuntu 22.04"
  image_storage_locations = ["eu"]
  image_labels           = {
    packer  = "true"
    os      = "ubuntu"
    version = "22.04"
  }
  ssh_username         = "root"
  disk_size            = "25"
}

build {
  sources = [
    "source.googlecompute.nodejs-base"
  ]

  provisioner "shell" {
    inline = [
      "sudo apt-get update && sudo apt-get upgrade -y"
    ]
  }

  provisioner "shell" {
    script = "setup.sh"
  }
}
```

## 4- Définir le fichier de configuration pour Cloud Build

Il nous faut maintenant définir le fichier de build avec les différentes étapes.

```yaml
steps:
  # packer init
  - name: 'gcr.io/$PROJECT_ID/packer'
    args:
      - init
      - loop-node-18-ubuntu-minimal-2204.pkr.hcl

  # packer validate
  - name: 'gcr.io/$PROJECT_ID/packer'
    args:
      - validate
      - loop-node-18-ubuntu-minimal-2204.pkr.hcl

  # packer build
  - name: 'gcr.io/$PROJECT_ID/packer'
    args:
      - build
      - -var
      - project_id=$PROJECT_ID
      - loop-node-18-ubuntu-minimal-2204.pkr.hcl
```

Dans ce simple fichier, on met en place une étape qui lance la commande `packer build` avec le fichier défini. Mais avant nous lancons `packer init` et `packer validate`.

L’image Packer qui sera utilisée sera alors le nôtre, ce qui ajoutera une couche de sécurité dans notre processus.

## Permissions

Afin d’effectuer les actions nécessaires, Cloud Build aura besoin de permission pour gérer les instances sur Compute Engine.

![cloudbuild-roles.png](/images/gcp/cloudbuild-roles.png)

## 5- Lancer le build avec Cloud Build

Pour lancer le build, il nous faut une seule commande

```bash
gcloud builds submit .
```

Résultat : 

![cloudbuild-result.png](/images/gcp/cloudbuild-result.png)

## Conclusion

Comme nous l'avons vu dans le dernier tutoriel, Packer est un outil très utile en soi,mais en le combinant avec Cloud Build, nous pouvons automatiser la construction de nos images machines personnalisées et ainsi optimiser notre pipeline de livraison.
