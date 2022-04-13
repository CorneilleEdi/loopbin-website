---
title: NGINX 00 - Introduction
description: Qu'est-ce que c'est que NGINX? C'est quoi son rôle?
tags: [nginx]
topics: [nginx]
date: 2020-12-05
slug: nginx-00-introduction
---

# Qu'est-ce que c'est que NGINX? C'est quoi son rôle?

## C'est quoi NGINX

> NGINX est un logiciel open source pour le service Web, le proxy inverse, la mise en cache, l'équilibrage de charge, la diffusion multimédia en continu, etc. Il a commencé comme un serveur Web conçu pour des performances et une stabilité maximales. En plus de ses capacités de serveur HTTP, NGINX peut également fonctionner comme un serveur proxy pour le courrier électronique (IMAP, POP3 et SMTP) et un proxy inverse et un équilibreur de charge pour les serveurs HTTP, TCP et UDP.

Nginx a été créé à l'origine par Igor Sysoev, avec sa première version publique en octobre 2004. Igor a initialement conçu le logiciel comme une réponse au problème C10k, qui est un problème de performance lié à la gestion de 10 000 connexions simultanées.

## Que peut-on faire avec NGINX?

- Serveur web
- Serveur WebSockets
- Streaming Media
- Gestion des fichiers statiques, des fichiers d'index et de l'indexation automatique
- Proxy inverse avec mise en cache
- L'équilibrage de charge (load balancing)
- Accélération d'application / Livraison d'applications / Mise en cache de contenu
- Terminaison SSL / passerelle de sécurité
- Point d'entrée pour API et Microservices

> Certains concepts seront explorés dans les prochains tutoriels

## Pourquoi choisir NGINX?

Nginx est conçu pour offrir une faible utilisation de la mémoire et une concurrence élevée. Plutôt que de créer de nouveaux processus pour chaque requête Web, Nginx utilise une approche asynchrone, orientée évènement, dans laquelle les requêtes sont traitées dans un seul thread. Cette approche constitue l'un des points principaux de différence entre NGINX et Apache.

Avec Nginx, un processus maître peut contrôler plusieurs processus de travail. Le maître gère les processus de travail, tandis que les travailleurs effectuent le traitement proprement dit. Étant donné que Nginx est asynchrone, chaque demande peut être exécutée par le travailleur simultanément sans bloquer les autres demandes.

## Qui utilise NGINX?

NGINX est rapidement devenu un des logiciels les plus utlisés pour la gestion de serveur et encore plus. Plusieurs grandes entreprises utilises NGINX pour gérer le trafic sur leurs serveurs. Parmi ces entreprises, on peut compter :

- Google
- Microsoft
- Facebook
- Gitlab
- Apple
- Twitter
- Intel
- VMWare
- Adobe
- IBM

## Les sujets qui seront explorés dans cette série

- Installation et Configuration de NGINX
- Les locations
- Les variables et conditions
- Rewrites et Redirects
- Worker
- Timeouts
- Buffers
- Headers
- GZip
- HTTPS
- HTTP2
- Reverse proxy
- Load balancing
