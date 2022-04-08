---
title: Dart 02 - Les types de données
description: Les différents types de données en Dart et leurs utilisations
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

#

> En [programmation informatique](https://fr.wikipedia.org/wiki/Programmation_informatique), un **type de donnée**, ou simplement un **type**, définit la nature des valeurs que peut prendre une [donnée](<https://fr.wikipedia.org/wiki/Donnée_(informatique)>), ainsi que les [opérateurs](<https://fr.wikipedia.org/wiki/Opérateur_(informatique)>) qui peuvent lui être appliqués. **Wikipédia**

Le langage Dart supporte plusieurs types de données qui peuvent être assignés à des variables.

- Les chaînes de caractères(String)
- Les nombres (int et double)
- Les booléens (Vrai ou Faux / True ou False)
- Les listes (Lists ou Arrays)
- Les ensembles (Sets)
- les dictionnaires (Maps)
- Les runes
- Les symboles

Dans notre tutoriel nous allons nous focaliser sur tous les types de données sauf les runes et les symboles (rarement utilisés)

Dans le tutoriel précédent nous avions exploré la notion de variable. En effet nous avons deux méthodes permettant de définir une variable.

La première méthode définit la variable en utilisant le mot clé **var** suivi du nom de la variable et de la valeur qui lui est attribuée.

```dart
var vitesse = 250;
```

La deuxième méthode définit la variable en utilisant comme mot clé le type de la variable suivi du nom de la variable et de la valeur qui lui est attribuée.

```dart
int vitesse = 250;
```

En définissant une variable par son type, il sera impossible de lui assigner une valeur d'un autre type où que ce soit dans votre programme.

Il est conseillé de définir les variables à l'aide du mot clé **var** quand cette variable est une variable local. Nous y reviendrons plus tard dans notre apprentissage.

## Les chaînes de caractères (String)

Pour définir des chaînes de caractères (noms, phrase), le langage Dart utilise le mot clé **String**.

Cette chaîne est alors passée entre des griffes. Il est possible d'utiliser une seul griffe **' '** ou deux **" "**

```dart
String animal = "Chien";
String marque = 'ASUS';
```

Si votre chaîne de caractères contient des griffes **'**, vous devez alors utiliser deux griffes **" "** pour créer votre chaîne de caractères ou faire une échappe des griffes **'** contenues dans votre chaînes de caractères.

Pour échapper la griffe, il va falloir le précéder d'un back slash **\ **.

```dart
String phrase1 = "l'efficacité de Dart";
String phrase2 = "l\'efficacité de Dart";
```

L'opérateur d'addition **+** peut être utilisé pour concaténer des chaîne de caractères.

```dart
String titre = "Les chaînes de" + "caractere";
//"Les chaînes de caractères"
```

Pour créer une chaîne de caractères multiligne, utilisez une combinaison de trois griffes simples ou doubles ou la combinaison **\n** qui jouera le rôle d'un retour a la ligne.

```dart
String lorem = '''
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Phasellus sodales dolor lacus, eu ullamcorper lorem varius eget
''';

String elementum = "leo nec metus sagittis. \n et semper sem finibus";
```

## Les nombres

Les types de données "nombre" sont utilisés pour définir les variables **numériques**. En Dart, nous avons **deux types de données nombres** : **int** et **double** .

### Int

Int permet de définir les nombres entiers entre -2e63 to 2e63 - 1.

```dart
int solde = 450000;
int un_million = 10e6; //10 exposant 6;
int negatif = -1;
```

### Double

Le type Double permet de définir les nombres décimaux.

```dart
double pi = 3.14;
double douze = 12; //Cette declartion convertira 12 en 12.0
```

int et double étant des types de données numériques, il est naturellement possible de leur appliquer des opérateurs comme :

- addition **+**
- soustraction **-**
- multiplication **\***
- division **/**

```dart
double quotient = 15/2;
```

> Faites attention au type avec lequel vous définissez vos variables provenant d'une opération. Si le type du résultat ne coïncide pas avec le type de la variable le compilateur vous sortira une erreur au moment de l'exécution.

## Les booléens

Les valeurs pouvant être assignées aux booléens sont : **true** ou **false** soit **vrai** ou **faux**. Les booléens ont pour mot clé **bool**.

```dart
bool vrai = true;
bool faux = false;
```

## Les liste

Une liste est une collection d'élément du même type. Pour déclarer une liste , il suffit de passer les valeurs de la liste entre **des crochets [ ]** et assigner le tout à la variable.

```dart
var langues = ['francais', 'Anglais', 'Espagnol'];
```

Pour préciser le type des éléments de la liste , nous utiliserons une syntaxe spéciale que nous détaillerons plus tard.

```dart
List<type de donnee> nom_de_la_variable = [elements];

List<int> premiers = [2, 3, 5, 7, 11];
List paires = [2, 4, 6, 8];
List<String> smartphone = const ["iPhone", "Galaxy"];
//le mot clé permet de definir la liste comme etant une liste invariable
```

## Les ensembles (Set)

Les ensembles en Dart illustrent le concept d'ensemble en mathématique c'est-à-dire des collections non ordonnées d'éléments uniques.

Pour déclarer un ensemble, il suffit de passer les valeurs de la liste entre **{ }** et assigner le tout à la variable.

```dart
var nombres = {1, 2, 3, 4, 5};
Set<double> decimaux = {1.1, 1.2, 1.3, 1.4};
```

## Les dictionnaires (Map)

Un dictionnaire est un objet qui associe des clés et des valeurs. Les clés et les valeurs peuvent être n'importe quel type d'objet. Chaque clé n'apparaît qu'une seule fois, mais vous pouvez utiliser la même valeur plusieurs fois.

```dart
var composants = {'computer': 'ordinateur', 'keyboard': 'clavier', 'mouse': 'souris'};
```

Le dictionnaire **composants** associe a une clé de type String une valeur de type String. Nous pouvons aussi faire la même déclaration comme ceci :

```dart
var composants = Map<String, String>(); // ou tout simplement Map()
composants['computer'] = 'ordinateur';
composants['keyboard'] = 'clavier';
composants['mouse'] = 'souris';

print(composants['mouse']);
//output : souris
```

## Le type void

il s’agit en fait d’un objet qui n’a aucune valeur.

## Conversion ou cast

Il est possible de changer le type d'une valeur. Cette opération permet de faire passer une valeur d'un type de donnée à un autre.

`Attention aux types des variables`

Les Convertisseurs:

- **toInt()** converti la valeur en un nombre entier
- **toDouble()** converti la valeur en un nombre décimal
- **toString()** converti la valeur en une chaîne de caractères
- **toList()** converti la valeur en une liste
- **toMap()** converti la valeur en un dictionnaire
- **toSet()** converti la valeur en un ensemble

```dart
int douze = 12;
double douze_decimal = douze.toDouble(); // 12.0
String douze_caractere = douze.toString(); // "12"

```

> Les convertisseurs sont a utilises avec précaution.

## Plus sur les chaînes de caractères

Il est possible de passer une variable directement dans une chaîne de caractères. Cette méthode a aussi pour avantage de permettre d'appliquer des opérations aux variables directement dans la chaîne de caractères.

Pour cela , on passe le nom de la variable dans la chaîne de caractères précédé du signe **Dollars $** .

Pour effectuer une opération sur cette variable dans la chaîne de caractères on passe le nom de la variable dans la chaîne entre **des accolades { }** précédées du signe **Dollars $**

```dart
int solde = 4500;
String message = "votre solde actuelle est de $solde euros";
//votre solde actuelle est de 4500 euros
String alert = "votre solde est à ${solde/450000} %";
//votre solde est à 0.01 %
```

---

## Pratique

```dart[donnees.dart]
main() {
  String nom = "Apple";
  var date = "1 April 1976";
  List<String> produits = ["iPhone", "iMac", "Apple Watch", "Mackbook"];
  int valeur = 8;

  String message  = """
  La marque $nom a été créé le ${date.toUpperCase()}.
  Sa valeur actuelle est de ${valeur * 10} milliard de dollars 💵.
  L'un de ses produits les plus connus est l'${produits[0]}.
  """;

  print(message);
}
```

```[output]
La marque Apple a été créé le 1 APRIL 1976.
Sa valeur actuelle est de 80 milliard de dollars 💵.
L'un de ses produits les plus connus est l'iPhone.
```
