---
title: Vagrant 03 - Les Box / Images
description: Notion de box / image
tags: [vagrant]
topics: [vagrant]
date: 2021-02-08
slug: vagrant-03-les-box-images
---

#

Avant de créer notre environnement virtuel, il va falloir que nous choisissons et installons une image.

l'installation de l'image peut aussi se faire lors de la configuration. Si le box n'existe pas sur votre machine, Vagrant se chargera de le télécharger pour vous.

[https://app.vagrantup.com/boxes/search](https://app.vagrantup.com/boxes/search)

> Certaines images sont seulement capacble de tourner sur des fournisseurs specifique (VirtualBox, VMWare, etc..)

L'utilitaire `vagrant box` fournit toutes les fonctionnalités de gestion des box.

La fonctionnalité principale de cette commande est exposée via encore plus de sous-commandes:

- add
- list
- outdated
- prune
- remove
- repackage
- update

### vagrant box add

Cette commande télécharge une box avec l'adresse donnée . L'adresse peut être un nom abrégé du catalogue public des images Vagrant disponibles, comme `hashicorp/bionic64` ou un chemin de fichier ou URL HTTP vers un box dans le catalogue.

pour installer l'image de Ubuntu 20.04

### vagrant box list

Cette commande répertorie toutes les boîtes installées dans Vagrant.

```bash
➜  ~ vagrant box list

peru/ubuntu-20.04-server-amd64 (virtualbox, 20210202.01)

➜  ~
```

### vagrant box update

Cette commande met à jour la boîte de l'environnement Vagrant actuel si des mises à jour sont disponibles. La commande peut également mettre à jour une boîte spécifique (en dehors d'un environnement Vagrant actif), en spécifiant l'indicateur `--box`.

### vagrant box remove

Cette commande nécessite un nom de box.

Cette commande supprime une boîte de Vagrant qui correspond au nom donné.

```bash
vagrant box remove laravel/homestead
```

Il est possible de spécifier la version de l'image si vous avez plusieurs version installer avec le paramètre `--box-version`

```bash
vagrant box remove laravel/homestead --box-version=0.1.7
```

Vous pouvez aussi supprimer toutes les version avec `--all`

### vagrant box prune

Cette commande supprime les anciennes versions des boîtiers installés. Si la boîte est actuellement utilisée, vagrant demandera une confirmation.
