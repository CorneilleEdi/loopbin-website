---
title: Recherche plain texte sur Cloud Firestore à l'aide de MeiliSearch 3 - MeiliSearch
description: Déployer et configurer MeiliSearch dans une machine virtuelle sur Google Compute Engine
tags: [gcp, javascript, nodejs, cloud-functions,vm, meilisearch, firestore]
topics: [gcp, nodejs]
date: 2022-01-21
slug: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-3-meilisearch
next: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-4-evenements
prev: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-2-api
---


Content de vous revoir. Dans l'article précédent, nous avons créé une API  avec Cloud Functions et Cloud Firestore.

[link](https://github.com/CorneilleEdi/bluebook-cloud-functions-meilisearch/tree/c1f07695a09017b635ffce8142339bdb62607718)

Dans cet article, nous allons créer une machine virtuelle sur GCE et nous allons installer et configurer MeiliSearch.


## Créer une machine virtuelle
Pour aller plus vite, nous allons utiliser l'outil gcloud cli. 
Je vais déployer une machine virtuelle basée sur Ubuntu dans la région `europe-west1` avec la balise `http-web-server` pour autoriser tcp sur le port 80 avec une règle de pare-feu.
Pour garder les choses simples, j'utiliserai le VPC par défaut mais vous pouvez créer un VPC personnalisé avec la région souhaitée pour rendre les choses plus pro 😎. 

La commande

```bash
gcloud compute instances create bluebook-search-engine \
--machine-type=f1-micro \
--image=ubuntu-2004-focal-v20210415 --image-project=ubuntu-os-cloud \
--tags=http-web-server \
--zone=europe-west1-b \
--tags=http-web-server
--private-network-ip=10.132.0.2 \
--network default
```

> Personnellement, je change le f1-micro pour quelque chose de plus puissant (n1-highcpu-2).
> Votre choix doit dépendre de la quantité de données que vous envisagez de mettre dans votre moteur de recherche

Résultat
```shell
NAME                    ZONE            MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
bluebook-search-engine  europe-west1-b  n1-highcpu-2               10.132.0.2   34.78.214.156  RUNNING
```

## Installer et configurer MeiliSearch

### Installation
Nous pouvons utiliser le gcloud compute ssh pour accéder directement à notre VM. C'est cool 🚀 😎?

```shell
gcloud compute ssh bluebook-search-engine --zone=europe-west1-b
```

Maintenant que nous sommes dans la VM, il est temps de lancer l'installation

```shell
sudo apt-get update && sudo apt-get upgrade -y
```

Installer curl


```shell
sudo apt install curl -y
```

Téléchargez la dernière version de l'exécutable MeiliSearch


```shell
curl -L https://install.meilisearch.com | sh
```

Nous pouvons le mettre dans le dossier `/usr/bin` pour le rendre disponible à l'échelle du système
```shell
sudo mv ./meilisearch /usr/bin/
```

### Configuration
Nous pouvons maintenant lancer le moteur de recherche avec un peu de configuration

```shell
meilisearch --http-addr 127.0.0.1:5555 --env production --master-key 0YDqMfnjcdhXPUIWDHsc3kXjzA18GpVOGKRePpyJC3GtKWPrZNQengxXvDkt
```


- `--http-addr` spécifie l'adresse du moteur
- `--env` spécifie l'environnement d'exécution
- `--master-key` c'est la clé qui donne accès à toutes les routes. documentation des clés. Puisque nous fournissons une clé principale, les clés privées et publiques seront automatiquement générées. Nous allons utiliser la clé publique dans notre fonction Cloud et elle sera stockée dans Cloud Secrets Manager.

### Service

Il devrait être utile de lancer le moteur de recherche à chaque démarrage afin de créer un service. 
Créer un fichier de service

```shell
sudo nano /etc/systemd/system/meilisearch.service
```
Ajouter la configuration du service

```shell[meilisearch.service]
[Unit]
Description=MeiliSearch
After=systemd-user-sessions.service

[Service]
Type=simple
ExecStart=/usr/bin/meilisearch --http-addr 127.0.0.1:5555 --env production --master-key 0YDqMfnjcdhXPUIWDHsc3kXjzA18GpVOGKRePpyJC3GtKWPrZNQengxXvDkt

[Install]
WantedBy=default.target
```


Activer et démarrer le service

```shell
# Set the service meilisearch
systemctl enable meilisearch

# Start the meilisearch service
systemctl start meilisearch

# Verify that the service is actually running
systemctl status meilisearch
```

Ce service exécutera la commande meilisearch start à chaque démarrage de notre VM.

Nous pouvons vérifier si meilisearch est en cours d'exécution en appelant l'url de vérification de l'état

```shell
curl http://127.0.0.1:5555/health
```

le résultat devrait être
```json
{"status":"available"}
```


### Ajouter un proxy inverse (reverse proxy)
Nous pouvons ajouter nginx comme proxy inverse pour simplifier davantage notre serveur. (cette partie n'est pas obligatoire)

Installer NGINX

```shell
sudo apt-get install nginx -y
```

Configurer nginx
Supprimer le fichier de configuration par défaut pour Nginx
```shell
rm -f /etc/nginx/sites-enabled/default
```

Créer une nouvelle configuration

```shell
nano /etc/nginx/sites-enabled/meilisearch
```

ajouter la configuration

```shell
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location / {
        proxy_pass  http://127.0.0.1:5555;
    }
}
```

N'oubliez pas de changer le port pour qu'il pointe vers le port de votre moteur Meilisearch. Maintenant, redémarrez NGINX

```shell
systemctl daemon-reload
systemctl enable nginx
systemctl restart nginx
systemctl status nginx
```


## Firewall

Étant donné que nous prévoyons de nous connecter à notre VM via TCP sur le port 80 (serveur NGINX en tant que proxy inverse), 
nous devons ajouter la règle de pare-feu requise. Nous pouvons restreindre la plage d'adresses IP source à l'accès au VPC sans serveur, 
mais pour l'instant, nous allons la laisser ouverte à toute plage d'adresses IP source (0.0.0.0/0).

```shell
gcloud compute firewall-rules create default-allow-http \
--network=default \
--target-tags=http-web-server \
--rules tcp:80 \
--action allow \
--direction ingress
```

## Clé secrète avec Cloud Secret Manager
Notre machine virtuelle est enfin configurée, mais avant de partir, 
nous devons enregistrer notre clé principale dans Cloud Secret Manager afin de la conserver en toute sécurité et de la récupérer dans nos fonctions.

Créer la clé secrète

```shell
gcloud secrets create MEILISEARCH_MASTER_KEY
```

Ajouter une nouvelle version pour la clé secrète

```shell
echo -n "0YDqMfnjcdhXPUIWDHsc3kXjzA18GpVOGKRePpyJC3GtKWPrZNQengxXvDkt" | \
    gcloud secrets versions add MEILISEARCH_MASTER_KEY --data-file=-
```

Vérification

```shell
gcloud secrets versions access --secret=MEILISEARCH_MASTER_KEY 1
```



Génial. Notre VM est seule et prête à recevoir des demandes.
Passons à la partie suivante (4/5) où nous allons créer nos Cloud Functions pour gérer les différents événements.
