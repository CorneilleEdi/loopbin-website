---
title: Gérer plusieurs bases de données Firestore dans un projet
description: "Comment mettre en place et gérer plusieurs bases de données Firestore dans un même projet ?"
tags: [ gcp, firebase, terraform ]
topics: [ gcp, firebase, terraform ]
date: 2023-10-03
slug: gerer-plusieurs-bases-de-donnees-firestore-dans-un-projet
---

Une nouvelle fonctionnalité ajoutée à Google Cloud Firestore est la gestion de plusieurs bases de données dans un même projet. Dans cet article/POC (proof of concept) nous allons explorer cette nouvelle fonctionnalité et voir comment l’intégrer dans un projet.

> Cette fonctionalité est en Pre-GA. À utiliser avec précaution.


## Scénario

Vous travaillez sur un projet bien structuré avec plusieurs environnements : `dev`, `staging`, `prod` et vous aimeriez tout garder dans un même projet. Vous avez alors la possibilité de :

- suffixer chaque collection Firestore avec le suffix de l’environnement. Par exemple `dev_users`, `prod_users` pour les collections des utilisateurs en dev et en prod
- créer une base de données dev et prod afin d’isoler vos données

## Avantages de cette nouvelle fonctionnalité

- Isolation des bases de données : possibilité d’isoler les données
- Gestion individuelle des bases de données
- Suivi individuel de la facturation des bdd
- Surveillance et collection des métriques de bdd de façons séparée
- Gestion des règles de sécurité à différentes bases de données Firestore avec les Conditions IAM ou les Règles de sécurité Firebase
- Prise en charge des deux modes de Firestore (natif ou en mode Datastore)

## Limitations

Cette fonctionnalité a **actuellement** quelques limitations :

- Maximum de 100 bases de données par projet pouvant être augmenté grâce à une requête d’augmentation du quota
- Après la suppression d'une ressource de base de données, l'ID de la base de données ne peut être réutilisé qu'après une période de 37 jours.
- Seuls les déclencheurs Cloud Firestore 2e génération peuvent utiliser les événements pour les bases de données nommées.

## Prise en main

Le concept est assez simple à comprendre et à utiliser (il existe déjà dans presque toutes les bdd) : créer une base de données isolée et la gérer individuellement.

Pour interagir avec le service Firestore et les bdd, il est possible d’utiliser :

- Gcloud (l’utilitaire de commande de Google Cloud)
- Terraform
- l’API Google Cloud Platform

Pour cette partie, nous utiliserons gcloud.

Voici les opérations possibles

- Créer une bdd

```bash
gcloud alphafirestore databases create --database=development --location=europe-west9 \
  --type=firestore-native
```

Cette commande comme paramétrés :

- `database`: nom de la bdd. Entre 4 et 63 caractères
- `location`: emplacement de la bdd (region, multiregion). voir: https://firebase.google.com/docs/firestore/locations
- `type`: type/mode de la bdd firestore. `firestore-native` pour le mode natif et `datastore-mode` pour le mode Datastore. `firestore-native` par défaut
- `-delete-protection` pour activer la protection contre la suppression. C’est une fonctionnalité qui bloque la suppression d’une bdd tant qu'elle est activée.

![GCP Firestore Screenshot](/images/gcp/firetore-multi-db/firestore-multi-db-list.png)

- Lister les bdd

```bash
gcloud alpha firestore databases list
```

  Cette commande liste toutes les bdd Firestore présente dans le projet.

```bash
gcloud firestore databases list
    
  
  ---
    appEngineIntegrationMode: DISABLED
    concurrencyMode: PESSIMISTIC
    createTime: '2023-09-20T10:15:52.102833Z'
    deleteProtectionState: DELETE_PROTECTION_DISABLED
    earliestVersionTime: '2023-09-20T10:15:52.102833Z'
    etag: IMbIiYH8uIEDMLGv98f6uIED
    locationId: europe-west9
    name: projects/loopbin/databases/development
    pointInTimeRecoveryEnablement: POINT_IN_TIME_RECOVERY_DISABLED
    type: FIRESTORE_NATIVE
    uid: 0a181b17-eae8-4e68-864f-ba9cf9d3ae6d
    updateTime: '2023-09-20T10:15:52.102833Z'
    versionRetentionPeriod: 3600s
    ---
```


- Mettre à jour les bdd

```bash
gcloud alpha firestore databases update --database=development \
--type=firestore-native
```

Il permet aussi de gérer la protection de suppression de la bdd.

Activation sur la bdd se développent en utilisant `--delete-protection`

```bash
gcloud alpha firestore databases update --database=development --delete-protection

```

On peut utiliser `--no-delete-protection` pour retirer cette protection.

- Supprimer une bdd

```bash
gcloud alpha firestore databases delete --database=development

```

Bien sûr, cette commande échouera si la protection de suppression est activée.

## Terraform

La resource `google_firestore_database` permet de créer des bdd Firestore grâce à Terraform.

Exemple :

```bash
resource "google_firestore_database" "database" {
  project                           = var.project_id
  name                              = "development"
  location_id                       = "europe-west9"
  type                              = "FIRESTORE_NATIVE"
  concurrency_mode                  = "OPTIMISTIC"
  app_engine_integration_mode       = "DISABLED"
  point_in_time_recovery_enablement = "POINT_IN_TIME_RECOVERY_ENABLED"
}
```

## Utilisation

Maintenant, que nous avons nos 3 bases de donnee (default, development et staging) nous allons voir comment on peut les utiliser avec Python.

La spécification de la base de données à utiliser se fait durant l’initialisation du client dans notre code.

```bash
from google.cloud import firestore

db = firestore.Client(database='development')
collection_ref = db.collection("users")
```

Comme vous pouvez le voir dans la documentation, il est possible de passer la base de données en paramètre. La bdd de défaut est utilisé si rien n’est spécifié.

![Python doc](/images/gcp/firetore-multi-db/firestore-python-db-dev.png)

Pour les autres langages et SDK, veuillez consulter les documentations.

Until next time, stay in the loop, stay awesome.
