---
title: Installer et sécuriser Redis sur Ubuntu
description: Tutoriel sur comment installer et sécuriser Redis sur Ubuntu
tags: [redis, linux, ubuntu]
topics: [redis, linux]
date: 2020-02-01
---

## Table of Contents

##

> Redis (pour REmote DIctionary Server) est une base de donnée de clés / valeurs NoSQL, utilisé principalement comme cache d'application ou base de données à réponse rapide. Parce qu'il stocke des données en mémoire plutôt que sur un disque ou un disque SSD, Redis offre une vitesse, une fiabilité et des performances inégalées.

## Les avantages de redis

- Stockage de données en mémoire
- Structures de données flexibles
- Simplicité et facilité d'utilisation
- Réplication et persistance
- Haute disponibilité et évolutivité
- Extensibilité

## Cas d'utilisation

- Mise en cache
- Chat, messagerie et files d'attente
- Streaming Media
- Stockage de session
- Analyses en temps réel

---

### Nous allons installer Redis sur Ubuntu 18.04

---

Mise à jour des packages
La premier etape est celle de la mise à jour de packages linux

```bash
$ sudo apt update
```

### Installation de Redis

```bash
$ sudo apt install redis-server
```

### Verifier l'installation

Une fois l'installation terminée, vous pouvez faire la commande suivante pour verifier que Redis a été installé avec succes.

```bash
$ sudo systemctl status redis
```

Le resultat doit ressembler à ceci:

```bash
● redis-server.service - Advanced key-value store
   Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 20-03-17 14:03:13 IST; 11h ago
     Docs: http://redis.io/documentation,
           man:redis-server(1)
  Process: 1556 ExecStart=/usr/bin/redis-server /etc/redis/redis.conf (code=exited, status=0/SUCCESS)
 Main PID: 1705 (redis-server)
    Tasks: 4 (limit: 4915)
   CGroup: /system.slice/redis-server.service
           └─1705 /usr/bin/redis-server 127.0.0.1:6379
```

> Si vous avez ce genre message alors Redis a a été installé avec succes et est disponible sur le port **6379** du **localhost** (127.0.0.1)

### Tester Redis

Pour tester Redis, ouvrez votre terminal et faite les commandes suivantes

```bash
$ redis-cli
```

```:title=output
127.0.0.1:6379>
```

Cette commande ouvre Redis et vous donne acces à un terminal inter-actif.

```bash
127.0.0.1:6379> set "name" "John Snow"
OK
```

```bash
127.0.0.1:6379> get "name"
"John Snow"
```

## Ajouter un mot de passe

Pour plus de securité, il est conseillé d'ajouter un mot de passe à la base de donnée.
Pour cela, nous devons changer la configuration par defaut dans le fichier de configuration.

faite la commande suivante pour ouvrir le fichier de configuration de Redis avec l'editeur **nano**:

```bash
$ sudo nano /etc/redis/redis.conf
```

Tout en bas se trouve les options de sécutité.
Retirez le commentaire sur la ligne contenant **requirepass foobared** et remplacez **foobared** par votre mot de passe

```diff
################################## SECURITY ###################################

# Require clients to issue AUTH <PASSWORD> before processing any other
# commands.  This might be useful in environments in which you do not trust
# others with access to the host running redis-server.
#
# This should stay commented out for backward compatibility and because most
# people do not need auth (e.g. they run their own servers).
#
# Warning: since Redis is pretty fast an outside user can try up to
# 150k passwords per second against a good box. This means that you should
# use a very strong password otherwise it will be very easy to break.
#
- # requirepass foobared
+ requirepass loopbin

```

Faites **Control+X** et **y** pour souvegarder et fermer le fichier.

Il est important de redemarrer Redis afin d'appliquer la nouvelle configuration.

```bash
$ sudo systemctl restart redis
```

Si vous essayez d'effecuter une opération dans sans ètre authentifier vous aurez ce message d'erreur.

```
(error) NOAUTH Authentication required.
```

Pour vous authentifiez, faite:

```bash
127.0.0.1:6379 > auth votre_mot_de_passe
```

---

`Bon codage avec Redis 👍`
