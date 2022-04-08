---
title: Dart 08 - Les collections
description: Les listes, ensembles et  dictionnaires en Dart. La syntaxe de définition et de manipulation de chaque collection
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

#

Les collections sont des types de données qui permettent de passer un ensemble de valeur à une variable. Une collection en général renferme des données du même type.

En Dart il existe des collections comme :

- Les listes (Lists)
- Les ensembles (Sets)
- Les dictionnaires (Maps)

Dans ce chapitre nous allons parler de ces différents types de collection et des méthodes qui peuvent leur être appliquées.

---

## Les listes

Une liste est un ensemble d' élément du même type. Elles sont similaires aux **tableaux** en C, C++ et Java. Les listes servent principalement à créer des collections de données pouvant se répéter.

Il existe principalement deux types de liste.

- les listes de taille non modifiable
- les listes de taille modifiable

La taille de la liste étant le nombre d' élément que cette liste peut contenir. Si la taille de la liste est modifiable alors cette liste peut contenir un nombre illimité d' élément.

### Déclaration d'une liste

La syntaxe pour déclarer une liste de taille non modifiable est la suivante:

```dart
type_de_donnee nom_de_la_liste = List(taille_de_la_liste);
```

Exemple

```dart
List<String> étatsDesUSA = List(50);

//ou

var étatsDesUSA = List(50);
```

Il existe deux façon de déclarer une liste de taille modifiable.

```dart
type_de_donnee nom_de_la_liste = List();

//ou

type_de_donnee nom_de_la_liste = [];
```

En effet quand la taille de la liste n'est pas spécifiée au moment de la déclaration de la liste, celle ci devient une liste de taille modifiable.

Example

```dart
List<int> nombresPremiers = List();

//ou

var nombresPremiers = [];
```

### Initialisation d'une liste

L'initialisation d'une liste consiste à passer des valeurs de départ à la liste. Pour cela , on passe ces valeurs entre des **crochets [ ]**.

Syntaxe

```dart
nom_de_la_liste = [valeur1, valeur2, valeur3, valeur4];
```

Il est possible d'initialiser une liste à sa déclaration mais cette manière de procéder est seulement possible pour les listes de taille modifiable.

```dart
type_de_donnee nom_de_la_liste = [valeur1, valeur2, valeur3, valeur4];
```

En effet la syntaxe qui permet de déclarer une liste de taille modifiable en faisant

```dart
type_de_donnee nom_de_la_liste = [];
```

déclare une liste et l'initialise comme étant une liste ne contenant aucune valeur au départ.

Exemple

```dart
List<String> G7 = List(7);
G7 = ["Allemagne", "Canada", "États-UnisÉtats-Unis", "France",
      "Italie", "Japon", "Royaume-Uni" ];

var nombresPremiers = [2, 3, 5, 7, 11, 13, 17, 19, 23];
```

![listes](/images/dart-base/listes.png)

### Accéder aux éléments d'une liste

Pour accéder à un élément dans une liste, on utilise son index. Les listes en Dart ont 0 comme premier index. Cela veut dire que le premier élément de la liste a comme index 0, le deuxième 1, le troisième 2 et ainsi de suite.

Syntaxe

```
nom_de_la_liste[index]
```

Exemple

```dart
var G7 = ["Allemagne", "Canada", "États-Unis", "France",
      "Italie", "Japon", "Royaume-Uni" ];

print(G7[0]);	//Allemagne
print(G7[4]);	/italie
```

En accédant à un élément d'une liste, alors il est possible de modifier sa valeur.

Syntaxe

```dart
nom_de_la_liste[index] = nouvelleValeur;
```

Exemple

```dart
var G7 = [
    "Allemagne",
    "Canada",
    "États-Unis",
    "France",
    "Italie",
    "Japon",
    "Royaume-Uni"
];

G7[2] = "USA";
print(G7);

//[Allemagne, Canada, USA, France, Italie,
//	Japon, Royaume-Uni]
```

Nous remarquons que la valeur à l'index 2 **États-Unis** a été modifiée et devient **USA**.

### Les propriétés

