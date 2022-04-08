---
title: Comment utiliser une boucle pour créer des ressources similaires avec Terraform
description: Faire usage des boucles count, for et for_each pour créer des ressources similaires avec Terraform
tags: [terraform, gcp]
topics: [terraform, gcp]
date: 2021-05-07
---

S'il y a une règle très important à suivre en codant, c'est de ne jamais se répéter. Dans cet article, nous allons vois comment est ce que nous pouvons utiliser une boucle dans Terraform pour éviter les répétition dans la création de ressources similaires.

> **Terraform** est une infrastructure en tant qu'outil de code pour la création, la modification et la gestion des versions d'une infrastructure de manière sûre et efficace entre divers fournisseurs de cloud.

## Notre objectif

Notre but sera de créer plusieurs topic de PubSub sur Google Cloud Platform. Nous allons passer un ensemble de noms et nous espérons comme output, une list de dictionnaire ayant comme clé l'élément de l'ensemble et pour valeur l'id et le nom du topic. Quelque chose comme ceci

```js{1,3-5}[server.js]
[
       {
           event = ""
           id    = ""
           name  = ""
        },
       {
           event = ""
           id    = ""
           name  = ""
        },
       {
           event = ""
           id    = ""
           name  = ""
        },
    ]
```

## Concepts

Terraform propose 3 boucles différentes (for, for_each, count) et chacune est destinée à être utilisée dans un scénario légèrement différent.

### Count

count itère sur un nombre et retourne le nombre actuel comme `index`.

```bash
resource "google_pubsub_topic" "topic" {
  count = 2
  name  = count.index
}
```

Dans ce cas , name sera 0 ,1,2 à chaque incrémentation. Attention, `count` commence par 0 et la valeur est incluse.

### for

`for` itère sur les listes (list) et les dictionnaire (map).

```bash
variable "regions" {
  type        = list(string)
  default     = ["europe-west1", "us-central"]
}

[for region in var.regions : upper(region)]
```

Ce code donnera

```bash
["EUROPE-WEST1", "US_CENTRAL"]
```

Il est aussi possible d'avoir l'index ainsi que la valeur a chaque iteeration

```bash
[for index, region in var.regions : upper("${index}-${region})]
```

Résultat:

```bash
["0-EUROPE-WEST1", "1-US_CENTRAL"]
```

Attention, quand la collection est un dictionnaire (map), l'index dans le cas de la liste deviendra la clé de l'élément.

### for_each

`for_each` itère les dictionnaires (map) et les sets de strings aussi, mais avec un petit différence. les éléments itéré sont disponible sous le mot-clé each.

- `each.key` donne la clé
- `each.value` donne la valeu

```bash
variable "events" {
  type = map(object({
    name = string
  }))
  default = {
    in : { name : "in-event" },
    out : { name : "out-event" },
  }
}

resource "google_pubsub_topic" "events_topics" {
  for_each = var.events
  name     = each.value.name
}
```

Dans ce cas, name dans la ressource `events_topics` sera a chaque itération respectivement `in-event` et `out-event`.

## Pratique

Revenons maintenant sur notre objectif. Les codes préliminaires

```bash
variable "project_id" {
  description = "Google Cloud Platform (GCP) Project ID"
  type        = string
  default     = "loopbin"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west1"
}

variable "events" {
  type = list(string)
  default = [
    "users-auth-created",
    "users-auth-blocked",
    "users-auth-deleted",
  ]

  description = "list of pubsub events related to user account"
}
```

Vu que la variable `events` est une liste, nous ne pourrons pas utiliser `for_each`. Il nous reste alors `count`.

```bash
resource "google_pubsub_topic" "users_auth_topics" {
  count = length(var.events)
  name  = "${var.events[count.index]}-topic"
}
```

output

```bash
output "users_auth_topics" {
  description = "Users authentication related topics"
  value = [for created_topic in google_pubsub_topic.users_auth_topics :
    { id    = created_topic.id,
      name  = created_topic.name,
      event = "${trimsuffix(created_topic.name, "-topic")}"
    }
  ]
}
```

La commande `terraform apply` nous donnera comme output

```bash
users_auth_topics = [
  {
    "event" = "users-auth-created"
    "id" = "projects/loopbin/topics/users-auth-created-topic"
    "name" = "users-auth-created-topic"
  },
  {
    "event" = "users-auth-blocked"
    "id" = "projects/loopbin/topics/users-auth-blocked-topic"
    "name" = "users-auth-blocked-topic"
  },
  {
    "event" = "users-auth-deleted"
    "id" = "projects/loopbin/topics/users-auth-deleted-topic"
    "name" = "users-auth-deleted-topic"
  },
]
```

Boom c'est fini 😎. J'espère que vous avez bien compris et aimé.
