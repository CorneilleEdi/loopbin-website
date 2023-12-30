---
title: Terraform import - Générer les ressources automatiquement
description: "Générez automatiquement des ressources avec Terraform grâce à Terraform import"
tags: [ terraform, azure ]
topics: [ terraform, azure ]
date: 2023-12-29
slug: terraform-import-generer-les-ressources-automatiquement
---

Importez la ressource existante dans Terraform. C'est quelque chose que nous redoutons tous de faire un jour, mais parfois, nous devons le faire.

Avant Terraform 1.5, nous devions utiliser la commande `terraform import` et ensuite ajouter la configuration à notre ressource pour compléter la base d'arguments sur les détails que nous connaissons à son sujet. Mais à partir de Terraform v1.5 (en tant que fonctionnalité expérimentale), nous pouvons importer des ressources Terraform en demandant à Terraform d'extraire ses configurations existantes et de générer une ressource configurée complète pour nous. Jetons un coup d'œil rapide à cette fonctionnalité.

Nous utiliserons Azure pour cette démo.

Documentation : https://developer.hashicorp.com/terraform/language/import/generating-configuration

## Ancienne approche
Avant de commencer, j'ai créé une resource group `hands-on-rg` avec la commande `az group create`
```shell
az group create --location westeurope --resource-group hands-on-rg
```

```shell
az group show --resource-group hands-on-rg

{
  "id": "/subscriptions/XXX/resourceGroups/hands-on-rg",
  "location": "westeurope",
  "managedBy": null,
  "name": "hands-on-rg",
  "properties": {
    "provisioningState": "Succeeded"
  },
  "tags": null,
  "type": "Microsoft.Resources/resourceGroups"
}
```

Dans les versions précédentes de Terraform, nous aurions fait ce qui suit :

1. Configurer notre ressource Terraform vide

```shell
terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.85.0"
    }
  }
}

provider "azurerm" {
    features {}
    skip_provider_registration = true
}

resource "azurerm_resource_group" "hands_on" {
}
```

2. Exécuter la commande d'importation Terraform

```shell
terraform import azurerm_resource_group.hands_on /subscriptions/XXX/resourceGroups/hands-on-rg
```

3. Compléter la configuration de notre ressource importée, puisqu'elle se trouve dans notre state

```shell
resource "azurerm_resource_group" "hands_on" {
	location   = "westeurope"
  managed_by = null
  name       = "hands-on-rg"
  tags       = {}
}
```

Trop long, non?

## Nouvelle approche

Pour cette approche nouvelle génération, il suffit d'utiliser le bloc `import` avec la syntaxe suivante :

```shell
import {
  id = <id de la ressource>
  to = <pointeur de la ressource à générer>
}
```

```shell
import {
  id = "/subscriptions/XXX/resourceGroups/hands-on-rg"
  to = azurerm_resource_group.hands_on
}
```

C'est simple, il suffit d'exécuter `terraform plan` et `terraform apply`

```shell
terraform plan -generate-config-out=generated.tf -out=plan.tfplan
```

- `generate-config-out` pour le fichier de sortie de la génération
- `out` pour la sortie du plan

Nous obtenons comme sortie

```shell
Terraform will perform the following actions:

  # azurerm_resource_group.this will be imported
  # (config will be generated)
    resource "azurerm_resource_group" "hands_on" {
        id       = "/subscriptions/XXX/resourceGroups/hands-on-rg"
       	location   = "westeurope"
			  managed_by = null
			  name       = "hands-on-rg"
        tags     = {}
    }

Plan: 1 to import, 0 to add, 0 to change, 0 to destroy.
```

Nous remarquons le nouveau plan d'action `import`. Nous pouvons également voir que le fichier a été généré.

```shell
# generated.tf
resource "azurerm_resource_group" "hands_on" {
   	location   = "westeurope"
	  managed_by = null
	  name       = "hands-on-rg"
    tags     = {}
}
```

Tout ce que nous avons à faire, c'est d'exécuter notre plan pour que la ressource puisse être ajoutée à notre état avec

```shell
terraform apply "plan.tfplan"
# Apply complete! Resources: 1 imported, 0 added, 0 changed, 0 destroyed.

terraform state list
# azurerm_resource_group.hands_on
```

> Veuillez consulter ces ressources et les déplacer dans vos fichiers de configuration principaux.

Et voilà...
