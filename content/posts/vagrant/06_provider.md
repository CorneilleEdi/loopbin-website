---
title: Vagrant 06 - Provider/Fournisseur
description: Notion de Provider/Fournisseur
tags: [vagrant]
topics: [vagrant]
date: 2021-02-11
---

#

Dans ce post nous allons explorer le concept de provider dans vagrant. Nous allons spécialement utiliser VirtualBox (le provider par défaut).

D'autre provider peuvent être :

- VMWare
- Microsoft Hyper V
- Docker
- Des environnements de cloud public virtualisé supportant Vagrant (Amazon EC2, Google Cloud Compute Engine)

VirtualBox est le fournisseur par défaut de Vagrant par défaut. VirtualBox est toujours la plateforme Vagrant la plus accessible: elle est ouverte, multiplateforme, et est financée depuis des années par Vagrant. Avec VirtualBox comme fournisseur par défaut, il est plus facile à un débutant d'introduire le monde de la virtualisation.

## Configuration

Vu que virtualiser consiste à mettre en place une machine avec les caractéristiques précises (CPU, RAM, Stockage), il nous faudra configurer votre provider de telle sorte. La configuration étant bien sûr faite explicitement dans le Vagrantfile.

Voici ci dessous un exemple de configuration

```ruby
Vagrant.configure("2") do |config|
    config.vm.box = "peru/ubuntu-20.04-server-amd64"
    config.vm.box_check_update = false

    # Fournisseur
    config.vm.provider "virtualbox" do |v|
      v.gui = false
      v.memory = 1024
      v.cpus = 1
    end
  end
```

L'accès au provider se fait grâce l'attribut provider de la variable `config.vm` .

En spécifiant `virtualbox` , nous spécifions le provider que nous souhaitons utiliser pour notre VM.

Pour VMWare, la configuration serait par exemple

```ruby
config.vm.provider "vmware_desktop" do |v|
    v.gui = true
 end
```

Notez que l'accès au provider nous retourne une nouvelle variable que j'ai décidé de nommer `v`.

Avec cette variable nous pouvons configurer notre provider.

`v.gui = false` précise que nous ne voulions pas avoir l'interface de votre machine virtuelle ouverte au lancement. Cette approche empêche le provider d'ouvrir une fenêtre au lancement de la machine. C'est une option que j'aime utiliser quand ma machine virtuelle est basée sur une version server comme par exemple ubuntu server 20.04. Dans ce cas je n'aurai pas la fenêtre de virtualbox ouverte au lancement de ma machine avec `vagrant up` et je pourrait faire un `vagrant ssh` pour m'y connecter depuis le terminal.

`v.memory = 1024` spécifie la capacité de la mémoire RAM de notre VM à 1024MB soit 1GB.

`v.cpus = 1` précise le nombre de processeurs octroyés à ma machine.

Les configurations peuvent être précisé avec la syntaxe suivante

```ruby
v.customize ["modifyvm", :id, "--memory", "512"]
```

Cette ligne de code spécifie la capacité de la mémoire RAM de notre VM à 512MB soit 0.5GB.

Rendez-vous sur la documentation de virtualbox [https://www.virtualbox.org/manual/ch08.html](https://www.virtualbox.org/manual/ch08.html) pour savoir tout ce que vous pouvez customiser avec cette approche.

Plus d'informations sur les provider dans la documentation officielle de Vagrant [https://www.vagrantup.com/docs/providers](https://www.vagrantup.com/docs/providers)
