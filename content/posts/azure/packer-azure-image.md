---
title: Créer une image machine personnalisées sur Azure avec Packer
description: "Comment créer des images personnalisées sur Azure avec Packer"
tags: [azure, packer]
topics: [azure, packer]
date: 2023-12-09
slug: creer-une-image-machine-personnalisees-sur-azure-avec-packer
---

Dans un article précèdent, nous avons exploré le processus de création d’une image machine personnalisée sur Google Cloud.

Lien vers l’article:
<post-item-with-id slug="creer-une-image-machine-personnalisees-sur-gcp-avec-packer"></post-item-with-id>

Dans celui-ci, nous allons faire la même chose sur Azure. Le scénario reste le même.

## Scenario

Vous travaillez dans une entreprise ou chaque machine virtuelle lancée doit contenir votre version à vous de certains logicielle comme par exemple java, python, un logiciel de monitoring et logging système. Afin de s’assurer que les images créées soient preconfiguré, vous décidez de créer des images personnalisées afin de les utiliser sur vos diffèrents Cloud provider.

Vous avez bien sur vos playbook ansible qui vous permettent déjà de faire ces configurations sur vos machines.

C’est le moment d’utiliser un outil comme Packer pour automatiser la création et la configuration de vos images personnalisées.

Je vous invite à lire, l'article precedent pour vous familiariser avec les concepts de `images personnalisées/ image de référence / golden image / master image / baseline image`

## Étapes à suivre

- Créér un Resource Group
- Créer un Azure Active Directory service principal
- Écrire, valider et lancer le template packer
- Tester l’image créée en créant une VM

Nous allons utiliser Azure CLI pour nos actions.

## Créér un Resource Group

