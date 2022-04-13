---
title: Vagrant - Les commandes à retenir
description: Résumé des commandes à retenir
tags: [vagrant]
topics: [vagrant]
date: 2021-02-15
slug: vagrant-les-commandes-a-retenir
---

#

## Créer une machine virtuelle

- `vagrant init` - Initialise Vagrant avec un répertoire Vagrantfile et ./.vagrant, en utilisant aucune image de base spécifiée. Avant de pouvoir faire vagabonder, vous devrez spécifier une image de base dans le Vagrantfile.
- `vagrant init <chemin vers l'image/box>` - Initialise Vagrant avec une boîte spécifique. Pour trouver une boîte, accédez au catalogue public de boîtes Vagrant. Lorsque vous en trouvez un que vous aimez, remplacez simplement son nom par boxpath. Par exemple, vagrant init ubuntu / trusty64.

## Démarrer un VM

- `vagrant up` - commence l'environnement virtuel
  Vagrant CV - reprendre une machine suspendue (vagrant up fonctionne très bien pour cela aussi)
  fourniture de vagabonds - force le réapprovisionnement de la machine vagabonde
- `vagrant reload` - redémarre la machine, charge la nouvelle configuration de Vagrantfile
- `vagrant reload --provision` - redémarre la machine virtuelle et force l'approvisionnement

## Se connecter à un VM

- `vagrant ssh` - se connecte à la machine via SSH

## Arrêter un VM

- `vagrant halt` - arrête la machine du vagabond
- `vagrant suspend` - suspend une machine virtuelle (sauvegarde l'état)

## Détruire un VM

- `vagrant destroy` - arrête et supprime toute trace de la machine

## Gestion des Images/Box

- `vagrant box list` voir une liste de toutes les image/box installées sur votre ordinateur
- `vagrant box add <nom ou url>`- téléchargez une image de la boîte sur votre ordinateur
- `vagrant box outdated` - vérifier les mises à jour
- `vagrant box remove <nom>` - supprime une boîte de la machine
