---
title: Dart 12 - Programmation asynchrone
description: Pogrammation asynchrone en Dart. Explication et utilisation des Futures, Streams et async/await
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

## Table of Contents

##

Dans ce chapitre nous allons discuter de la programmation asynchrone en Dart.

Ce chapitre sera un peu théorique. Son but principal est d'expliquer le concept de la programmation asynchrone en Dart.

---

## Explication du concept

Imaginons un programme simple dans lequel nous faisons plusieurs actions comme l' exécution de plusieurs fonctions. Dans la programmation synchrone, ces fonctions s' exécutent l'une après l'autre. La règle de base dans ce cas est que chaque tâche est exécutée une à la fois, l’une s’achevant complètement
avant que l’autre ne commence. Cette façon de procéder à quand même un gros désavantage:

lorsqu'une tache prend du temps, elle retarde ainsi l' exécution des autres fonctions.

Imaginons un scenario où nous souhaitons recevoir les données d'un API, manipuler ces données et faire d'autre actions. Avec la programmation synchrone, ces trois étapes s' exécuteront dans l' ordre mais si la requête vers le serveur pour recevoir les données prend du temps alors tout notre programme prendra du temps à s' exécuter.

![synchrone](./images/sync.png)

C'est dans ce genre de situation que la programmation asynchrone entre en jeu.

La programmation asynchrone est une forme de programmation parallèle qui permet à une unité de travail de s'exécuter séparément du thread principal de l' application. Lorsque le travail est terminé, il informe le thread principal en lui indiquand si le travail a été terminé avec succès ou si il a échoué. Son utilisation présente de nombreux avantages, notamment une amélioration des performances des applications et une réactivité accrue.

Si nous revenons dans notre situation passée , avec la programmation asynchrone la requête vers le serveur s' exécutera séparément du thread principal permettant alors aux autres fonctions n'ayant pas besoin des données de cette requête de s' exécuter parallèlement.

![asynchrone](./images/async.png)

Bien que Dart ne comporte qu'un seul thread, il peut interagir avec d'autres codes exécutés dans des threads séparés.

Les fonctions constituent la base de la programmation asynchrone. Ces fonctions asynchrones ont des modificateurs asynchrones dans leur corps.
Lorsqu'une fonction asynchrone est appelée, un **Future** est immédiatement renvoyé et le corps de la fonction est exécuté ultérieurement. Lorsque le corps de la fonction asynchrone est exécuté, le **Future** renvoyé par l'appel de la fonction sera complété avec son résultat.

---

## Future

Lorsqu'une fonction asynchrone est appelée, le résultat immédiat est un **Future**. C'est un moyen d'obtenir une valeur pour la fonction appelée, plus tard dans le futur. En termes simples, nous pouvons dire qu'un **Future** est un indice pour obtenir le résultat.
Lorsqu'une fonction qui renvoie un **Future** est demandée, ces actions se produisent:

- Le travail à effectuer est mis en file d'attente par la fonction et la sortie est un objet Future inachevé.
- Plus tard, lorsqu'une valeur est disponible, l'objet Future se termine avec cette valeur.

Les objets **Future** représentent les résultats des opérations asynchrones - traitement ou E / S à effectuer ultérieurement.

En effet un **Future** a trois état:

- **inachevé** . C'est l'état de départ d'un objet **Future**. Quand aucun résultat n'est disponible pour l'instant, le **Future** est inachevé.
- **terminé avec des données**. Dans cet état la fonction à exécuter est terminée et des données sont retournées.
- **terminé avec une erreur**. Il est possible que la fonction se termine par erreur.

Pour utiliser les fonctions de la programmation asynchrone en Dart, il va falloir importer la bibliothèque intégrée **async**

Exemple

```dart
import 'dart:async';

void main() {
  var requete = Future<String>.delayed(Duration(seconds: 2), () {
    return "Les donnees reçues";
  });

  requete.then((value) {
    print(value);
  });

  print("Initialisation");
}
```

