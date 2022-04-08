---
title: Dart 00 - Introduction
description: Introduction, Installation et Setup de l'IDE
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

#

import Button from "~/components/Button.vue";

> Dart (initialement appelé Dash) est un langage de programmation web développé par Google. Son but initial est de remplacer JavaScript pour devenir la nouvelle [lingua franca](https://fr.wiktionary.org/wiki/lingua_franca) du développement web, néanmoins la priorité actuelle des développeurs est que le code Dart puisse être converti en code JavaScript compatible avec tous les navigateurs modernes, ainsi que sur le développement d'application multi-plateforme.
> Dart peut aussi être utilisé pour la programmation côté serveur, ainsi que le développement d'applications mobiles (via l'API Flutter). **Wikipedia**

Dart est un langage de programmation utilisé dans Flutter. Il est donc logique de consacrer du temps à son apprentissage. En tant que langage orienté objet avec de nombreuses fonctionnalités intéressantes, les développeurs connaissant des langages orientés objets tels que Java, C #, Javascript, etc., peuvent rapidement se familiariser avec l’utilisation de Dart en quelques semaines.

Dart vise principalement toutes les plateformes:

- Dart Native: pour les programmes ciblant des périphériques (mobiles, ordinateurs de bureau, serveurs, etc.), Dart Native inclut à la fois une machine virtuelle Dart avec une compilation JIT (juste à temps) et un compilateur AOT (en avance) pour la production de code machine. .
- Dart Web: pour les programmes ciblant le Web, Dart Web inclut à la fois un compilateur de temps de développement et un compilateur de temps de production.

Quelques raisons pour lesquelles les développeurs aiment le langage Dart:

- La simplicité et la rapidité du langage Dart rend le développement mobile plus fun.
- Dart est AOT (Ahead Of Time ou En avance) compilé en un code natif rapide . Cela rend non seulement Flutter rapide, mais pratiquement tout (y compris tous les widgets) personnalisable.
- Dart peut également être compilé JIT (Just In Time ou Juste à temps) pour des cycles de développement exceptionnellement rapides et un flux de travail révolutionnaire (y compris le populaire Hot Reload). Le **hot reload** permet de mettre à jour le programme en exécution rapidement. Cet outil est une révolution dans le monde du développement mobile.
- Le concept de **machine virtuelle (VM)** est devenu populaire, il ne s'agit en réalité que d'un interpréteur avancé imitant une machine matérielle dans un logiciel. Une machine virtuelle facilite le portage d'un langage sur de nouvelles plateformes .

## Installation du SDK Dart sur Windows

Pour pouvoir exécuter des programmes écrits en Dart sur Windows, il va falloir installer le SDK Dart.

Le processus d'installation est très simple et ne nécessite aucune pré configuration.

Rendez vous sur [le site de téléchargement](http://www.gekorm.com/dart-windows/) et téléchargez la version stable ou la version beta (pas recommandé).

![Dart installation page](/images/dart-base/dart.png)

## Installation du SDK Dart sur Linux

Si vous utilisez Debian / Ubuntu sur AMD64 (Intel 64 bits), vous pouvez choisir l’un des logiciels
options suivantes, qui peuvent toutes deux mettre à jour le SDK automatiquement lorsque de nouvelles versions sont publiées.

- [Installer avec apt-get](#installer-avec-apt-get)
- [Installer un paquet Debian](#installer-un-paquet-debian)

### Installer avec **apt-get**

Effectuez la **configuration unique** suivante:

Pour la version stable

```terminal
$ sudo apt-get update
$ sudo apt-get install apt-transport-https
$ sudo sh -c 'curl https://dl-ssl.google.com/linux/linux_signing_key.pub|apt-key add - '
$ sudo sh -c 'curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list> /etc/apt/sources.list.d/dart_stable.list'
```

Pour la version bêta (pas recommandée)

```terminal
$ sudo apt-get update
$ sudo apt-get instal apt-transport-https
$ sudo sh -c 'curl https://dl-ssl.google.com/linux/linux_signing_key.pub|apt-key add - '
$ sudo sh -c 'curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_unstable.list> /etc/apt/sources.list.d/dart_unstable.list'
```

Puis installez le SDK Dart:

```terminal
$ sudo apt-get update
$ sudo apt-get install dart
```

### Installer un paquet Debian

Vous pouvez également télécharger Dart SDK en tant que paquet Debian au format de paquet **.deb**.

- [Canal stable](https://storage.googleapis.com/dart-archive/channels/stable/release/latest/linux_packages/dart_2.4.0-1_amd64.deb)

- [Dev channel](https://storage.googleapis.com/dart-archive/channels/dev/release/latest/linux_packages/dart_2.5.0-dev.1.0-1_amd64.deb)

## Modifier PATH

Après avoir installé le SDK, **ajoutez son répertoire bin à votre PATH**. Par exemple,
utilisez la commande suivante pour changer PATH dans votre session de terminal active:

```terminal
$ export PATH = "$PATH:/usr/lib/dart/ bin"
```

Pour changer le PATH pour les futures sessions de terminal, utilisez une commande comme celle-ci:

```terminal
$ echo 'export PATH = "$PATH:/usr/lib/dart/bin"' '>> ~ / .profile
```

## Installation du SDK Dart sur MacOs

[Installer homebrew](http://brew.sh/), et faite:

```terminal
$ brew tap dart-lang/dart
$ brew install dart
```

## Setup de l'éditeur de texte

Pour écrire du code Dart rapidement et profiter des avantages qu'offrent les éditeurs de texte, il est préférable d'utiliser Visual Studio Code de Microsoft , IntelliJ IDEA de Jetbrains ou Android Studio de Google.

### Visual Studio Code

Pour installer Visual Studio Code, rendez vous sur [le site de telechargement](https://code.visualstudio.com/Download) et téléchargez la version appropriée pour votre système d'exploitation.

![vscode installation page](/images/dart-base/vscode.png)

Pour profiter des avantages qu'offre VS Code, installez l'extension Dart.

- Ouvrez VS Code et faites Cmd+Shift+X ou Cliquez sur Extensions pour ouvrir le panneau des extensions et cherchez Dart

![vscode extension](/images/dart-base/dart_ext.png)

- Choisissez **Install** pour installer l'extension

### IntelliJ IDEA et Android Studio

- Installez [IntelliJ IDEA](https://www.jetbrains.com/idea/) ou [Android Studio](https://developer.android.com/studio).

- Installez le plugin Dart

## DartPad

DartPad est un éditeur en ligne qui permet d'écrire et d'exécuter du code Dart.

Il permet de programmer sans installer un SDK ou un éditeur de texte.

dartpad.dev
![dartpad](/images/dart-base/dartpad.png)

[Essayer DartPad](https://dartpad.dev/)
