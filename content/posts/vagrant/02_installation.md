---
title: Vagrant 02 - Installation
description: Installation de Vagrant
tags: [vagrant]
topics: [vagrant]
date: 2021-02-07
---

Comme expliqué dans les articles précédents sur les bases de Vagrant, il est nécessaire d'avoir un Provider avant de commencer avec Vagrant.

Le provider peut être

- VirtualBox (Le logiciel de virtualisation développé par Oracle)
- VMWare
- Microsoft Hyper V
- Docker
- Des environnements de cloud public virtualisé supportant Vagrant (Amazon EC2, Google Cloud Compute Engine)

Dans mes articles, j'utiliserai le provider par défaut VirtualBox.

## VirtualBox

VirtualBox est un logiciel open source de virtualisation de l'architecture informatique x86. Il agit comme un hyperviseur, créant une VM (machine virtuelle) où l'utilisateur peut exécuter un autre OS (système d'exploitation).

Le système d'exploitation sur lequel VirtualBox s'exécute est appelé OS "hôte". Le système d'exploitation qui s'exécute dans la VM est appelé OS "invité". VirtualBox prend en charge Windows, Linux ou macOS comme système d'exploitation hôte.

### Installer VirtualBox

Rendez-vous sur [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads) pour installer virtualbox sur votre système.

## Installer Vagrant

Il est très facile d'installer Vagrant. Tout ce que vous avez à faire c'est aller sur le site officiel et installer la version qui vous convient.

[https://www.vagrantup.com/downloads](https://www.vagrantup.com/downloads)

## Tester votre installation

Vous pouvez tester l'installation de Vagrant avec la commande suivante

vagrant version

Vous aurez un message ressemblant à celui ci dessous si Vagrant a été bien installer

```bash
➜  ~ vagrant version

Installed Version: 2.2.14

Latest Version: 2.2.14

You're running an up-to-date version of Vagrant!

➜  ~
```

Je travaille avec la dernier version 2.2.14
