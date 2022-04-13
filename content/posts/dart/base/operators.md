---
title: Dart 03 - Les opérateurs en Dart
description: Les opérateurs et leurs significations en Dart
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
slug: dart-03-les-operateurs-en-dart
---

#

> En [programmation informatique](https://fr.wikipedia.org/wiki/Programmation_informatique), un **opérateur** est une [fonction](<https://fr.wikipedia.org/wiki/Fonction_(informatique)>) spéciale dont l'[identificateur](https://fr.wikipedia.org/wiki/Identificateur) s'écrit généralement avec des caractères non autorisés pour l'identificateur des fonctions ordinaires. Il s'agit souvent des équivalents aux [opérateurs mathématiques](https://fr.wikipedia.org/wiki/Opérateurs_mathématiques) pour un [langage de programmation](https://fr.wikipedia.org/wiki/Langage_de_programmation). Les opérateurs peuvent effectuer des opérations arithmétiques, booléennes ou agir sur des [chaînes de caractères](https://fr.wikipedia.org/wiki/Chaînes_de_caractères). Contrairement aux fonctions, les opérateurs fournissent souvent les opérations primitives du langage. Leur nom est constitué de caractères symboles ou de ponctuation. La terminologie varie néanmoins de langage en langage. Wikipédia

Les opérateurs permettent de manipuler de façon mathématique des valeurs souvent par le biais de la variable à laquelle elles sont assignées.

En Dart (Ainsi que dans plusieurs autres langages de programmation comme Java, C , C++, Kotlin ...) , il existe plusieurs types d'operateurs .

- Opérateurs arithmétiques
- Égalité et opérateurs relationnels
- Expressions conditionnelles
- Opérateurs logiques
- Opérateurs de test de type
- Opérateurs d'assignation
- Opérateurs de bits et de décalage

Nous allons nous concentrer sur certains d'entre eux.

> Attention aux types des variables

## Opérateurs arithmétiques

Les opérateurs arithmétiques sont utilisés pour faire des opérations arithmétiques sur des valeurs. La syntaxe pour faire ces opérations est assez simple. Voici un tableau récapitulatif des opérateurs arithmétiques et leurs explications.

> Les règles de priorités des operateurs sont les même qu'en mathématique.

| Operateurs |                  Explications                  |
| :--------: | :--------------------------------------------: |
|     +      |                    Addition                    |
|     -      |                  Soustraction                  |
|     \*     |                 Multiplication                 |
|     /      |                    Division                    |
|     ~/     | Division qui retourne comme résultat un entier |
|     %      |   modulo (retourne le reste de la division)    |
| ++variable |  variable = variable + 1 (pré incrémentation)  |
| variable++ | variable = variable + 1 (post incrémentation)  |
| --variable |  variable = variable - 1 (pré décrémentation)  |
| variable-- | variable = variable - 1 (post décrémentation)  |

```dart
var x = 12;
var y = 25;
int sum  = x + y;
int sous = x - y;
double pourcentage = (x / y) * 100;
```

### La pré et la post incrémentation ou décrémentation:

En situation de pré incrémentation, l'opération d' incrémentation est exécutée ensuite les méthodes ou fonctions de la même ligne (s'il y en a) sont appliquées avant de passer à la ligne suivante.

```dart
var x = 12;
print(++x); // 13
print(x); //13
```

Dans ce cas, l' incrémentation sur la deuxième ligne **( 12 + 1 )** est faite puis la valeur est affichée ( **print(13)** ) dans la console et au final la ligne suivant est exécutée ( **print(13)** ).

Dans le cas d'une post incrémentation, l' opération d' incrémentation est exécutée après que toutes les méthodes ou fonctions de la même ligne (s'il y en a) ne sont appliqués avant de passer à la ligne suivant.

Donc on aura dans l'ordre : **print( 12 )** , **12 + 1** et **print( 13 )**.

Les même règles s'appliquent dans le cas d'une décrémentation.

## Égalité et opérateurs relationnels

Les opérateurs relationnels et d’égalité comparent leur premier opérande à leur second opérande pour tester la validité de la relation spécifiée. Le résultat d'une expression relationnelle est **true** si la relation testée a la valeur true et **false** si elle a la valeur false. Le type du résultat est **bool**.

| Opérateur |                    Relation testée                    |
| :-------: | :---------------------------------------------------: |
|     <     |     Premier opérande inférieur au second opérande     |
|     >     |     Premier opérande supérieur au second opérande     |
|    <=     | Premier opérande inférieur ou égal au second opérande |
|    >=     | Premier opérande supérieur ou égal au second opérande |
|    ==     |       Premier opérande égal au second opérande        |
|    !=     |     Premier opérande différent du second opérande     |

```dart
int ageRequis = 24;
int monAge = 19;
print(monAge >= ageRequis); //false
```

## Expressions conditionnelles

Dart a deux opérateurs qui vous permettent d'évaluer de manière concise des expressions qui pourraient sinon nécessiter des instructions si-ou:

- **condition? expression1 : expression2** (opérateur ternaire)
  Si la condition est vraie, évalue expression1 (et renvoie sa valeur); sinon, évalue et renvoie la valeur de expression2.
- **expression1 ?? expression2**
  Si expression1 est non nul, retourne sa valeur; sinon, évalue et renvoie la valeur de expression2

```dart
bool reussi = false;
int nombreDeParticipant = 20;
int nombre = ( reussi == true ) ? ( ++nombreDeParticipant ) : ( --nombreDeParticipant );
print(nombre); //19
```

Dans ce cas, la condition **réussie est égal à true** est fausse donc le programme choisi la deuxième expression **--nombreDeParticipant** qui est une pré décrémentation de nombreDeParticipant ( 20 -1 ). Ensuite la réponse de l' évaluation de la deuxième expression soit 19 est passée comme valeur à la variable **nombre**.

```dart
var nom = null;
var username = nom ?? 'Utilisateur X';
print(username); // Utilisateur X
```

Dans ce cas, la première expression **nom** est nulle donc le programme choisit la deuxième expression **'Utilisateur X'** . Ensuite la deuxième expression soit **'Utilisateur X'** est passée comme valeur à la variable **username**.

## Opérateurs logiques

<p>Les opérateurs logiques effectuent des opérations de ET logique <strong>&&</strong>  , de OU logique <strong>||</strong> et d'inversion <strong>!</strong> généralement sur des expressions booléennes.</p>

|   x   |   y   | x && y | x \|\| y |  !x   |  !y   |
| :---: | :---: | :----: | :------: | :---: | :---: |
| true  | true  |  true  |   true   | false | false |
| true  | false | false  |   true   | false | true  |
| false | true  | false  |   true   | true  | false |
| false | false | false  |  false   | true  | true  |

```dart
int x = 100;
int y = 103;
var resultat = !(( x < 123 ) && (y > 123));
print(resultat); // true
```

Explication :

```dart
x < 123  est vrai donc le résultat est true

y > 123 est faux donc le résultat est false

( x < 123 ) && (y > 123) soit true et false ce qui donne false

! ( ( x < 123 ) && ( y  > 123)) soit inversion de false
ce qui donne comme résultat true
```

## Opérateurs de test de type

En Dart, les opérateurs **as**, **is** et **is!** sont utilisés pour tester le type d'une variable. Si la condition est exacte , elle retourne **true** sinon **false** est retourné.

| Opérateurs |                               Explications                               |
| :--------: | :----------------------------------------------------------------------: |
|     as     |                     utilisé comme opérateur de type.                     |
|     is     |  première expression est du même type que la deuxième expression(objet)  |
|    is!     | première expression n'est du même type que la deuxième expression(objet) |

```dart
var x = 12;
var y = 'OK';
print(x is int); //true
print(y is String); //true
print(x is double); //false
```

> Nous parlerons de l'opérateurs **as** plus tard.

## Opérateurs d'assignation

Les operateurs d'assignation permettent ,comme leur nom l'indique, d'assigner une valeur à une variable.

Cette assignation peut se faire après quelques opérations dans certains cas. Les plus communs sont :

| Operateurs |   Significations   |
| :--------: | :----------------: |
|     =      | assigne une valeur |
|   a –= 1   |     a = a - 1      |
|   a += 1   |     a = a + 1      |
|  a \*= 2   |     a = a \* 2     |
|   a /= 2   |     a = a / 2      |
|   a %= 2   |     a = a % 2      |

```dart
double x = 12;
print(x –= 1);//11.0
print(x += 1);//12.0
print(x *= 2);//24.0
print(x /= 2);//12.0
print(x %= 2);//0.0
```

---

## Pratique

Quelle seraient les résultats de ces opérations ?

```dart[operators.dart]
main() {
  var operation1 = '13/2 = ${13 ~/ 2} r ${13 % 2}';

  var x = 'OK';
  int y = 10;

  var res = !((x == 'ok') && (y > 12));

  var operation2 = (res == true) ? null : y *= 2;

  print(operation1);
  print(res);
  print(operation2);
}
```

```[output]
13/2 = 6 r 1
true
null
```
