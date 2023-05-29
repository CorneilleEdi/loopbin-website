---
title: Créer une image machine personnalisées sur GCP avec Packer
description: "Comment créer des images personnalisées sur GCP avec Packer"
tags: [gcp, packer, gce]
topics: [gcp, packer]
date: 2023-03-15
slug: creer-une-image-machine-personnalisees-sur-gcp-avec-packer
---

La création d’images personnalisées est un processus très commun permettant de définir les configurations d’une image de base afin qu'elle soit commune dans tous ces cas d’utilisation.

Google Cloud comme tous les autres clouds providers permettent de créer et utilisé des images personnalisées des images personnalisées. Sur Google Cloud, ce processus ressemble à celui-ci:

- Lancez une instance de VM.
- Configurez la machine virtuelle en installant le logiciel et en effectuant des personnalisations.
- Préparez la machine virtuelle en nettoyant les fichiers inutiles et en assurant la stabilité.
- Créez une nouvelle image à partir de l'instance de VM arrêtée.
- Vérifiez l'image en lançant une nouvelle instance de VM à l'aide de l'image personnalisée.
- Utilisez l'image personnalisée pour créer de nouvelles instances de VM avec les configurations souhaitées.

Et bien sûre liste peut etre exaustive si on prend en compte les différentes configurations (identité, sécurité, stockage,…)

Dans ce tutoriel, nous allons explorer l’automatisation de cette création l’aide de Packer.

## Scenario

Vous travaillez dans une entreprise ou chaque machine virtuelle lancée doit contenir votre version à vous de certains logicielle comme par exemple java, python, un logicielle de monitoring et logging système. Afin de s’assurer que les images créer soit preconfiguré, vous décidez de créer des images personnalisé afin de les utiliser sur vos diffèrent Cloud provider.

Vous avez bien sur vos playbook ansible qui vous permettent déjà de faire ces configurations sur vos machines.

C’est le moment d’utiliser un outil comme Packer pour automatiser la création et la configuration de vos images personnalisées.

## C’est quoi une images personnalisées

Une images personnalisées/ image de référence / golden image / master image / baseline image est un modèle d'image pré configuré pour les machines virtuelles. Ces images établissent une base de référence fiable pour la configuration du système.

## Pourquoi utilisé une golden image?

- **définition et maintien d’une configuration (consistance)**: les images de référence permettent de définir des configurations de base pour les images qui se baseront dessus. Ils aident à prévenir la "dérive de configuration" où les systèmes s'écartent d'une configuration idéale en raison de modifications.
- **Sécurité** : les images de référence comprennent le dernier système d'exploitation, les correctifs de sécurité et les règles de durcissement.
- **Automatisation**: La création et le déploiement des images de référence peuvent être automatisés à l'aide d'outils et de frameworks. Aucune installation manuelle de logiciels n'est nécessaire, ce qui élimine tout risque de problèmes de configuration.

## Packer

### C’est quoi Pakcer?

> Packer est un outil open source permettant de créer des images machines identiques pour plusieurs plates-formes à partir d'une configuration source unique.
>

- Packer s'intègre nativement à divers systèmes de gestion de configuration tels qu'**Ansible,** **Puppet, Chef**.
- Packer utilise un fichier de modèle HCL ou JSON pour la définition de vos configurations

Exemple:

```json
{
  "builders": [
    {
      "type": "googlecompute",
      "project_id": "loopbin",
      "source_image": "ubuntu-minimal-2204-jammy-v20230523",
      "zone": "europe-west3-a",
      "machine_type": "e2-medium",
      "image_name": "packer-ubuntu-2204",
      "image_family": "packer-ubuntu-2204",
      "image_description": "packer-ubuntu-2204",
      "ssh_username": "root",
      "disk_size": "10"
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "inline": [
        "sudo apt-get update && sudo apt-get upgrade -y"
      ]
    }
  ]
}
```

### Concepts:

