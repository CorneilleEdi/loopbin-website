---
title: Typescript, Est ce une si bonne idée?
description: Les pour et contre du Language de programmation Typescript
tags: [typescript, javascript, node]
topics: [typescript]
date: 2020-03-01
slug: typescript-est-ce-une-si-bonne-idee
---

![Typescript](/images/typescript/typescript.png)

# Introduction

Le TypeScript est sans doute l'une des meilleures choses à venir dans le monde du JavaScript, aidant les développeurs à créer confortablement des logiciels complexes sans inquiétude. Nous décrivons brièvement les avantages et les inconvénients du TypeScript.

> TypeScript est un langage de programmation libre et open source développé par Microsoft qui a pour but d'améliorer et de sécuriser la production de code JavaScript.
> C'est un sur-ensemble de JavaScript (c'est-à-dire que tout code JavaScript correct peut être utilisé avec TypeScript).
> Le code TypeScript est transcompilé en JavaScript, et peut ainsi être interprété par n'importe quel navigateur web ou moteur JavaScript. Wikipedia

## Presentation

Depuis longtemps, le **Javascript** a toujours été un langage de programmation très essentiel dans le monde du développement malgré quelques petits inconvénients.
Puis en 2012, Microsoft a annoncé la sortie d'un nouveau projet open source : **Typescript**.
Ce projet a pour but de régler les petits soucis du Javascript et d'offrir aux programmeurs un langage de niveau.

## Les raisons pour lesquelles le Typescript est une excellente idée.

- **Typage statique optionel**. JavaScript est un langage typé dynamiquement, ce qui signifie que les types sont vérifiés et que les erreurs de type de données ne sont détectées qu'au moment de l'exécution.
  Ce qui peut etre tres dangereux et peut creer des erreurs durant la production.TypeScript introduit un typage statique fort facultatif: une fois déclarée, une variable ne change pas son type et ne peut prendre que certaines valeurs.
- **Lisibilité**. En raison de l'ajout de types stricts et d'autres éléments qui rendent le code plus auto-expressif, vous pouvez voir l'intention de conception des développeurs qui ont à l'origine écrit le code. C'est particulièrement important pour les équipes réparties travaillant sur le même projet. Un code qui parle de lui-même peut compenser le manque de communication directe entre les membres de l'équipe.
- **Prise en charge IDE**. Les informations sur les types rendent les éditeurs et les environnements de développement intégrés (IDE) beaucoup plus utiles. Ils peuvent offrir des fonctionnalités telles que la navigation dans le code et la saisie semi-automatique, fournissant des suggestions précises.
- **la puissance de l'orienté object**. TypeScript prend en charge les concepts de la programmation orientée objet (POO), tels que les classes, les interfaces, l'héritage, etc. Le paradigme OOP facilite la construction d'un code évolutif bien organisé, et cet avantage devient plus évident à mesure que votre projet grandit en taille et en complexité.
- **Immense communauté talentieuse**. Derriere de Typescript se trouve une immsense communauté de personne très talentieuse travaillant de jour en jour à l'amelioration du language.
- **le support intégré des nouvelles version de l'ECMAScript**.ECMAScript est le langage de script qui constitue la base de JavaScript. ECMAScript definie les stantards et les nouveautées du Javascript. Le typescript prend grand soins d'inclure toute ces nouvelles fonctionnalités à chaque mise à jour.

## Le Typescript, une très mauvaise idée.

Rien dans ce monde n'est parfait, meme le Typescript.
Pourquoi certaines personnes fuient le Typescript comme la peste ?

- **Étape de construction supplémentaire requise**
  L'étape de construction requise pour compiler TypeScript vers JavaScript est quelque chose qui peut irriter (et m'irrite souvent).
  De manière générale, avant tout le TypeScript vous permet d'économiser du temps durant le développement.
- **Un nouveau truc à apprendre**.Comme tout, il faut passer un peu de temps pour l'apprendre.
  Mais pour moi, j'ai trouvé que j'étais en mesure de devenir productif avec le TypeScript en quelques heures étant donné qu'il ressemblait étroitement à une fusion du Java et du Javascript.
- **Code supplémentaire**. La lisibilité améliorée du code apportée par le typage et les annotations de type mentionnés précédemment a ses inconvénients. Tout d'abord, vous devez écrire plus de code et cela a le potentiel de ralentir le processus de développement. Deuxièmement, des annotations supplémentaires rendent les fichiers TS plus volumineux que ceux écrits en JS ordinaire.

## Bref

Venant du monde des langage typé comme le **Java** et **C++**, le Typescript a été pour moi un moyen de m'insérer dans le monde du Javascript.
Biensur que je ressens quelques fois que le langage me ralentit, mais je trouve que c'est un bon compromis pour les avantages qu'il offre.

## Mon utilisations

D'habitude, j'utilise le Typescript pour mes grands projets. Comme par exemple un projet sur lequel j'aurai à **travailler pendant des mois** et que j'aurai à **maintenir pendant des années**.

> A vous de peser le pour et le contre 🤔 🤨.