Le résultat de ce programme est le suivant

```
Initialisation
Les donnees recues
```

Nous pouvons alors remarquer que vu que le future ne reçoit pas les données immédiatement, il s' exécute dans un autre thread. Ce qui permet au programme d' afficher le message **Initialisation** avant que le résultat **"Les donnees recues"** ne soit renvoyé par l' objet **Future** et utiliser grave a la méthode **then** qui s' exécute quand l'objet est dans son état **terminé avec des donnees** .

Généralement nous ne serons pas emmenés à créer nos objets **Future** nous mêmes. Ils nous seront renvoyés comme résultat lors de certaines opérations comme une requète http avec la librairie **http** de Dart.

Exemple

```dart
import 'dart:async';

void main() {
  Map<String, dynamic> info = {"nom": "Eddy", "age": 19};
  requete(info).then((resultat) {
    print(resultat);
  }).catchError((erreur) {
    print(erreur);
  }).whenComplete(() {
    print("requete terminee");
  });

  print("Initialisation de la requete");
}

Future requete(data) {
  return Future.delayed(Duration(seconds: 2), () {
    if (data["age"] < 18) throw 'error 😥';
    return "Les donnees recues 😎";
  });
}
```

Vu que l' âge dans notre dictionnaire **info** est supérieur à 18, le résultat de notre requête est

```
Initialisation de la requete
Les donnees recues 😎
requete terminee
```

---

## Stream

De même que les **Future**, les streams permettent de faire des opérations asynchrones mais les streams eux retournent une ou plusieurs valeurs ou erreurs durant leur exécution.

Comment travailler avec les stream ?

Supposons que nous avons une fonction qui retourne un Stream et que ce stream nous renvoie un élément chaque seconde.

Nous pouvons souscrire à ce Stream. Nous passons une fonction à cette souscription et à chaque fois qu'un élément est émis par le stream, notre fonction sera exécutée.

Par défaut les stream ne permettent qu'une seule souscription. Mais les BroadcastStream permettent plusieurs souscriptions.

La souscription à un stream peut prendre plusieurs paramètres:

- **onError** : une fonction qui prend en paramètre une variable qui sera l'erreur en cas d'erreur.
- **onDone** : une fonction qui s' exécute quand le stream est terminé.
- **cancelOnError** : un booléen **true** par défaut. Elle permet de quitter le stream ou non en cas d'erreur.

Une souscription peut être :

- mis en pause grâce à la méthode **pause( )**
- redémarrée grâce à la méthode **resume( )**
- terminée grâce à la méthode **cancel( )**

Vu qu'un stream renvoie un itérable d' élément qui est complété avec le temps, nous pouvons utiliser des méthodes comme map, where, reduce pour manipuler ce flot d'information entrant.

Pour créer un stream, nous créons une instance de la classe StreamContoller.

la méthode **sink.add(valeur)** permet de passer une valeur au stream qui sera ensuite émise par celle-ci.

la méthode **sink.addError(error)** permet de passer une erreur au stream qui sera ensuite émise par celle ci comme une erreur.

la méthode **sink.close()** permet de terminer le stream.

Exemple

```dart
import 'dart:async';

void main() {
  var valeur = 1;
  var streamController = StreamController();

  Timer.periodic(Duration(seconds: 1), (t) {
    streamController.sink.add(valeur);
    valeur++;
  });

  streamController.stream
      .map((nombre) => nombre *= nombre)
      .where((square) => square % 2 == 0)
      .listen(
        (data) => print('valeur : $data'),
        onError: (erreur) => print(erreur),
        onDone: () => print('findu stream'),
        cancelOnError: false,
      );
}
```

Attention le programme suivant n'est pas un programme fini. N'oubliez pas de faire **Ctrl + C** dans votre console pour le terminer.

Explication

Dans ce programme nous avons créé un stream qui incrémente une valeur par 1 chaque seconde et retourne cette valeur. Grâce à **map** nous calculons le carré de chaque valeur émise, puis cette valeur est paire nous la recevons et nous l'affichons.

