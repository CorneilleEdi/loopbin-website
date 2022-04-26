---
title: Vagrant 01 - Avant de commencer avec Vagrant
description: Les terminologies et pratiques
tags: [vagrant]
topics: [vagrant]
date: 2021-02-06
slug: vagrant-01-avant-de-commencer-avec-vagrant
next: vagrant-02-installation
prev: vagrant-00-cest-quoi-vagrant
---

Avant de commencer à utiliser Vagrant, il y a des terminologies spécifique à comprendre

Pour plus d'information visiter la documentation officielle

[https://www.vagrantup.com/docs](https://www.vagrantup.com/docs)

## Box (Image)

Une Box est un environnement Vagrant packagé, généralement une machine virtuelle. Donc il existe des box comme ubuntu/xenial64 pour Ubuntu 16.04 LTS (version officielle publiée par Ubuntu).

Le moyen le plus simple de trouver des box est de chercher dans le catalogue public des box Vagrant ([https://vagrantcloud.com/boxes/search](https://vagrantcloud.com/boxes/search)) une box correspondant à votre cas d'utilisation. Le catalogue contient la plupart des principaux systèmes d'exploitation comme bases, ainsi que des boîtiers spécialisés pour vous permettre de démarrer rapidement avec les piles LAMP, Ruby, Python, etc.

Les box du catalogue public fonctionnent avec de nombreux fournisseurs différents. Que vous utilisiez Vagrant avec VirtualBox, VMware, AWS, etc., vous devriez pouvoir trouver la box dont vous avez besoin.

Une boite se décrit de la manière suivante:

utilisateur/boîte.

Vous pouvez aussi créer votre propre box et la partager avec le publique

## Provider (fournisseur)

Un provider est l'emplacement dans lequel l'environnement virtuel s'exécute. Il peut être local (la valeur par défaut est d'utiliser VirtualBox) ou distant.

Configurer le fournisseur permet de spécifier les configuration de la machine virtuelle comme le nombre processeur, la capacité de la mémoire RAM, la capacité de stockage et autres.

Il est alors nécessaire d'avoir un fournisseur avant de commencer.

## Provisioner (Approvisionneur)

Un approvisionneur est un outil pour configurer l'environnement virtuel. Il peut être aussi simple qu'un script shell, mais en variante, un outil plus avancé comme Chef, Puppet ou Ansible peut être utilisé.

l'approvisionnement peut vous permettre d'installer des librairies, des logiciels et faire tout ce que vous aimeriez faire pour configurer l'environnement virtuel.

Par exemple, vous pouvez écrire un script qui installera NodeJs et NGINX dans votre environnement au moment de la création

Quand s'effectue l'approvisionnement L'approvisionnement se produit à certains moments pendant la durée de vie de votre environnement Vagrant:

- Sur le premier lancement qui crée l'environnement, l'approvisionnement est exécuté. Si l'environnement a déjà été créé et que le lancement ne fait que reprendre une machine ou la démarrer, ils ne fonctionneront pas à moins que l'indicateur `--provision` ne soit explicitement fourni.
- Lorsque la commande de provisionnement (vagrant provision) est utilisée sur un environnement en cours d'exécution.

Lorsque l'environnement est relancer(vagrant reload) avec l'indicateur `--provision`

Il est aussi possible de ne pas exécuter explicitement les approvisionneurs en spécifiant --no-provision.

## Environnement Vagrant

C'est un environnement qui contient un Vagrantfile. Quand une commande vagrant est lancé dans un dossier contenant un Vagrantfile, que la commande s'applique à une machine en spécifique et qu'aucun nom n'est spécifié , Vagrant applique la commande à la machine virtuelle créée à l'aide du Vagrantfile qui existe dans le dossier courant
