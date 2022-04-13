---
title: Vagrant 08 - Dossiers synchronisés
description: Synchronisation entre hôte et machine virtuelle
tags: [vagrant]
topics: [vagrant]
date: 2021-02-13
slug: vagrant-08-dossiers-synchronises
---

#

Les machines virtuelles sont très utiles, mais ce n'est pas très commode pour certaines personnes d'éditer des fichiers à l'aide d'un simple éditeur basé sur un terminal via SSH. Vagrant nous offre une option pour synchroniser automatiquement des fichiers de la machine hôte vers et depuis la machine virtuelle. De cette façon, il est possible de modifier les fichiers localement et de les exécuter dans l'environnement virtuel. Dans ce passage nous allons explorer cette approche.

## Configuration

Pour mettre en place une synchronisation, il suffit juste d'écrire une configuration en précisant le dossier ou les fichiers sur machine et leur destination dans la machine virtuelle.

```bash
config.vm.synced_folder [dossier sur votre machine], [dossier sur la machine virtuelle]
```

Exemple

```bash
config.vm.synced_folder "build/", "/build"
```

Pratique

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "peru/ubuntu-20.04-server-amd64"

  config.vm.network "private_network", ip: "10.20.0.3"

  config.vm.synced_folder "nodejs-api/", "/home/vagrant/nodejs-api"

  config.vm.provider "virtualbox" do |v|
    v.gui = false
    v.memory = "1024"
    v.cpus = 1
  end
end
```

Dans cet exemple je synchronise le dossier `nodejs-api` se trouvant sur ma machine directement dans ma machine virtuelle à l'emplacement `home/vagrant/nodejs-api`. Tout changement dans ce dossier se reflétera directement dans ma machine virtuelle

## Plus

Il est aussi possible d'assigner des utilisateurs, des groupes d'utilisateurs et des permissions aux dossiers / fichiers synchronisés ou même désactiver la synchronisation avec l'option `disabled`.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "peru/ubuntu-20.04-server-amd64"

  config.vm.network "private_network", ip: "10.20.0.3"

  config.vm.synced_folder "nodejs-api/", "/home/vagrant/nodejs-api", disabled: true, owner: "vagrant",
						 group: "vagrant",:mount_options => ["dmode=777", "fmode=666"]

  config.vm.provider "virtualbox" do |v|
    v.gui = false
    v.memory = "1024"
    v.cpus = 1
  end
end
```
