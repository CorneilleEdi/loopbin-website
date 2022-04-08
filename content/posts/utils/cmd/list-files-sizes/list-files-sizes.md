---
title: Lister la taille des fichiers et dossiers sur linux
description: Comment utiliser la commande du pour lister la taille des fichiers et dossiers
tags: [linux, bash, cmd]
topics: [linux, bash]
date: 2020-12-08
---

#

Parfois, il est utile de lister les fichiers et dossiers dans un répertoire et d'afficher la taille de chaque fichier / dossier dans un format lisible. Vous pouvez facilement accomplir cela avec la commande **du** dans votre terminal.

La commande **du** est une commande Linux / Unix standard qui permet à un utilisateur d'obtenir rapidement des informations sur l'utilisation du disque. Il est préférable de l'appliquer à des répertoires spécifiques et permet de nombreuses variantes pour personnaliser la sortie en fonction de vos besoins.

Vous pouvez jeter un coup d'oeil au manuel d'utlisation en faisant dans le terminal :

```bash
man du
```

```bash
DU(1)                              User Commands                             DU(1)

NAME
       du - estimate file space usage

SYNOPSIS
       du [OPTION]... [FILE]...
       du [OPTION]... --files0-from=F

DESCRIPTION
       Summarize disk usage of the set of FILEs, recursively for directories.

       Mandatory arguments to long options are mandatory for short options too.

       -0, --null
              end each output line with NUL, not newline

       -a, --all
              write counts for all files, not just directories

       --apparent-size
              print  apparent sizes, rather than disk usage; although the
              apparent size is usually smaller, it may be
              larger due to holes in ('sparse') files, internal fragmentation,
              indirect blocks, and the like

       -B, --block-size=SIZE
 Manual page du(1) line 1 (press h for help or q to quit)
```

En faisant la commande **du** tout simplement, vous aurez un resultat qui ressemble a ceci

```bash
36          ./dev/learn/learn_typescript/decorators/base
12          ./dev/learn/learn_typescript/decorators/fire/dist
8           ./dev/learn/learn_typescript/decorators/fire/.vscode
40          ./dev/learn/learn_typescript/decorators/fire
156         ./dev/learn/learn_typescript/decorators
200         ./dev/learn/learn_typescript
1094760     ./dev/learn
30144008    ./dev
37719500    .
```

Vous pouvez voir qu'il y a trois lignes de sortie de données par la commande de base. Les valeurs à l'extrême gauche sont l'utilisation du disque, suivie du répertoire spécifique responsable de cette utilisation. La ligne du bas est un résumé de tout le répertoire . Il n'y a aucune indication sur l'unité de mesure utilisée avec la commande standard, ce qui rend cette sortie moins qu'utile. C'est là que les options deviennent nécessaires.

---

## Les flags utiles

- **h** , **-human-readable** : imprime les tailles dans un format lisible par l'homme (ajoute une unité à la taille).

```bash
du -h ./dev/learn/learn_typescript
```

```bash
156K	./dev/learn/learn_typescript/decorators
200K	./dev/learn/learn_typescript
```

- **c** , **-total** : imprime le taille total.

```bash
du -hc ./dev/learn/learn_typescript
```

```bash
12K	./dev/learn/learn_typescript/mapper/dist
8.0K	./dev/learn/learn_typescript/mapper/.vscode

200K	total
```

- **s**, **-summarize**: afficher uniquement un total pour le répertoire

```bash
du -sh ./dev/learn/learn_typescript
```

```bash
200K	./dev/learn/learn_typescript
```

- **S**, **-separate-dirs**: pour les répertoires n'incluent pas la taille des sous-répertoires

Pour plus d'options, veuillez vous référer au manuel.

## Cas pratiques

#### Lister tous les fichiers et dossiers ainsi que leurs tailles (en évitant les sous dossiers et sous fichiers)

```bash
du -sSh *
```

```bash
8.0K	learn_bash
4.0K	learn_typescript
4.0K	udacity
```
