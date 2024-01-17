---
title: Gérer les plages d'adresses IP gérées par Google Cloud avec Terraform
description: "Optimiser l'administration des adresses IP de Google Cloud grâce à Terraform."
tags: [ gcp, terraform, network ]
topics: [ gcp, terraform, network ]
date: 2023-12-11
slug: gerer-les-plages-dadresses-ip-gerees-par-google-cloud-avec-terraform
---

Si vous maîtrisez un peu les configurations réseau de Google Cloud avec certains de ces services, vous saurez qu'ils disposent d'espaces d'adressage spéciaux que vous devez ajouter à vos configurations. Par exemple, pour le contrôle de santé de votre équilibrage de charge, vous devez autoriser le trafic pour certaines plages IP spécifiques à Google.

Pour faciliter les choses, il existe la data source Terraform `google_netblock_ip_ranges` que nous pouvons utiliser. La data source `google_netblock_ip_ranges` permet de générer une liste de plages CIDR gérées par Google qui correspondent à l'infrastructure de Google Cloud. Jetons-y un coup d'oeil rapide.

https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/netblock_ip_ranges

### Hands-on

Commençons par ce petit code. Cela nous aidera à examiner les données complètes de la data source

```powershell
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.10.0"
    }
  }
}

provider "google" {
  project = var.project_id
}

data "google_netblock_ip_ranges" "this" {
}

output "google_netblock_ip_ranges" {
  value = data.google_netblock_ip_ranges.this
}
```

L'output affiche :

```powershell
+ google_netblock_ip_ranges = {
      + cidr_blocks      = [
          + "34.35.0.0/16",
          + "34.152.86.0/23",
          + "34.177.50.0/23",
          + "2600:1900:8000::/44",
          + "2600:1900:4030::/44",
					...
        ]
      + cidr_blocks_ipv4 = [
          + "34.35.0.0/16",
          + "34.152.86.0/23",
          + "34.177.50.0/23",
					...
        ]
      + cidr_blocks_ipv6 = [
          + "2600:1900:8000::/44",
          + "2600:1900:4280::/44",
					...
        ]
      + id               = "netblock-ip-ranges-cloud-netblocks"
      + range_type       = "cloud-netblocks"
    }
```

Incroyable, toute la plage d’adresses gérée par Google Cloud.

### En savoir plus

On peut aller plus loin avec les arguments de la source de données `range_type`. Cet argument est le type de plage pour lequel fournir des résultats. Il peut prendre des valeurs telles que cloud-netblocks (valeur par défaut), `health-checkers`, et `legacy-health-checkers` (pour les health check), et bien d'autres. Vous pouvez consulter tous les types sur : https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/netblock_ip_ranges#range_type
```yaml
data "google_netblock_ip_ranges" "this" {
    range_type = "health-checkers"
}

data "google_netblock_ip_ranges" "this" {
  for_each = toset([
    "health-checkers",
    "legacy-health-checkers",
  ])
  range_type = each.key
}
```
```yaml
+ google_netblock_ip_ranges = {
    + cidr_blocks      = [
        + "35.191.0.0/16",
        + "130.211.0.0/22",
      ]
    + cidr_blocks_ipv4 = [
        + "35.191.0.0/16",
        + "130.211.0.0/22",
      ]
    + cidr_blocks_ipv6 = null
    + id               = "netblock-ip-ranges-health-checkers"
    + range_type       = "health-checkers"
  }
```
On peut voir que ces ranges sont les memes que les ranges dans la documentation.
![Helm docs](/images/gcp/gcp-managed-ip-ranges.png)

Voilà, c’est tout. 
