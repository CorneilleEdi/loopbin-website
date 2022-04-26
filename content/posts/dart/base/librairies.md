---
title: Dart 09 - Les librairies intégrées
description: Les librairies intégrées et les outils qu'elles proposent
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-09
slug: dart-09-les-librairies-integrees
prev: dart-08-les-collections
next: dart-10-les-entrees-sorties
---

#

Tout comme Java, C, Python; le langage Dart contient des librairies intégrées.

Une librairie ou bibliothèque est une collection de fonctions, classes et constantes rangées sous une même catégorie.

Ces fonctions, classes et constantes permettent de faire des opérations préconçues dans le but d'augmenter la productivité et l'efficacité du langage.

Les librairies en Dart sont divisées en 3 grandes parties:

- Les librairies fondamentales qui permettent de faire des tâches simplement plus rapidement.
- Les librairies Web permettent de faire des manipulations web. Comme nous l'avions dit au tout début, Dart est un langage qui a été créé pour remplacer le Javascript. Il est alors possible de l'utiliser pour créer des sites web, des serveurs et des micro-services.
- Les librairies MV (Machine Virtuelle). Elles permettent d'interagir directement avec la machine sur laquelle le programme tourne. Elle a des fonctions de manipulation de fichier, de gestion de tâche , des fonctions de gestion des entrées et sorties.

Dans ce chapitre nous allons apprendre à importer une librairie et à utiliser les outils qu'elle propose.

Nous apprendrons aussi à créer nos propres librairies et à les utilisées dans nos programmes.

---

## Importer une librairie

Pour utiliser une librairie, la première étape est de dire à notre programme que nous souhaitons utiliser cette librairie. Cette action est appelé l' **importation**.

Pour importer une librairie, on utilise la syntaxe suivante:

```dart
import 'lienVersLaLibrairie';
```

le lien vers la librairie dit au programme où trouver la librairie.

Dans le cas des librairies intégrées, ce lien commence toujours par **dart :** suivi du nom de la librairies.

Noms de quelques librairies intégrées:

- **dart : math**. Cette librairie contient des constantes mathématiques et des fonctions qui permettent de faire des opérations mathématiques. Elle contient aussi un générateur aléatoire de nombre.
- **dart : convert** . Elle contient des fonctions et des méthodes d'encodage et de décodage pour la conversion entre différentes représentations de données, y compris le JSON et l' UTF-8.
- **dart : collection** . Elle contient des classes permettant de manipuler certaines collections de données comme les listes chainées.
- **dart : async**. Elle permet le support de la programmation asynchrone.
- **dart : io**. Elle permet le support des fichiers, socket, HTTP et autres Entré / Sortie pour les applications non Web.
- **dart : js**. Elle prend en charge l'interopérabilité avec le JavaScript.

Exemple

```dart
import 'dart:math';
import 'dart:async';
```

Il est aussi possible de donner d'un alias à une bibliothèque lors de son import. Cet alias est une référence , un nom personnalisé qui sera utilisé au moment de l'utilisation de la bibliothèque.

Exemple

```dart
import 'dart:math' as Math;
import 'dart:async' as Asynchrone;
```

On peut aussi seulement importer les fonctions ou les constantes qu'on désire utiliser.

```dart
import 'dart:math' show pi;
```

Cette ligne de code importe seulement la constante **pi** de la librairie **math** et rien d'autre.

Nous reviendrons plus tard sur l'importation des bibliothèques non intégrées c'est-à-dire les bibliothèques créées par le programmeur.

---

## Utiliser une librairie

La syntaxe pour utiliser une librairie est assez simple. Il s'agit de l'alias de la librairie suivi d'un **point .** et de l'appel de la fonction , de la classe ou de la constante qu'on souhaite utiliser.

Si l'on n'a pas assigné un alias lors de l' import de la librairie alors on utilise simplement la fonction , la classe ou la constante désirée.

Exemple

```dart
import 'dart:math';
import 'dart:math' as Math;

void main() {
  print(pi); //3.141592653589793

  print(Math.e); //2.718281828459045
}
```

---

## Etude de la librairie math

La librairie **math** comme son nom l'indique contient des outils qui permettent de faire des tâches mathématiques.

Quelques constantes de la bibliothèque **math**

| Constantes |                            Valeurs                            |
| :--------: | :-----------------------------------------------------------: |
|     pi     |        Constante mathématique **pi** 3.141592653589793        |
|     e      | Nombre d'Euler ou constante de Néper **e** 2.718281828459045  |
|   sqrt2    | Valeur finie de la racine carrée de 2 soit 1.4142135623730951 |
|    ln10    |    valeur du logarithme népérien de 10 soit 2.30258509299     |

