---
title: Dart 06 - Switch/Case
description: Structure de contrôle switch en Dart et son utilisation
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

## Table of Contents

##

L'expression switch sert à contrôler les opérations conditionnelles en mettant en place plusieurs conditions. Elle a le même fonctionnement que la structure conditionnelle **if .. else .. if** tout en offrant une syntaxe plus simple.

Si vous vérifiez la valeur d'une seule variable dans **if ... else ... if**, il est préférable d'utiliser l'instruction **switch**.

## Syntaxe de switch/case

```dart
switch (expression){
    case condition1 :
        instruction1
        break;

    case condition2 :
        instruction2;
        break;

    case condition3 :
        instruction3
        break;

    default :
        instruction par defaut
}
```

### Explication

![switch case](./images/switch.png)

**expression** est l'expression qui sera évaluée dans les différents cas.

L’instruction **case** permet de définir un certain cas. La valeur qui lui est passée sera évaluée avec l'expression définie au départ.

**break** permet de terminer le traitement d’un cas particulier dans l’instruction **switch**.

L’instruction **default** est exécutée si aucune valeur des différents cas n’est égale à la valeur de **switch** .

Example

```dart
int x = 13;
  switch (x % 2) {
    case 0:
      print("$x est paire");
      break;

    default:
      print("$x est impaire");
}

//Output
//13 est impaire
```

---

## Pratique

```dart:title=permission.dart
void main() {
  String permission = 'ROOT';
  switch (permission) {
    case 'READ':
      print("vous ne pouvez que lire ce fichier");
      break;

    case 'WRITE':
      print("vous ne pouvez que écrire dans ce fichier");
      break;

    case 'ROOT':
      {
        print("hey");
        print("vous pouvez lire et écrire dans ce fichier");
      }
      break;

    default:
      print("vous n'avez aucune permission");
  }
}
```

```dart:title=output
hey
vous pouvez lire et écrire dans ce fichier
```

> Il est possible de combiner plusieurs cas et de leur assigner la même instruction.

```dart
String permission = 'WRITE';
  switch (permission) {
    case 'READ':
    case 'WRITE':
      print("votre permission n'est pas complète");
      break;

    case 'ROOT':
      print("vous pouvez lire et écrire dans ce fichier");
      break;

    default:
      print("vous n'avez aucune permission'");
 }

/* Output
votre permission n'est pas complète
*/
```

le résultat serait le même avec **String permission = 'READ'**
