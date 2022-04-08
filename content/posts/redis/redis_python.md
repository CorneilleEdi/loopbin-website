---
title: Utiliser Redis avec Python
description: Manipuler la base de donnée Redis avec Python
tags: [python, redis]
topics: [redis]
date: 2020-02-01
---

#

Dans ce petit tuto , nous allons explorer la méthode pour connecter un programme en **Python** avec **Redis**

## Configuration

Pour y arriver nous allons utiliser la librairie **Redis-Py**. Elle est très simple et très facile à utiliser.

<action-button type="package" text="Package Redis-Py" link="https://pypi.org/project/redis/"></action-button>

Elle est disponible aussi comme project open source sur Github.

<action-button type="github" text="Github Redis-Py" link="https://github.com/andymccurdy/redis-py/"></action-button>

### Installation

Pour installer redis-py, faite:

```shell
$ pip install redis
```

### Verifier l'installation

```shell
$ redis --version
redis 20.0.13 from /home/corneilleedi/.local/lib/python3.7/site-packages/redis/__init__.py
```

## Connection

Avant tout chose, il va falloir importer Redis et nous connecter à la base de donnée

```python[app.py]
import redis
db = redis.StrictRedis(host="localhost", port=6379, db=0)
```

Dans cet exemple, la connection à la base de donnée est initialisée avec les paramètres suivants:

- host : localhost (127.0.0.1)
- port : 6379 (port par défaut de Redis)
- db : 0 (la base de donnée 0 dans notre base de donnée Redis)

Il est aussi possible d'utiliser un URI sour le format

```python
[METHODE_DE_CONNECTION]:[HOST]@[PASSWORD]:[PORT]/[DATABASE]
```

- METHODE_DE_CONNECTION: il s'agit d'un suffixe précédant tous les URI Redis spécifiant comment vous souhaitez vous connecter à votre instance. **redis://** est une connexion standard, **rediss://** (double S) tente de se connecter via SSL, **redis-socket://** est réservé aux sockets de domaine Unix et **redis-sentinel://** est un type de connexion pour les disponibilité Redis clusters.
- HOST: URL ou IP de votre instance Redis. Si vous utilisez une instance hébergée dans le cloud, il est probable que cela ressemble à une adresse AWS EC2 ou DigitalOcean Droplet.
- PASSWORD: Le mot de passe de votre DB (6379 par defaut).
- PORT: le port sous lequel tourne Redis.
- DATABASE: le numero de la base de donnée que vous visé. Generalement mis à 0

```python[app.py]
import redis
db = redis.from_url(url= 'redis://localhost@loopbin:6379/0')
```

## Utilisation

Maintenant que notre code a acces à Redis, nous pouvons commencer à nous amuser avec.

### Quelques methodes tres utiles:

- **db.set(key, value)**: ajoute un nouvel élement dans la base de donnée avec comme clé key et value comme valeur.
- **db.get(key)**: recupere la valeur de la clé key.
- **db.keys()**: retourne la liste de toutes les clés dans la db.
- **db.delete(key)**: supprime l'élement ayant la clé key.
- **db.incr(key)**: incremente la valeur de la clé key.
- **db.psetex(key, time, value)**: ajoute un nouvel élement dans la base de donnée avec comme clé key et value comme valeur avec un temps d'expiration time en milliseconde .
- **db.expire(key, time)**: ajoute un temps d'expiration time sur l'élement ayant la clé key.
- **db.ttl(key)**: retour le nombre de seconde avec expiration de l'élement ayant la clé key.

Encore plus de méthode dans la documentation:

<action-button type="doc" text="Documentation Redis-Py" link="https://redis-py.readthedocs.io/en/latest/"></action-button>

Jetons un coup d'oeuil a un peu de code.

```python[app.py]
import redis
db = redis.from_url(url= 'redis://localhost:6379/0')

db.set('name', 'John Doe')
n = db.get('name')
print(n)
```

```shell[output]
b'John Doe'
```

Par defaut, Redis retournera une message de type string byte. Pour y remedier, il suffit de passer des arguments lors de la connection

```python
db = redis.from_url(url= 'redis://localhost:6379/0',charset="utf-8",decode_responses=True)
```
