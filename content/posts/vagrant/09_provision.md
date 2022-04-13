---
title: Vagrant 09 - Provision / Approvisionnement
description: Approvisionnement des machines
tags: [vagrant]
topics: [vagrant]
date: 2021-02-14
slug: vagrant-09-provision-approvisionnement
---

#

Installer une une image et lancer une machine virtuelle est simple mais comment pouvons nous automatiquement installer des logicielles et configurer d'environnement. Dans cet article nous allons explorer les différents outils de provision et explorer la provision avec shell.

Les approvisionneurs de Vagrant vous permettent d'installer automatiquement des logiciels, de modifier les configurations et plus encore sur la machine dans le processus de démarrage.

Imaginez que vous partager un Vagrantfile avec votre équipe pour que tout le monde puisse mettre en place le même environnement de développement pour votre projet et que le Vagrantfile ne fait que créer une machine virtuelle sans aucuns logiciel, librairie ou configuration et que les membres de l'équipe soit maintenant appelle à faire les informations eux meme. Cette situation est exactement la raison pour laquelle Vagrant a été créé.

Grâce aux approvisionneurs, lancer un vagrantfile se chargera d'installer tout ce qu'il faut.

Les approvisionneurs courants sont:

- Shell
- Docker
- Ansible
- Chef
- et autres ...

## Quand s'effectue l'approvisionnement ?

L'approvisionnement se produit à certains moments pendant la durée de vie de votre environnement Vagrant:

- Sur le premier lancement qui crée l'environnement, l'approvisionnement est exécuté. Si l'environnement a déjà été créé et que le lancement ne fait que reprendre une machine ou la démarrer, ils ne fonctionneront pas à moins que l'indicateur `--provision` ne soit explicitement fourni.
- Lorsque la commande de provisionnement (`vagrant provision`) est utilisée sur un environnement en cours d'exécution.
- Lorsque l'environnement est relancer(`vagrant reload`) avec l'indicateur `--provision`

Il est aussi possible de ne pas exécuter explicitement les approvisionneurs en spécifiant `--no-provision`.

## Approvisionnement avec la ligne de commande (SHELL)

Il est très simple de faire l'approvisionnement en exécutant des lignes de commande.

Il existe deux façon de faire l'approvisionnement shell

- approvisionnement Shell en ligne/ inline
- approvisionnement Shell avec un chemin vers un fichier ou un lien

### Approvisionnement Shell en ligne/ inline

Avec cette méthode, nous écrivons nos commandes bash en ligne pour que le provisionnement du shell fonctionne.

il est possible d'utiliser plusieurs syntaxe:

- syntaxe en une ligne: elle permet de spécifier la commande à lancer en une seule ligne

```ruby
config.vm.provision "shell",
    inline: "apt-get update"
```

- syntaxe en plusieurs ligne

elle permet de spécifier la commande à lancer en plusieurs ligne

```ruby
config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get upgrade -y
    apt-get install nginx -y
SHELL
```

Notez les délimiteurs `<<-SHELL` au début et `SHELL` à la fin.

- syntaxe en variable

```ruby
$script = <<-'SCRIPT'
	apt-get update
    apt-get upgrade -y
	apt-get install nginx -y
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: $script
end
```

### Approvisionnement Shell avec un chemin vers un fichier ou un lien

Pour ne pas encombrer le Vagrantfile, il est possible d'extraire les scripts de provision et les mettre dans un fichier shell. Pour les exécuter, il suffit de préciser l'argument path avec le chemin vers le fichier.

```ruby
config.vm.provision "shell", path: "install_java8.sh"
```

Dans le cas ci-dessus, Vagrant cherchera le fichier exécutable `install_java8.sh` dans le dossier de travail et l'excutera.

Il est possible de passer une url comme path. Vagrant s'occupera du reste.

```ruby
config.vm.provision "shell", path: "https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh"
```

## Permission

Dans certains cas, vous auriez envie de lancer la commande sans permission root par defaut. Pour cela il suffit de passer la valeur `false` à l'argument privileged.

```ruby
config.vm.provision "shell", path: "install.sh", privileged: false
```

Pratique

scripts/install_curl.sh

```bash
echo '=====   Mise à jour   ====='
apt-get update

echo '=====   Installation de cURL    ====='
apt-get install curl -y
```

Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "peru/ubuntu-20.04-server-amd64"

  config.vm.network "private_network", ip: "10.20.0.3"

  config.vm.provider "virtualbox" do |v|
    v.gui = false
    v.memory = "1024"
    v.cpus = 1
  end

  config.vm.provision "shell", path: "scripts/install_curl.sh"
end
```

Commande

```bash
vagrant up --provision
```