- **Builder**: permet de définir la plate-forme et les configurations de plate-forme souhaitées
- **Communicator**: defini comment Packer se connecte sur l'image de la machine lors de la création. Par défaut, il s'agit de SSH.
- **Provisioners**: Les provisionneurs utilisent des logiciels intégrés et des logiciels tiers pour installer et configurer l'image de la machine après le démarrage.
- **Post-Processors**: facultatifs, ils s'exécute après la création de l'image et vous permettent de faire des actions sur les artefacts comme les uploaders
- **Data sources:**  permettent à Packer de récupérer des données à utiliser dans un template, y compris des informations définies en dehors de Packer.

## Definition du fichier packer utilisateur

### Fichier packer

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

### Description du fichier

Ce fichier est ecrit en [HCL](https://developer.hashicorp.com/packer/docs/templates/hcl_templates). Il definit les configurations pour les differents composants.

- `packer`:  le bloc Packer contient des paramètres Packer, tels qu'une version Packer nécessaire.
  - le bloc Packer contient le bloc `required_plugins`, qui décrit tous les plugins nécessaires au modèle pour construire votre image. Dans notre cas, il s'agit du plugin [googlecompute](https://developer.hashicorp.com/packer/plugins/builders/googlecompute) permettant de construire des images sur GCP (`amazon-ebs` pour AWS). Si il n’est pas defini, Packer utilisera la dernière version du plugin defini dans le bloc `source`
- `variable`: on commence par définir une variable **project_id** qui sera utilisé tout au long de notre fichier.
- le bloc `source`: ce bloc utilise le plugin builder [googlecompute](https://developer.hashicorp.com/packer/plugins/builders/googlecompute)
  - Les builders et les communicators sont utilisés dans les blocs source pour décrire le type de virtualisation à utiliser, comment démarrer l'image que vous souhaitez provisionner et comment s'y connecter.
  - Pour les configurations à ajouter au bloc, veuillez consulter la documentation [googlecompute](https://developer.hashicorp.com/packer/plugins/builders/googlecompute)
- le bloc `build`: définit ce que Packer doit faire avec l'instance GCP après son lancement. Dans notre cas, il s’agit de lancer des scripts bash.


## Authentification et permissions
Pour s’authentifier Packer auprès des services Google Cloud on peut utiliser les informations d'identification par défaut de l'application utilisateur , JSON Service Account Key ou un Access Token.
Les rôles recommandées sont `Compute Instance Admin (v1)` & `Service Account User`

## Construction de l’image
Après la définition du fichier packer nous pouvons lancer les commandes suivantes :

- `packer init <nom_du_fichier>`: Cette commande télécharge les binaires du plugin Packer.
- `packer fmt <nom_du_fichier>`: formatte le fichier packer
- `packer valiate <nom_du_fichier>`: est utilisée pour valider la syntaxe et la configuration du fichier.
- `packer build <nom_du_fichier>`: prend le fichier et effectue toutes les constructions qu'il contient afin de créer un ensemble d'artefacts.
  - l’option `-debug` active le mode debug qui affiche toutes les informations de debuggages.

Pour construire notre golden image, nous lançons les différentes commandes

```bash
packer init loop-node-18-ubuntu-minimal-2204.pkr.hcl

packer fmt loop-node-18-ubuntu-minimal-2204.pkr.hcl

packer validate loop-node-18-ubuntu-minimal-2204.pkr.hcl

packer build loop-node-18-ubuntu-minimal-2204.pkr.hcl
```

Une fois le build terminé, nous pouvons utiliser la commande suivantes pour lister les golden images dans notre projet

```bash
gcloud compute images list --no-standard-images
```

```bash
NAME                              PROJECT          FAMILY            DEPRECATED  STATUS
loop-node-18-ubuntu-minimal-2204  XXX              loop-ubuntu-2204              READY
```

## Automatisation avec Cloud Build

Il est bien sûr d’utiliser Cloud Build afin d’automatiser le build des images avec packer.
Nous explorerons cette partie dans un autre tutoriel.

## Conclusion

Enfin, Packer rationalise la production d'images en automatisant la génération et le provisionnement des images machine sur plusieurs plates-formes. L'utilisation de Packer pour créer une image Google Compute Engine sur mesure offre des avantages significatifs en termes de cohérence, de répétabilité et d'efficacité.

Merci
