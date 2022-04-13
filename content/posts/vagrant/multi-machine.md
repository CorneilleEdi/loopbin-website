---
title: Lancer plusieurs machines avec Vagrant
description: Configurer Vagrantfile pour lancer plusieurs machines
tags: [vagrant]
topics: [vagrant]
date: 2021-02-17
slug: lancer-plusieurs-machines-avec-vagrant
---

#

Vagrant est utile, très utile pour mettre en place un environnement virtuel mais il est aussi possible de lancer plusieurs environnements avec un seul fichier de configuration. Dans cet article nous allons explorer cette approche. Un tel environnement est appelé un environnement `multi-machine`

## Pourquoi le faire ?

Même si il est possible de le faire, il est intéressant d'explorer les raisons qui puissent pousser quelqu'un à lancer plusieurs environnements avec un seul Vagrantfile.

- Modélisation précise d'une topologie de production multi-serveurs, telle que la séparation d'un serveur Web et d'un serveur de base de données.
- Modéliser un système distribué et comment ils interagissent les uns avec les autres.
- Tests en cas de catastrophe: machines en train de mourir, partitions de réseau, réseaux lents, vues du monde incohérentes, etc.
- Tester la réplication de certaines bases de données.

## Configurations

Il existe plusieurs façons de réussir cette approche. Pour commencer, il faut noter que le Vagrantfile est d'abord basé sur un langage de programmation donc nous avons accès à des notions comme les boucles , les conditions , les variables, les listes, etc.

### Plusieurs configurations

```ruby
Vagrant.configure("2") do |configuration1|
 # configuration de la machine 1
end

Vagrant.configure("2") do |configuration2|
 # configuration de la machine 2
end

Vagrant.configure("2") do |configuration3|
 # configuration de la machine 3
end
```

```ruby
Vagrant.configure("2") do |config|

  config.vm.define "machine1" do |configuration1|
    # configuration de la machine 1
  end

  config.vm.define "machine2" do |configuration2|
    # configuration de la machine 2
  end
end
```

### Listes de machine

```ruby
machines=[
  {
    :hostname => "machine1",
    :ip => "192.168.100.10",
    :box => "hashicorp/bionic64",
    :ram => 1024,
    :cpu => 1
  },
  {
    :hostname => "machine2",
    :ip => "192.168.100.11",
    :box => "hashicorp/bionic64",
    :ram => 2048,
    :cpu => 2
  }
]

Vagrant.configure(2) do |config|
    machines.each do |machine|
        config.vm.define machine[:hostname] do |node|
            node.vm.box = machine[:box]
            node.vm.hostname = machine[:hostname]
            node.vm.network "private_network", ip: machine[:ip]
            node.vm.provider "virtualbox" do |vb|
				vb.gui = false
				vb.memory = machine[:ram]
				vb.cpus = machine[:cpu]
            end
        end
    end
end
```

Cette approche definit une liste de machines avec leurs configurations. Dans la configuration de Vagrant, nous utilisons une boucle pour traverser chaque element de la liste et utiliser chaque configuration pour lancer une machine.

Dans ce cas, toutes les commandes qui marchent normalement dans un dossier nécessiteront la précision de la machine sur laquelle les exécuter. Par exemple, `vagrant shh` deviendra `vagrant ssh machine1`

## Cas d'utilisation

Peronnellement j'utilise cette approche pour

- mettre en place des architectures multi-serveurs et tester des fonctionnalitées comme les load-balancer
- tester la replications des certains logiciels comme RabbitMQ, Redis, MySQL
- Mettre en place un reseau et mettre en pratique certaines connaissance.
