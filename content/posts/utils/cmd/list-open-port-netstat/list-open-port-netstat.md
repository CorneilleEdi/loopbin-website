---
title: Lister les ports en utilisations sur Linux
description: Toouvez les ports en utilisation
tags: [linux, bash, cmd, network]
topics: [linux, bash, network]
date: 2021-01-05
---

Le port réseau est identifié par son numéro, l'adresse IP associée et le type de protocole de communication, tel que TCP ou UDP.

Le port d'écoute est un port écouté par une application ou une procédure, servant de point de terminaison de contact. C'est à dire une porte ouverte qui mène vers l'application.

Notez que vous ne pouvez pas avoir deux services écoutant le même port sur la même adresse IP.

**netstat** est un outil de ligne de commande qui peut fournir des statistiques de communication réseau. Les options de netstat utilisées dans ce cas:

- **t** - Affiche les ports TCP.
- **u** - Affiche les ports UDP.
- **n** - Affiche les adresses numériques au lieu de résoudre les hôtes.
- **l** - Afficher uniquement les ports d'écoute.
- **p** - Affiche le PID et le nom du processus de l’auditeur. Ces informations ne s'affichent que si vous exécutez la commande en tant qu'utilisateur root ou [sudo]

```bash
sudo netstat -tunlp
```

La sortie ressemblera à ceci:

```bash
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:25672           0.0.0.0:*               LISTEN      1354/beam.smp
tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      1316/mongod
tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      1510/redis-server 1
tcp        0      0 127.0.0.1:18412         0.0.0.0:*               LISTEN      1330/fonthelper
tcp        0      0 127.0.0.1:5037          0.0.0.0:*               LISTEN      89088/adb
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      1143/systemd-resolv
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      1215/cupsd
tcp        0      0 0.0.0.0:15672           0.0.0.0:*               LISTEN      1354/beam.smp
tcp6       0      0 :::5672                 :::*                    LISTEN      1354/beam.smp
tcp6       0      0 ::1:6379                :::*                    LISTEN      1510/redis-server 1
tcp6       0      0 :::4369                 :::*                    LISTEN      1/init
tcp6       0      0 ::1:631                 :::*                    LISTEN      1215/cupsd
```

Les colonnes importantes dans notre cas sont:

- **Proto** - Le protocole utilisé par le socket.
- **Local Address** - L'adresse IP et le numéro de port sur lesquels le processus écoute.
- **PID / Nom du programme** - L'identifiant unique du processus et son nom.

Si vous voulez filtrer les résultats, utilisez la commande **grep**. Par exemple, pour trouver quel processus écoute sur le port TCP 27017, tapez:

```bash
sudo netstat -tnlp | grep :27017
```

La sortie montre que sur cette machine, le port 22 est utilisé par le serveur SSH:

```
tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      1316/mongod
```

Si la sortie est vide, cela signifie que rien n'écoute sur le port.

Vous pouvez également filtrer la liste en fonction de critères, par exemple, PID, protocole, état, etc.

### Bonus

L'option **-c** imprimera les informations netstat en continu, disons toutes les quelques secondes.