Assez simple avec [az group create](https://learn.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-create).

```bash
az group create --name "lab-resource-group"  --location francecentral
```

```yaml
{
  "id": "/subscriptions/xxx/resourceGroups/lab-resource-group",
  "location": "francecentral",
  "managedBy": null,
  "name": "lab-resource-group",
  "properties": {
    "provisioningState": "Succeeded"
  },
  "tags": null,
  "type": "Microsoft.Resources/resourceGroups"
}
```

## Créér une shared image gallery pour nos images.

Déjà, c’est quoi une Shared Image Gallery? Le nom est explicite, c'est un répertoire d’image machine bien définie et versionner qui permet de stocker et de gérer les différentes images personnalisées qu’on crée.

### Principales fonctionnalités

- Gestion des versions
- Réplication
- Contrôle d'accès

### Composants:

Voici à quoi ressemble l’arborescence des ressources inclus dans le `shared image gallery`

```markdown
Galerie d'images partagées (SIG)
│
├── Galerie
│   ├── Définition d'image
│   │   └── Version d'image
│   │       ├── Réplication
│   │       └── Contrôle d'accès
│   │
│   └── Définition d'image
│       └── Version d'image
│           ├── Réplication
│           └── Contrôle d'accès
│
└── Contrôle d'accès
```

### Creation

- Shared Image Gallery

  Nous allons utiliser la commande [az sig create](https://learn.microsoft.com/en-us/cli/azure/sig#az-sig-create) pour créer la galerie.

```bash
az sig create \ 
  --resource-group lab-resource-group \ 
  --gallery-name loopbin_linux_image_gallery
```


- Définition de l’image

  Nous allons utiliser la commande [az sig image-definition create](https://learn.microsoft.com/en-us/cli/azure/sig/image-definition?view=azure-cli-latest#az-sig-image-definition-create) pour créer la galerie.

```bash
az sig image-definition create \
        --resource-group lab-resource-group \
        --gallery-name loopbin_linux_image_gallery \
        --gallery-image-definition loopbin-ubuntu-server-2204 \
        --publisher "Loopbin" \
        --offer "basic" \
        --sku "standard" \
        --os-type linux \
        --os-state Generalized \
        --hyper-v-generation V2
```


## Créer un Azure Active Directory service principal

Nous allons créer un service principal (service account sur Google Cloud) afin de nous authentifie sur Azure. Nous donnerons aussi des rôles à ce service pour qu’il puisse faire les actions nécessaires.

Avant de créer notre service principal, pour ne pas utiliser le rôle `Contributor` nous allons créer un rôle spécialement pour packer

### Definition du roles

Voici la définition de notre rôle

```json
{
  "Name": "PackerDeployRole",
  "Description": "Role pour Packer",
  "Actions": [
    "Microsoft.Compute/*/write",
    "Microsoft.Compute/*/read",
    "Microsoft.Compute/*/delete",
    "Microsoft.Compute/virtualMachines/*",
    "Microsoft.Compute/images/write",
    
    "Microsoft.Storage/*/read",
    "Microsoft.Storage/storageAccounts/listKeys/action",
    
    "Microsoft.Resources/subscriptions/resourceGroups/read",
    "Microsoft.Resources/subscriptions/resourceGroups/resources/read",
    "Microsoft.Resources/deployments/*",
    
    "Microsoft.Network/virtualNetworks/*",
    "Microsoft.Network/networkInterfaces/*",
    "Microsoft.Network/publicIPAddresses/*"
  ],
  "AssignableScopes": [
    "/subscriptions/XXX/resourceGroups/lab-resource-group"
  ]
}
```

Et la commande suivant pour la création du rôle

```bash
az role definition create --role-definition PackerDeployRole.json
```

### Service principal

Nous allons utiliser la commande [`az ad sp create-for-rbac`](https://learn.microsoft.com/en-us/cli/azure/ad/sp)

```bash
az ad sp create-for-rbac \
         --display-name "packer-service-principal" \
         --role PackerDeployRole \
         --scopes "/subscriptions/XXX/resourceGroups/lab-resource-group" \
         --query "{ ClientId: appId, ClientSecret: password, TenantId: tenant }"
```

En précisant l’option `—qeury`, cette commande ne nous retournera que le appId (ClientId), password (ClientSecret) et tenant (TenantId) que nous utiliserions pour authentifier Packer dans notre script HCL.

## Écrire, valider et lancer le template packer

### Écrire

Notre script sera le suivant:

`azure-ubuntu-2204.pkr.hcl`

```bash
packer {
  required_plugins {
    azure = {
      source  = "github.com/hashicorp/azure"
      version = "~> 2"
    }
  }
}

variable "subscription_id" {
  type        = string
  description = "ID d'abonnement Azure"
}

variable "client_id" {
  type        = string
  description = "ID client Azure (ID du principal de service)"
}

variable "client_secret" {
  type        = string
  description = "Secret client Azure (mot de passe du principal de service)"
}

variable "tenant_id" {
  type        = string
  description = "ID du locataire Azure"
}

variable "resource_group" {
  type        = string
  description = "Groupe de ressources Azure"
}

variable "gallery_name" {
  type        = string
  description = "Nom de la galerie d'images partagées"
  default     = "linux_image_gallery"
}

variable "image_name" {
  type        = string
  description = "Nom de l'image"
  default     = "ubuntu-server-2204"
}

variable "image_version" {
  type        = string
  description = "Version de l'image"
  default     = "1.0.0"
}

source "azure-arm" "ubuntu-base" {
  client_id       = var.client_id
  client_secret   = var.client_secret
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id

  os_type         = "Linux"
  image_offer     = "0001-com-ubuntu-server-jammy"
  image_publisher = "Canonical"
  image_sku       = "22_04-lts-gen2"

  vm_size = "Standard_DS2_v2"

  build_resource_group_name         = var.resource_group
  managed_image_name                = "${var.image_name}-${var.image_version}"
  managed_image_resource_group_name = var.resource_group

  shared_image_gallery_destination {
    subscription         = var.subscription_id
    resource_group       = var.resource_group
    gallery_name         = var.gallery_name
    image_name           = var.image_name
    image_version        = var.image_version
    replication_regions  = ["westeurope"]
    storage_account_type = "Standard_LRS"
  }

  communicator = "ssh"
}

build {
  sources = ["source.azure-arm.ubuntu-base"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update && sudo apt-get upgrade -y"
    ]
  }
}
```

Les différentes parties

- `plugins`: nous spécifions le plugin Azure à utiliser pour cette configuration Packer.
- `variables`: déclaration de diverses variables qui seront utilisées tout au long de la configuration de Packer. Certains ont des valeurs par défaut et d'autres seront spécifiés dans la commande packer build
- `source "azure-arm" "ubuntu-base"`:Le bloc source spécifie le générateur de sources dans Packer, ici spécifiquement pour Azure ARM. Dans ce bloc, des configurations spécifiques liées à Azure ARM sont définies, telles que les détails d'authentification (ID client, secret client, ID d'abonnement, ID de locataire), le type de système d'exploitation, les détails de l'image comme l'offre, l'éditeur et le SKU, la taille de la VM, et des détails sur l'image gérée et la galerie d'images partagées où l'image sera stockée.
- `build`: Définit ce qui doit être construit par Packer. Ici, il utilise la source `source.azure-arm.ubuntu-base` précédemment définie.
- `provisioner`: fournisseur (de type shell dans ce cas) qui exécutera un ensemble de commandes pendant le processus de création d'images. Dans notre cas, il exécute un script shell pour mettre à jour et mettre à niveau les packages dans l'image en cours de création.

Revenons sur quelques attributs de notre source:

- `shared_image_gallery_destination` : Cela nous aidera à spécifier les propriétés de la galerie d'images partagées sous lesquelles l'image gérée sera publiée en tant que version d'image de la galerie partagée.
- `image_offer`, `image_publisher`, `image_sku` sont des informations à propos de votre image de base qui peuvent être récupère de plusieurs façons différentes
- Azure CLI

```bash
az vm image list --offer Ubuntu --all --output table
```

  - le paramètre `--offer` spécifiant la distribution Linux. On peut remplacer Ubuntu par d'autres distributions Linux telles que Debian, CentOS, RedHat, etc.
  - Site:
    - Dans la marketplace Azure
    - Azure VM Image List: https://az-vm-image.info/

Notre fichier de variable `vars.pkrvars.hcl` ressemble a ceci

```bash
subscription_id = "XXXX"
client_id = "XXXX"
client_secret = "XXXX"
tenant_id = "XXXX"
resource_group = "XXXX"
```

*`client_id`*, *`client_secret`* *et* *`tenant_id` nous on été donne comme résultat après la création du service principal pour packer.*

### Valider

Valider notre fichier packer est assez simple, il suffit d’utiliser la commande

```bash
packer validate -var-file="vars.pkrvars.hcl" azure-ubuntu-2204.pkr.hcl
```

### Build

Pour `build` notre image, nous allons utiliser la commande suivante

```bash
packer build -var-file="vars.pkrvars.hcl" azure-ubuntu-2204.pkr.hcl
```

Après le build terminé, nous pourrons avoir des infos à propos de notre image avec la commande

```bash
az image show --resource-group lab-resource-group \
     --name loopbin-ubuntu-server-2204-1.0.0 \
     --output yamlc
```

## Tester l’image créér en créant une VM

On peut utiliser une commande simple pour la création de la VM

```bash
az vm create \
    --resource-group lab-resource-group \
    --name test-loopbin-ubuntu-server-2204-1.0.0 \
    --image loopbin-ubuntu-server-2204-1.0.0 \
    --admin-username looper \
    --generate-ssh-keys
```

On peut aussi sélectionner l’image durant la création de la VM par Azure Portal.