Quelques fonctions de la bibliothèque **math**

|  Fonctions  |                                       Opérations                                       |
| :---------: | :------------------------------------------------------------------------------------: |
| max (x , y) |  prend comme deux arguments deux nombres x et y et retourne le plus grand d'entre eux  |
| min (x , y) |  prend comme deux arguments deux nombres x et y et retourne le plus petit d'entre eux  |
|  sqrt (x)   |               prend un nombre x en argument et retourne sa racine carrée               |
| pow( x, y)  | prend comme deux arguments deux nombres x et y et retourne le résultat de x exposant y |

Pour plus d'information rendez vous dans la [documentation officielle](https://api.dart.dev/stable/2.4.0/dart-math/dart-math-library.html).

---

## La classe Random

La classe Random est la classe génératrice de nombre et de booléen aléatoires de Dart. Elle est incluse dans la bibliothèque intégrée **math**.

Exemple

```dart
import 'dart:math' show Random;

void main() {
  var random = new Random();


  var num = random.nextInt(100);
  print(num);//11

  print(random.nextBool()); //false

}
```

Quelques méthodes de la classe **Random**

|   Méthodes    |                                    Opérations                                     |
| :-----------: | :-------------------------------------------------------------------------------: |
| nextInt( x )  |    prend un nombre x en argument et retourne un nombre aléatoire entre 0 et x     |
| nextDouble( ) | Génère une valeur décimale aléatoire non négative entre 0.0 inclus et 1.0 exclus. |
|  nextBool( )  |                      Génère une valeur booléenne aléatoire.                       |

---

## Créer une librairie

Pour créer une librairie , il suffit de créer un nouveau fichier et d'y écrire les classes, fonctions ou constantes qu'on désire utiliser dans le programme principal.

L' importation de cette librairie se fait en utilisant le lien relatif du fichier contenant les fonctions par rapport au fichier principal (là ou nous souhaitons les utiliser)

```dart[calculs.dart]
maximum(x, y) => x > y ? x : y;
```

```dart[main.dart]
import 'lib/calculs.dart';

void main() {
  int x = 12;
  double y = 45;

  print(maximum(x, y));
}

```

Dans notre exemple, le fichier **calculs.dart** se trouve dans notre dossier **lib** contenu dans le même dossier que notre fichier **main.dart**.

---

## Pratique

Ecrire un programme qui génère deux nombres aléatoires entre 0 et 250 et retourne le plus grand d'entre eux et sa racine carrée .

```dart[maxEtRacine.dart]
import 'dart:math' show Random, sqrt, max;

void main() {
  var random = new Random();

  var num1 = random.nextInt(250);
  var num2 = random.nextInt(250);
  print("nombre 1 : $num1");
  print("nombre 2 : $num2");

  var resultat = maxEtRacine(num1, num2);
  print("maximum : ${resultat[0]}");
  print("racine du max : ${resultat[1]}");
}

maxEtRacine(int x, int y) {
  var maximum = max(x, y);

  return [maximum, sqrt(maximum)];
}
```

```[output]
nombre 1 : 121
nombre 2 : 85
maximum : 121
racine du max : 11
```

Ecrire un programme qui génère une liste contenant 25 nombres aléatoires entre 0 et 1300 et qui retourne le maximum , la somme des éléments et la moyenne de cette liste.

```dart[liste.dart]
import 'dart:math' show Random;

void main() {
  List<int> maListe = generateurDeListe(25);
  print('La liste est :');
  print(maListe);

  print('maximum : ${max(maListe)}');
  print('somme : ${somme(maListe)}');
  print('moyenne : ${somme(maListe) / maListe.length}');
}

List<int> generateurDeListe(int n) {
  var random = new Random();

  return [for (var i = 0; i < n; i++) random.nextInt(1300)];
}

max(liste) {
  var maximum = 0;

  for (var nombre in liste) {
    if (nombre > maximum) maximum = nombre;
  }

  return maximum;
}

somme(liste) {
  var sum = 0;
  for (var nombre in liste) sum += nombre;
  return sum;
}
```

```[output]
La liste est :
[143, 303, 235, 398, 35, 975, 1056,
298, 422, 1062, 795, 1128, 23, 1149,
1286, 1298, 475, 405, 463, 771,
532, 1032, 777, 994, 878]

maximum : 1298
somme : 16933
moyenne : 677.32
```
