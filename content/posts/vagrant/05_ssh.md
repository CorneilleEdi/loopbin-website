---
title: Vagrant 05 - Se connecter avec SSH
description: SSH dans une machine Vagrant en cours d'exécution
tags: [vagrant]
topics: [vagrant]
date: 2021-02-10
slug: vagrant-05-se-connecter-avec-ssh
next: vagrant-06-provider-fournisseur
prev: vagrant-04-creation-de-notre-premiere-machine
---

#

Après avoir construit la machine vagrant, vous aurez surement envie de vous y connecter avec ssh. Vagrant offre des commandes pour ce cas.

## Commande

Pour se connecter en SSH (secure shell) à votre VM il suffit d'utiliser la commande

```bash
vagrant ssh
```

NB: votre VM devra être entrain de tourner dans le cas contraire cette commande échouera

![ssh](/images/vagrant/ssh.png)

## Les informations de la connection SSH

la commande vagrant ssh fonctionne parfaitement mais dans le cas ou vous aimeriez avoir les information ssh de votre machine virtuel (pour par exemple connecter votre éditeur de texte à votre VM afin d'y coder directement), il vous faudra utiliser le commande suivant

```bash
vagrant ssh-config
```

Resultat

```bash
Host default
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /home/corneilledi/vms/vagrant-learning/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

Si vos configuration sont assez statiques vous pouvez copiez ces configurations dans le fichier ssh de votre machine pour pouvoir vous connecter sans vagrant.
