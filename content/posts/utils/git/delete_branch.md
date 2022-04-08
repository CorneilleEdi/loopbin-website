---
title: Comment supprimer une branch git en local et sur les remotes?
description: Garder le controle et supprimer vos branches n'importe ou.
tags: [git]
topics: [git]
date: 2020-03-01
---

#

Après avoir utiliser une branche que vous avez créée, il est souhaitable de la supprimée si vous ne planifiez pas de l'utiliser dans le futur.
Une autre simple raison est qu’avoir beaucoup de branche peut créer des confusions.

Nous allons voir comment supprimer une branche en local et sur les remotes.

## Lister les branches

Pour lister toutes les branches, tapez la commande suivante :

```shell
git branch
```

La commande suivante liste les branches à distances (sur les remotes) et les locales.

```shell
git branch -a
```

Ou

```shell
git branch --all
```

La branche sur laquelle vous êtes actuellement est celle précédée par une étoile.

## Supprimer une branche en locale

Simple !
Faite **git branch -d ** ou **git branch --delete **

### Exemple

```shell
git branch -d test
```

> Attention ! Il est important d'être sûr d'avoir mergé (combinbé)la branche à supprimer

## Supprimer sur le remote

Pour cela on utilisé un push.

faite **git push <nom_du_remote> --delete <nom_de_la_branche> **

### Exemple

```shell
git push origin --delete test
```

Voila !
