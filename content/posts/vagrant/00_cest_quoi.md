---
title: Vagrant 00 - C'est quoi Vagrant?
description: Introduction à Vagrant
tags: [vagrant]
topics: [vagrant]
date: 2021-02-05
slug: vagrant-00-cest-quoi-vagrant
next: vagrant-01-avant-de-commencer-avec-vagrant
---

# Presentation

Vagrant est un outil pour travailler avec des environnements virtuels. Vagrant fournit un client de ligne de commande simple et facile à utiliser pour gérer ces environnements ainsi qu' un interpréteur pour les définitions des configurations de ce à quoi ressemble chaque environnement dans un fichier spécial appelé Vagrantfile.

### C'est quoi un environnement virtuel ou une machine virtuelle?

Une machine virtuelle (VM) est un environnement virtuel qui fonctionne comme un système informatique virtuel avec son propre processeur, mémoire, interface réseau et stockage, créé sur un système matériel physique (situé hors site ou sur site). Les machines virtuelles permettent à plusieurs systèmes d'exploitation, comme une distribution Linux sur un ordinateur portable avec Windows, de s'exécuter simultanément sur un seul appareil. Chaque système d'exploitation fonctionne de la même manière que le matériel hôte (votre PC) exécutant généralement un système d'exploitation ou un programme, car l'expérience de l'utilisateur final émulée dans la machine virtuelle est pratiquement similaire à l'expérience en temps réel du système d'exploitation s'exécutant sur un ordinateur physique.

La virtualisation semble être la technologie la plus appropriée pour créer un environnement de développement / ou de test pour les développeurs et les opérateurs. C'est essentiellement parce que, sans jouer avec le système d'exploitation réel que vous utilisez, vous pouvez avoir un tout nouveau monde sur votre système et explorer de nouveau système.

![virtualisation](/images/vagrant/virtualisation.png)

Il existe différents logiciels de visualisation disponibles sur le marché, certains d'entre eux sont mentionnés ci-dessous.

VirtualBox (Le logiciel de virtualisation développé par Oracle) VMWare Microsoft Hyper V Amazon EC2, Google Cloud Compute Engine (des environnements de cloud public virtualisé)

## Pourquoi utiliser Vagrant alors ?

Même si la virtualisation est une très bonne approche,la mise en place d'un environnement pour le travail de développement n'est pas si simple. Vous devez encore passer par les tracas de l'installation des logiciels requis, de leur configuration, etc., en plus de la création de la nouvelle machine virtuelle.

Vagrant permet aux développeurs de créer plus facilement un écosystème local qui imite l'environnement dans lequel votre code sera réellement déployé. Sans sacrifier la façon dont votre machine locale est configurée, et sans le retard ou le coût de création et de connexion à un environnement de développement externe, vous pouvez vous assurer que vous avez les mêmes bibliothèques et dépendances installées, les mêmes processus installés, le même système d'exploitation et version, et bien d'autres détails. Tout cela en écrivant un seul fichier de configuration.

Il est aussi important de noter qu'avec cette approche, il est facile de mettre en place la même configuration entre une équipe utilisant des machines et des systèmes différents.

En utilisant Vagrant, vous pouvez réaliser ce qui suit:

- environnement par projet - vous pouvez avoir différents fichiers de configuration pour chaque projet
- même fichier de configuration pour les environnements de développement, de pré-préparation, de préparation et de production
- facile à définir et à transporter le fichier de configuration (Vagrantfile)
- facile à démonter, provisoire: infrastructure sous forme de code
- fichiers de configuration compatibles avec la version - vous pouvez valider tous vos livres de recettes et le fichier Vagrant
- partagé au sein de l'équipe - en utilisant le même fichier de configuration (Vagrantfile)

## Qu'est ce que vous pouvez configurer avec votre Vagrantfile?

- le système que vous voulez utilisez (distribution Linux, Windows et autres)
- la configuration réseaux (adresse IP, type de réseaux , redirection des port de la machine)
- le logiciel de virtualisation (VirtualBox, VMWare, ....)
- La synchronisation de dossier entre votre machine et l'environnement virtuel
- La création et la configuration de l'environnement virtuel
- Les paramètres SSH

Nous allons couvrir tout ces aspect dans les futurs articles

## Vagrant et le Cloud

Certaines infrastructures de cloud public populaires comme Amazon EC2, Google Cloud et Digital Ocean supportent en charge Vagrant. Ce qui permet au développeur de lancer des machines virtuelles dans le cloud rapidement et simplement.
