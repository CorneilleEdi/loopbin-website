---
title: Vagrant 07 - Réseau
description: Configurations réseaux avec Vagrant
tags: [vagrant]
topics: [vagrant]
date: 2021-02-12
slug: vagrant-07-reseau
next: vagrant-08-dossiers-synchronises
prev: vagrant-06-provider-fournisseur
---

#

Comme tout système d'exploitation ou machine, la machine virtuelle créer avec Vagrant a aussi ces configurations réseaux. Dans cette partie, nous allons parler des configurations réseaux. Ces configurations peuvent nous permettre de:

- mettre en place un tout nouveau réseau privé pour la machine virtuelle avec une adresse IP privé
- mettre en place une adresse IP dynamique
- rediriger un port de la machine virtuelle vers un port le la machine hôte.

## Redirection de port

Avec les redirections de ports ou les ports transférés, Vagrant configure un port sur l'hôte (votre machine actuel) pour le transférer vers un port sur la machine virtuelle, vous permettant d'accéder aux services sur la machine virtuelle.

Cas pratique:

Imaginons que vous ayez un serveur NGINX tournant sur votre machine virtuelle et que vous vouliez vous y connecter depuis un navigateur sur votre propre machine. De base une telle action n 'est pas possible car votre machine essayera toujours de se connecter a un port sur son réseau. Donc localhost ou localhost:80 se connectera au port 80 de votre machine non celle de la machine virtuelle.

En redirigeant le port de la machine virtuelle , cette connexion vers celle-ci sera possible. Nous pourrions alors rediriger le port 80 de NGINX sur la machine virtuelle vers le port 8080 de la vraie machine et pouvoir s'y connecter depuis la machine virtuelle.

Il est à noter que le port vers qui sera transféré le trafic de la machine virtuelle doit être disponible et non occupé par aucun programme.

Pour le transfert de port ,il faudra préciser la configuration suivante

```ruby
config.vm.network "forwarded_port", guest: 80, host: 8080
```

Avec 80 étant le port sur la machine virtuelle et 8080 le port sur la machine hôte.

Il est possible de spécifier le protocol de transfert (TCP ou UDP) accepter par le port avec la configuration

```ruby
config.vm.network "forwarded_port", guest: 2003, host: 12003, protocol: "tcp"
```

Si pour une certaine raison vous aimerez limiter les ports que vagrant peut utiliser pour votre machine virtuelle, il est possible d'utiliser la configuration

```ruby
config.vm.usable_port_range = 5000..6000
```

Ce code limite les ports utilisable entre l'intervalle 5000 à 6000 inclus.

## Adresse IP statique/ privée

Les réseaux privés Vagrant vous permettent d'accéder à votre ordinateur hôte via une adresse qui n'est pas publiquement disponible sur Internet. En général, cela signifie que votre ordinateur aurait une adresse dans l'espace d'adressage privé.

Il est possible que différents appareils au sein du même réseau privé (généralement limité au même fournisseur) peuvent se connecter les uns aux autres sur des réseaux privés.

Attention, les adresses IP privées sont standardisées et ne peuvent être choisies que dans des intervalles précis.

### Clasification des addresses IP privées

| Classes |            Plages             |   Masques   | Nombres d'adresses disponibles |
| :-----: | :---------------------------: | :---------: | :----------------------------: |
|    A    |   10.0.0.0 à 10.255.255.255   |  255.0.0.0  |           16.777.216           |
|    B    |  172.16.0.0 à 172.31.255.255  | 255.240.0.0 |           1.048.576            |
|    C    | 192.168.0.0 à 192.168.255.255 | 255.255.0.0 |             65536              |

Avec cette classification , il nous suffit juste de choisir une adresse IP privées dans une plage et de l'assigner à notre machine virtuelle.

```ruby
config.vm.network "private_network", ip: "10.0.0.45"
```

L'avantage est que cette adresse IP est maintenant static et qu'il sera plus d'aucune utilité de rediriger les ports de la machine virtuelle. Nous pouvons directement les accédés avec notre machine virtuelle.

Exemple

Lançons une machine avec les configurations suivantes

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "peru/ubuntu-20.04-server-amd64"

  config.vm.network "private_network", ip: "10.20.0.3"

  config.vm.provider "virtualbox" do |v|
    v.gui = false
    v.memory = "1024"
    v.cpus = 1
  end
end
```

Nous pouvons ainsi relancer notre VM avec ces nouvelles configuration avec la commande `vagrant reload`.

Une fois la machine virtuelle relancée, nous pouvons faire un ping vers l'adresse IP pour vérifier si elle a été bien assignée.

```bash
ping 10.20.0.3
```

Reponse

```bash
PING 10.20.0.3 (10.20.0.3) 56(84) bytes of data.
64 bytes from 10.20.0.3: icmp_seq=1 ttl=64 time=0.378 ms
64 bytes from 10.20.0.3: icmp_seq=2 ttl=64 time=0.319 ms
64 bytes from 10.20.0.3: icmp_seq=3 ttl=64 time=0.389 ms
64 bytes from 10.20.0.3: icmp_seq=4 ttl=64 time=0.378 ms
64 bytes from 10.20.0.3: icmp_seq=5 ttl=64 time=0.379 ms
64 bytes from 10.20.0.3: icmp_seq=6 ttl=64 time=0.391 ms
^C
--- 10.20.0.3 ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5113ms
rtt min/avg/max/mdev = 0.319/0.372/0.391/0.024 ms
```

Cette réponse nous montre que l'adresse IP `10.20.0.3` nous réponds correctement

Attention: en assignant les adresses IP, éviter les adresses IP spéciales comme les `broadcast adresse` et autres.
