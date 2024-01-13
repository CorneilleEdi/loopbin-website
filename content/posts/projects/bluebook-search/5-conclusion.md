---
title: Recherche plain texte sur Cloud Firestore à l'aide de MeiliSearch 5 - Problèmes
description: Points d'échec et comment les surmonter
tags: [gcp, nodejs, cloud-functions,vm, meilisearch, firestore]
topics: [gcp, nodejs]
date: 2022-01-23
slug: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-5-problemes
prev: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-4-evenements
---

Félicitations, vous avez réussi jusqu'à présent.

#### Qu'avons-nous fait?

- Nous avons créé une API NodeJS Express CRUD hébergée en tant que fonction cloud sur GCP
- Nous avons créé une fonction cloud qui est déclenchée par un événement d'écriture dans la base de données Cloud Firestore
- Nous avons créé une instance de VM qui héberge un moteur Meilisearch
- Nous avons fait notre configuration réseau avec des firewalls et un connecteur d'accès VPC Serverless

Malgré la quantité de travail que nous avons fait, il y a quelques problèmes dans le processus. Énumérons-les.

## Le pare-feu
En fait, notre règle de pare-feu default-allow-http autorise la connexion TCP 
d'entrée sur le port 80 à partir de n'importe quelle adresse IP source (0.0.0.0). 
Étant donné que notre VM n'est accessible que par le connecteur, 
nous pouvons restreindre la plage d'adresses IP source. [La documentation](https://cloud.google.com/vpc/docs/configure-serverless-vpc-access?_ga=2.259749066.-1539016833.1616878239#gcloud)


## Les gestionnaires d'événements

En fait, nous supposons que notre VM sera toujours disponible et que la connexion au moteur Meilisearch exécuté sur la VM sera réussie.
Dans le cas où ces conditions ne sont pas remplies, nous avons besoin d'une sécurité intégrée. Nous pouvons ajouter un nombre de tentatives à la fonction cloud du gestionnaire post-événement.

Dans le cas où l'approche de nouvelle tentative n'aide pas.
Nous pouvons ajouter un nouveau champ à notre document de publications qui peut nous aider à savoir si un document a été ajouté à la base de données Meilisearch.
Cette approche peut impliquer un nouveau service comme Cloud Scheduler pour vérifier régulièrement si chaque document de la base de données Cloud Firestore est dans la base de données Meilisearch.
L'indexation du nouveau champ aidera. Le problème est que si notre base de données grossit, cette opération deviendra très intensive.

Une autre option peut être d'utiliser Cloud Task. Chaque fois qu'une opération est effectuée dans Meilisearch,
elle est asynchrone, nous ne connaissons donc pas le résultat immédiatement. Nous pouvons créer une tâche Cloud à chaque opération qui touchera une fonction cloud qui aura pour but de vérifier si l'opération est réussie.
Cette fonction Cloud peut même se trouver dans notre API de publications.

## L'infrastructure

Au cours des tutoriels, nous avons utilisé l'utilitaire de commande gcloud pour créer nos ressources.
Il serait plus approprié d'utiliser un outil logiciel Infrastructure as Code comme [Terraform](https://www.terraform.io/) ou [Pulumi](https://www.pulumi.com/) pour s'occuper de la création des ressources.

Merci d'être resté jusqu'au bout.
