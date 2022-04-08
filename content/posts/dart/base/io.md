---
title: Dart 10 - Les entrées / sorties
description: Quelques méthodes pour manipuler les entrées / sorties et les fichiers.
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

## Table of Contents

##

Le concept de base des entrées et sorties est de gérer les interactions avec le programme durant son exécution. Elle permet de soumettre des informations au programme et de recevoir des données venant du programme.

Prenons par exemple le cas des fichiers. Les fichiers peuvent être utilisés pour soumettre des données à un programme mais ils sont souvent utilisées comme moyen de sauvegarde de données. Par sauvegarde de données je veux dire que le programme fait persister des données en les écrivant dans les fichiers.

Depuis le début de notre apprentissage , nous nous sommes familiarisés avec une fonction , la fonction **print ( )** qui permet d'afficher un message dans la console. Cette fonction est une fonction de **sortie** car elle fait **sortir** des données.

---

## Les entrées

Il est possible de soumettre des informations à un programme durant son exécution. Nous pouvons par exemple demander de rentrer des données dans la console. Ces données seront ensuite reçues par le programme et pourront être traitées. Nous pouvons aussi directement lire les données dans un fichier.

Pour exécuter ces actions, il nous faudra utiliser des fonctions spéciales. Par chance Dart vient avec ces fonctions préconçues et répertoriées dans la bibliothèque **io ( input / output)** .

Alors pour commencer il va falloir importer cette librairie.

```dart
import 'dart:io';
```

La bibliothèque **dart : io** contient la classe **stdin**. Elle autorise la lecture de données grâce au moyen d' entrée standard comme le clavier.

La méthode de cette classe qui nous intéresse est la méthode **readLineSync( )**. Elle permet de recevoir des données entrées par l'utilisateur dans la console et de les passer au programme en exécution.

Les données reçues par cette méthode sont du type **String**

Exemple

```dart
import 'dart:io';

void main() {
  print("entrez votre nom : ");

  var nom = stdin.readLineSync();

  print(nom is String);

  print("votre nom : $nom");

}

/*
entrez votre nom :
Eddy
true
votre nom : Eddy
*/
```

---

## Les sorties

Les méthodes de sortie sont principalement la fonction **print ( )** qui affiche un message dans la console et la méthode **write ( )** de la classe **stdout** qui affiche un message dans la console aussi mais sans aller automatiquement à la ligne.

Exemple

```dart
import 'dart:io';

void main() {
  print("Dart est vraiment cool 😎😎😋");

  var emojies = ["🌭", "🍟", "🥞", "🥙", "🌮", "🥪", "🥚", "🍕"];

  for (var emo in emojies) {
    stdout.write("$emo \t");
  }
}

/*
Dart est vraiment cool 😎😋😋
🌭     🍟     🥞     🥙      🌮     🥪     🥚      🍕
*/
```

---

## Les fichiers

Les fichiers sont de bons moyens pour enregistrer des données à long terme. Ils sont faciles à utiliser et très efficaces. Il est possible de lire des données enregistrées dans un fichier avec un programme.

Comment créer un fichier et y écrire des données ?

Pour créer un fichier , on crée un objet **File ( )** qui prend en paramètre le nom du fichier et à cet objet on applique la méthode désirée.

la méthode **writeAsString ( )** prend en paramètre une chaîne de caractères et l'écrit dans le fichier créé.

Exemple

```dart
import 'dart:io';

void main() {
  final filename = 'message.txt';
  File(filename).writeAsString('Hey, je viens de creer un fichier 📃');
}

```

```text:title=message.txt
Hey, je viens de creer un fichier 📃
```

la méthode **readAsString ( )** permet de lire les données dans un fichier.

Exemple

```dart
import 'dart:io';

void main() {
  new File('message.txt').readAsString().then((String m) {
    print(m);
  });
}

//Hey, je viens de creer un fichier 📃
```

Pour plus d'informations sur les entrées et sorties , rendez vous sur [la documentation officielle des liste](https://api.dartlang.org/stable/2.4.0/dart-io/dart-io-library.html).

> Nous reviendrons sur les fichiers plus tard.

---

## Pratique

Créer le jeu du hasard:

Deviner un nombre choisi aléatoirement par le programme entre 0 et 50

```dart:title=hasard.dart
import 'dart:io' show stdin;
import 'dart:math' show Random;

void main() {
  Random random = Random();
  int nombre = random.nextInt(50);
  bool reprendre = true;

  while (reprendre == true) {
    print("Entrez votre nombre : ");

    String entree = stdin.readLineSync();
    if (entree == nombre.toString()) {
      print("Vous avez reussi👍. Le nombre etait $nombre");
      reprendre = false;
    } else {
      print("Essayer encore une fois");
      print("\n");
    }
  }
}
```

```:title=output
Entrez votre nombre :
12
Essayer encore une fois


Entrez votre nombre :
39
Essayer encore une fois


Entrez votre nombre :
24
Vous avez reussi👍. Le nombre etait 24
```
