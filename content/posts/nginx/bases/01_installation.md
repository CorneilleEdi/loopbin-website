---
title: NGINX 01 - Installation et configuration
description: Installer NGINX sur Linux
tags: [nginx]
topics: [nginx]
date: 2020-12-06
slug: nginx-01-installation-et-configuration
---

# Installation

Dans cette partie nous allons installer NGINX sur Linux. Pour plus de précision , veuillez consulter la documentation de NGINX.

<action-button type="doc" text="Documentation" link="https://www.nginx.com/resources/wiki/start/topics/tutorials/install/"></action-button>

## Installation

Il existe deux méthodes pour installer NGINX sur Linux.

- Avec le repectoire d'application (APT sur Ubuntu)
- En Compilant le code source

### Avec le repectoire d'application

```bash
sudo apt-get update
sudo apt-get -y install nginx
```

### Installation en compilant le code source

**Cette étape sera basée sur la distribution Ubuntu de Linux**

> **Attention!**
>
> cette approche configure NGINX suivant vos besoins, pour plus d'informations veuillez consulter la documentation

La première étape serait de télécharger le code source. Pour cela nous allons utliser le programme **wget**. Ouvrez votre terminal et faites

```bash
wget http://nginx.org/download/nginx-1.19.2.tar.gz
```

En effet **1.19.2** est la version actuelle de NGINX. Pour savoir quelle version est la plus récente, rendez-vous sur [https://nginx.org/en/download.html](https://nginx.org/en/download.html)

Une fois le fichier compressé téléchargé, vous pouvez utiliser la commande suivante pour l'extraire ou Bien le faire manuellement.

```bash
tar -zxvf nginx-1.19.2.tar.gz
```

#### Configuration

Maintenant, passons à l'installation. Entrez dans le dossier décompressé avec la commande **cd** et faites

```bash
./configre
```

Elle vérifiera si vous avez toutes les librairies requises installées. Sinon, vous aurez un message qui vous indiquera quelles librairies installer avant de continuer. Communément, cette commande d'installation règlera le problème

```bash
sudo apt install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev
```

Vue que nous sommes entrain de conpiler de code nous même, nous pouvons profiter de l'occasion pour mettre en place des réglages par défaut.

```bash
./configure --sbin-path=/usr/bin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --with-pcre --pid-path=/var/run/nginx.pid --with-http_ssl_module
```

#### Compilation

Pour compiler, faites

```bash
make
```

#### Installation

```bash
sudo make install
```

#### Test

Vous pouvez tester votre installation avec la commande suivante

```bash
nginx -v
```

Le resulat reseemblera à quelque chose comme ceci

```bash
nginx version: nginx/1.19.2
```

Il existe aussi d'autres commandes comme

```bash
ps aux | grep nginx
```

Cette commande essayera de trouver si NGINX fait partie de vos processus en exécution

Le résultat devrait ressembler à quelque chose comme ceci

```bash
root         633  0.0  0.0   8332   804 ?        Ss   03:58   0:00 nginx: master process /usr/bin/nginx
nobody       634  0.0  0.3   8700  3100 ?        S    03:58   0:00 nginx: worker process
ilus        1448  0.0  0.0   6432   676 pts/0    R+   04:00   0:00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox nginx
```

#### Gestion du processus NGINX avec Systemd

Vu que nous avons manuellement installé NGINX, il va falloir que nous configurions manuellement systemd pour gérer le processus de NGINX (status, redémarage, démarage à l'allumage)

Cette configuration devrait fonctionner sur Fedora, OpenSUSE, Arch Linux, Ubuntu. Testé sur Fedora 16 et 17, Ubuntu 18.04.

L'emplacement du **PIDFile** et du binaire NGINX peut être différent selon la façon dont NGINX a été compilé.

Enregistrez ce fichier sous **/lib/systemd/system/nginx.service**

```shell
[Unit]
Description=Serveur NGINX
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target
[Service]
Type=forking
PIDFile=/var/run/nginx.pid
ExecStartPre=/usr/bin/nginx -t
ExecStart=/usr/bin/nginx
ExecReload=/usr/bin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

Lancez NGINX

```bash
systemctl start nginx
```

Vérifiez le status du processus

```bash
systemctl status nginx
```

Lancement au démarrage

```bash
systemctl enable nginx
```