---

## Async / Await

Un autre moyen d’obtenir des données provenant d'une opération asynchrone plus facile à lire est **await**. Au lieu d'utiliser **then ( )**, vous pouvez attendre les données grâce au mot clé **await**

await vous permettra de récupérer directement la valeur retournée au lieur d'utiliser la méthode **then ( )**

Si vous voulez recevoir les données grâce à **await**, vous devez noter votre fonction comme étant **async** .

Marquer une fonction avec async n’est que pour vous permettre d’attendre à l’intérieur de son corps.

Le problème avec Async / Await est qu'il ne vous permet pas de savoir si le résultat provient d'une erreur ou pas. Pour cela il va falloir tester le résultat obtenu.

Exemple

Reprenons notre exemple précédent dans la partie **Future** et le convertissons-le en Async / Await

```dart
import 'dart:async';

const Duration delay = const Duration(seconds: 2);

Future requete(Map data) async {
  await new Future.delayed(delay);
  return "Les donnees recues 😎";
}

void main() async {
  Map<String, dynamic> info = {"nom": "Eddy", "age": 19};

  print("Initialisation de la requete");

  var resultat = await requete(info);

  print(resultat);
}

```

```
Initialisation de la requete
Les donnees recues 😎
```

---

## Pratique

Etude de cas : Les fichiers

De préférence la lecture des fichiers en Dart est une opération asynchrone (par rapport à la taille du fichier, le temps d' exécution de cette opération peut varier).

```json:title=users.json
[
  {
    "id": "e5a3eec5-3afe-4f59-b920-bdc6d5f705ba",
    "nom": "Byrne",
    "prenom": "Belva",
    "email": "bbyrne0@bravesites.com",
    "age": 58,
    "posts": [
      {
        "titre": "Cras in purus eu magna vulputate luctus.",
        "image": "http://dummyimage.com/120x202.jpg/dddddd/000000"
      },
      {
        "titre": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "image": "http://dummyimage.com/189x206.jpg/dddddd/000000"
      },
      {
        "titre": "Praesent id massa id nisl venenatis lacinia. ",
        "image": "http://dummyimage.com/162x222.jpg/cc0000/ffffff"
      }
    ]
  },
  {
    "id": "b64b28f6-ab13-40a1-a6fc-ea1ce3a39c28",
    "nom": "Bischop",
    "prenom": "Gill",
    "email": "gbischop4@toplist.cz",
    "age": 48,
    "posts": [
      {
        "titre": "Maecenas rhoncus aliquam lacus. .",
        "image": "http://dummyimage.com/103x156.jpg/ff4444/ffffff"
      },
      {
        "titre": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
        "image": "http://dummyimage.com/116x172.jpg/cc0000/ffffff"
      },
      {
        "titre": "Aliquam erat volutpat.",
        "image": "http://dummyimage.com/170x223.jpg/5fa2dd/ffffff"
      }
    ]
  },
    {
    "id": "2c166625-159f-4231-95f0-2f46a8545319",
    "nom": "MacHarg",
    "prenom": "Evita",
    "email": "emacharg1@theglobeandmail.com",
    "age": 56,
    "posts": [
      {
        "titre": "Vivamus metus arcu, adipiscing molestie.",
        "image": "http://dummyimage.com/241x139.jpg/ff4444/ffffff"
      }
    ]
  }
]
```

Nous allons lire de façon asynchrone les données de ce fichier , les décoder et les utiliser.

```dart:title=file.dart
import 'dart:async';
import 'dart:io';
import 'dart:convert';

void main() async {
  var fichier = File('users.json');

  String contenue = await fichier.readAsString();
  List data = jsonDecode(contenue);

  print(data.length);
}
```

```:title=output
3
```

L' opération **fichier.readAsString( )** retourne un **Future<String\>**. Async / Await nous permet alors de récupérer directement le résultat sous forme de chaîne de caractères et non de **Future**.
