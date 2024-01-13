---
title: Recherche plain texte sur Cloud Firestore à l'aide de MeiliSearch 1 - Introduction
description: Comment ajouter une capacité de recherche plain texte ultra-rapide à Cloud Firestore à l'aide de MeiliSearch
tags: [gcp, nodejs, cloud-functions,vm, meilisearch, firestore]
topics: [gcp, nodejs]
date: 2022-01-19 
slug: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-1-introduction
next: recherche-plain-texte-sur-cloud-firestore-a-laide-de-meilisearch-2-api
---

S'il y a une fonctionnalité notoire qui manque dans Cloud Firestore, c'est la recherche plain texte. La documentation de
Firebase Cloud
Firestore [https://firebase.google.com/docs/firestore/solutions/search](https://firebase.google.com/docs/firestore/solutions/search)
dit et je cite

> Cloud Firestore ne prend pas en charge l'indexation native ni la recherche de champs de texte dans les documents.

Dans cette suite de tutoriels, nous allons configurer un moteur de recherche plain texte à l'aide de MeiliSearch pour
sauvegarder Cloud Firestore. Nous n'allons pas utiliser Firebase, mais nous nous concentrerons sur Google Cloud Platform
car nous devons déployer une machine virtuelle et effectuer une configuration réseau.

### Qu'allons-nous utiliser ?

- Cloud Firestore
- Cloud Functions
- Compute Engine
- Cloud Serverless VPC Access
- MeiliSearch
- NodeJS

## Quelques definitions

Cloud Firestore : Cloud Firestore, est une implémentation de base de données NoSQL basée sur le type Documents. Nous
allons l'utiliser comme base de données ([cloud.google.com/firestore](http://cloud.google.com/firestore))

Cloud Functions : Google Cloud Functions est un service d’execution de code sans serveur et piloté par les événements au
sein de Google Cloud Platform. ([cloud.google.com/fonctions](http://cloud.google.com/fonctions))

Compute Engine : Google Compute Engine est le composant Infrastructure as a Service de Google Cloud Platform. Nous
allons déployer une VM sur GCE pour héberger notre moteur de
recherche ([cloud.google.com/compute](http://cloud.google.com/compute))

Cloud Serverless VPC Access: Serverless VPC Access est une option d'accès privé dans GCP qui vous permet de vous
connecter à partir d'un environnement sans serveur dans Google Cloud directement à votre réseau VPC via une adresse IP
interne. Il est utile pour connecter nos fonctions cloud à notre machine
virtuelle. ([cloud.google.com/vpc/docs/configure-serverl](http://cloud.google.com/vpc/docs/configure-serverl)..)

MeiliSearch : notre moteur de recherche. Il s'agit d'un moteur de recherche open source, incroyablement rapide et hyper
pertinent qui améliorera votre expérience de recherche. ([meilisearch.com](http://meilisearch.com/))

Maintenant que nous savons de quoi il s'agit, nous allons voir comment le système de base va fonctionner.

## La conception du système

Attention : il peut y avoir un point d'échec dans cette architecture, mais restez avec moi jusqu'à la fin où nous les
explorerons.

Notre système est un système basé sur des événements qui utilise un ensemble de fonctions pour fournir un service CRUD (
Create, Read, Update, Delete).

Ceci est l'aperçu de l'architecture sur Google Cloud


![architecture](/images/bluebook/gcp-architecture.png)

Désolé pour le schéma 🤭 🤫 🤓

## Logique

Le seul but de l'API publique est de fournir un système CRUD au client. Vous souvenez-vous que j'ai parlé d'un système
événementiel ? Eh bien, chaque fois qu'une opération est effectuée dans la base de données, nous captons l'événement de
l'opération et écrivons une logique pour interagir avec les données de notre moteur de recherche de manière équivalente.
Il est important de voir l'instance MeiliSearch sur notre VM comme une mise en cache dans ce cas. Cela nous aidera à
comprendre les choses facilement. Nous utiliserons une approche de réécriture pour rendre notre opération dans le moteur
de recherche. Cela signifie que les données seront stockées dans la base de données Cloud Firestore, puis nous les
enregistrerons sur notre instance MeiliSearch. Si les données sont supprimées ou mises à jour, l'opération se fera d'
abord dans la base de données puis dans le moteur de recherche. Une url dans l'API sera chargé de recevoir la requête à
rechercher dans le moteur de recherche.

Bien sûr, cette méthode n'est pas parfaite, mais nous ferons de notre mieux.

Fin de la discussion, codez maintenant.

Dans la section suivante, nous allons créer une API CRUD Restful avec Cloud Firestore et Cloud Functions. On se voit
là-bas.