Les propriétés sont des informations qui caractérisent un type de donnée. Il existe plusieurs propriétés pour les listes comme la longueur(nombre d' élément dans la liste), le premier élément de la liste,le dernier élément de la liste.

Quelques propriétés des listes

| Propriétés |                                             Informations                                             |
| :--------: | :--------------------------------------------------------------------------------------------------: |
|   length   |                             retourne le nombre d' élément dans la liste                              |
|   first    |                               retourne le premier élément de la liste                                |
|    last    |                               retourne le dernier élément de la liste                                |
|  isEmpty   | retourne **true** s'il n'y a pas d'éléments dans la liste et **false** si il y a au moins un élément |

### Méthodes

Une méthode est une fonction qui s'applique spécialement à un type de donnée. Elles permettent de faire certaines actions sur la ou les valeurs de cette variable.

Les listes ont des méthodes qui permettent de faire des actions comme :

ajouter ou supprimer un ou plusieurs éléments, appliquer des actions à chaque élément de la liste, accéder à l'index de certains éléments.

Quelques méthodes qui s'appliquent aux listes

|     Méthodes     |                                                             Actions                                                             |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|   add(élément)   |                                 prend en paramètre un élément et l'ajoute à la fin de la liste                                  |
| addAll(éléments) |                            prend en paramètre une liste d'élément et les ajoute à la fin de la liste                            |
|     clear()      |                                             supprime tous les éléments de la liste                                              |
| indexOf(élément) | prend en paramètre un élément et retourne son index dans la liste. Elle retourne **-1** si l'élément n'est pas dans cette liste |
| remove(élément)  |    prend en paramètre un élément et le supprime de la liste. Elle retourne **false** si l'élément n'est pas dans cette liste    |

Pour plus d'information sur les listes , rendez vous sur [la documentation officielle des listes](https://api.dartlang.org/dev/2.0.0-dev.65.0/dart-core/List-class.html).

Exemple

```dart
var G7 = [
    "Allemagne",
    "Canada",
    "États-Unis",
    "France",
    "Italie",
    "Japon",
    "Royaume-Uni"
  ];
print("nombre d'element de G7 : ${G7.length}");
print("premier element de G7 : ${G7.first}");
G7.clear();
print("G7 est elle vide ? : ${G7.isEmpty ? "Oui" : "Non"} ");

G7.addAll(["Allemagne", "Canada", "États-Unis"]);

print(G7);

/*
nombre d'element de G7 : 7
premier element de G7 : Allemagne
G7 est elle vide ? : Oui
[Allemagne, Canada, États-Unis]
*/
```

### La méthode forEach pour les listes

La méthode **forEach( )** est une méthode dont la syntaxe change par rapport au type de donnée sur lequel elle est appliquée. Dans le case des listes, elle prend en paramètre une fonction et applique cette fonction à tous les éléments de la liste.

Cette fonction prend comme paramètre une variable du même type que les éléments de la liste.

A chaque itération, la fonction sera exécutée avec comme variable un élément de la liste.

Elle se traduit par : **Pour tout élément de la liste, faire ....**

Exemple

```dart
var G7 = [
    "Allemagne",
    "Canada",
    "États-Unis",
    "France",
    "Italie",
    "Japon",
    "Royaume-Uni",
    "Union européenne"
  ];
 G7.forEach((pays)=> print(pays.toUpperCase()));

/*
ALLEMAGNE
CANADA
ÉTATS-UNIS
FRANCE
ITALIE
JAPON
ROYAUME-UNI
UNION EUROPÉENNE
*/
```

## Les ensembles

Les ensembles en Dart illustrent le concept d'ensemble en mathématique c'est a dire des collections non ordonnées d'éléments uniques.

Plus simplement, les ensembles sont des listes de taille modifiable d'éléments uniques.

La principale différence entre les listes et les ensembles est que les ensembles ne contienent jamais plusieurs fois le même élément.

> Contrairement aux listes, les éléments des ensembles se trouvent dans des **accolades { }**.
> Elles ont les même propriétés et les mêmes méthodes que les listes

Exemple

```dart
var nombresPremiers = Set();

  //Set<int> nombresPremiers = {};
  //var nombresPremiers = {}

nombresPremiers.addAll([2, 3, 5, 7, 11, 13, 17, 19, 23]);
print(nombresPremiers.length);
print(nombresPremiers.last);

print("element à l'index 5 : ${nombresPremiers.elementAt(5)}");

nombresPremiers.removeAll([17, 19, 23]);
print(nombresPremiers);

nombresPremiers.addAll([11, 13, 17]);
print(nombresPremiers);

/*
9
23
element à l'index 5 : 13
{2, 3, 5, 7, 11, 13}
{2, 3, 5, 7, 11, 13, 17}
*/
```

Nous pouvons remarquer qu'en faisant **nombresPremiers.addAll( [ 11, 13, 17] )** les éléments **11** et **13** ne sont plus ajoutés à l'ensemble vu qu'ils y sont déjà.

## Les dictionnaires

Les dictionnaires sont des objets qui associent des clés et des valeurs. Les clés et les valeurs peuvent être n'importe quel type de donnée. Chaque clé n'apparaît qu'une seule fois dans le dictionnaire, mais vous pouvez utiliser la même valeur plusieurs fois pour plusieurs clés.

Il y a un nombre fini de clés dans un dictionnaire et chaque clé a exactement une valeur qui lui est associée. Les dictionnaires, ainsi que leurs clés et leurs valeurs, peuvent être itérés.

### Déclaration

Syntaxe

```dart
Map<typeCle, typeValeur> nom = Map();
//ou
Map<typeCle, typeValeur> nom = Map<typeCle, typeValeur>();
//ou
var nom = Map<typeCle, typeValeur>();
//ou
var nom = Map();
```

- **typeCle** est le type de donnée des clés
- **typeValeur** est le type de donnée des valeurs

Exemple

```dart
Map<String, String> paysEtCapitales = Map();
Map utilisateurEtId = Map();
Map<String, dynamic> reponseHttp = Map();
```

### Initialisation

L'initialisation peut être faite à la déclaration ou après la déclaration du dictionnaire.

Syntaxe

```dart
Map<typeCle, typeValeur> nom = Map();
nom = {cle1 : valeur1, cle2 : valeur2};

//ou
Map<typeCle, typeValeur> nom = {cle1 : valeur1, cle2 : valeur2};
```

Exemple

```dart
Map<String, String> paysEtCapitales = Map();
paysEtCapitales = {
    "Afrique du Sud": "Pretoria",
    "Belgique": "Bruxelles",
    "Brésil": "Brasilia",
    "Irak": "Bagdad",
    "Japon": "Tokyo"
};
```

![dictionnaire](/images/dart-base/dictionnaires.png)

### Accéder à un élément

On accède à une valeur par sa clé.

Syntaxe

```dart
nomDictionnaire[clé]
```

Exemple

```dart
Map<String, String> paysEtCapitales = {
    "Afrique du Sud": "Pretoria",
    "Belgique": "Bruxelles",
    "Brésil": "Brasilia",
    "Irak": "Bagdad",
    "Japon": "Tokyo"
  };

print("la capitale du Brésil : ${paysEtCapitales["Brésil"]}");

//la capitale du Brésil : Brasilia
```

Avec l' accès aux valeurs, nous pouvons les modifier.

### Les propriétés

Tout comme les listes et les ensembles, les dictionnaires ont aussi des propriétés.

| Propriétés | Informations                                                                                                |
| :--------: | :---------------------------------------------------------------------------------------------------------- |
|   length   | retourne le nombre d'élément du dictionnaire                                                                |
|    keys    | retourne un itérable des clés du dictionnaire                                                               |
|   values   | retourne un itérable des valeurs du dictionnaire                                                            |
|  isEmpty   | retourne **true** s'il n'y a pas d'éléments dans le dictionnaire et **false** si il y a au moins un élément |

un itérable est une collection de valeurs finies non modifiable.

Les dictionnaires ont les mêmes méthodes que les listes et les ensembles.

### La méthode forEach pour les dictionnaires

Pour les dictionnaires, la méthode **forEach( )** prend en paramètre une fonction qui a deux paramètres. Le premier paramètre désigne la clé et le deuxième désigne la valeur assignée à cette clé.

Exemple

```dart
Map<String, String> paysEtCapitales = {
    "Afrique du Sud": "Pretoria",
    "Belgique": "Bruxelles",
    "Brésil": "Brasilia",
    "Irak": "Bagdad",
    "Japon": "Tokyo"
};

paysEtCapitales.forEach((pays, capitale) =>
      print("pays : ${pays.toUpperCase()}, capitale : $capitale ")
          );


/*
pays : AFRIQUE DU SUD, capitale : Pretoria
pays : BELGIQUE, capitale : Bruxelles
pays : BRÉSIL, capitale : Brasilia
pays : IRAK, capitale : Bagdad
pays : JAPON, capitale : Tokyo
*/
```

## Encore plus

### Les conditions et boucles dans les collections

Il est possible d'intégrer des conditions et des boucles **for** dans les collections.

Dans le cas des conditions, la valeur est ajoutée si la condition est vraie. Pour les listes, il s'inspire du concept de **list comprehension** de certains langages comme Python.

Exemple

```dart
var estAdmin = false;
var permissions = [
    if(estAdmin) 'ROOT',
    'READ',
    'WRITE'
];

print(permissions);

//[READ, WRITE]
```

```dart
List<String> langages = ['Java', 'Dart',
                         'Python', 'Javascript'];

var LANGAGES = [for(var l in langages) '${l.toUpperCase()}'];

print(LANGAGES);

//[JAVA, DART, PYTHON, JAVASCRIPT]
```

### Opérateur spread

Les opérateurs spread fournissent un moyen concis d'insérer plusieurs éléments dans une collection.

Il existe deux types d'opérateurs spread.

- **l' opérateur spread** simple **...** tous les éléments d'une liste dans une autre liste.
- **l' opérateur null-aware spread** . Elle est utilisée dans le cas où l'expression située à droite de l'opérateur spread peut être nulle.

```dart
var langagesInterpretes = ['Python', 'Javascript',
                           'Ruby', 'PHP'];
var langagesCompilees = ['Java', 'C',
                         'C++', 'Objective-C'];

var langages = [
    'Kotlin',
    'Dart',
    ...langagesInterpretes,
    ...langagesCompilees
];

print(langages);

/*
[Kotlin,
 Dart,
 Python,
 Javascript,
 Ruby,
 PHP,
 Java,
 C,
 C++,
 Objective - C]
*/
```

```dart
var langagesInterpretes = null;
var langagesCompilees = ['Java', 'C',
                         'C++', 'Objective-C'];

var langages = [...langagesCompilees, ...?langagesInterpretes];

print(langages);
//[Java, C, C++, Objective-C]
```

> Les collections peuvent contenir d'autres collections.

## Cas des chaînes de caractères

Les chaînes de caractères sont considérées comme des listes.

Elles ont des propriétés en commun avec les listes comme : **length**, **isEmpty**, **isNotEmpty**.

Quelques méthodes qui s'appliquent aux chaînes de caractères

|    Méthodes     |                                                          Actions                                                           |
| :-------------: | :------------------------------------------------------------------------------------------------------------------------: |
| contains(texte) | prend en paramètre en chaîne de caractère et retourne **true** si la chaîne existe dans la chaîne de caractère principale. |
|  toLowerCase()  |                                convertit tous les caractères de cette chaîne en minuscules                                 |
|  toUpperCase()  |                                convertit tous les caractères de cette chaîne en majuscules                                 |
|     trim()      |                retourne la chaîne de caractère en supprimant les espaces au début et à la fin de la chaîne.                |

Pour plus d'information sur les chaînes de caractère, rendez vous sur [la documentation officielle des liste](https://api.dartlang.org/dev/2.0.0-dev.65.0/dart-core/String-class.html)

## Pratique

Programme qui créer une liste des nombres pairs entre 0 et 50.

```dart[paires.dart]
bool estPaire(x) => x % 2 == 0 ? true : false;

void main() {
  var nombrePaires = [];
  for (var i = 2; i <= 50; i++) {
    if (estPaire(i)) nombrePaires.add(i);
  }
  print(nombrePaires);
}
```

```[output]
[2, 4, 6, 8, 10, 12, 14,
16, 18, 20, 22, 24, 26, 28,
30, 32, 34, 36, 38, 40, 42,
44, 46, 48, 50]
```
