---
title: Dart 05 - Les boucles
description: Notion de boucle for, while et do while. Utilisation de break et continue
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
slug: dart-05-les-boucles
---

#

Une boucle est une structure de contrôle destinée à exécuter une portion de code plusieurs fois de suite.

Il existe plusieurs façons de créer une boucle. Quelle que soit la façon dont la boucle est créée, son but principal sera de répéter une portion de code ou une expression un certain nombre donné de fois. Il est préférable qu'une boucle soit finie c'est-à-dire que son exécution s'arrête à un moment donné. On peut aussi avoir des boucles qui s' exécutent à l'infini.

Le fonctionnement des boucles est assez simple. Elles exécutent la l'expression quand la condition est vraie et s' arrêtent quand la condition est fausse.

Il existe plusieurs type de boucles.

- for
- while
- do .... while

> Les boucles peuvent être imbriquées

## Boucle for

Comme toutes les boucles, la boucle **for** permet de répéter une expression un certain nombre de fois.

La boucle **for** est une boucle à pré-condition. Cela veut dire la condition est évaluée avant l' exécution de l'expression. Si cette condition est vraie, la portion de code est exécutée sinon toute la boucle est terminée et le programme continue.

Syntaxe pour écrire une boucle **for**.

```dart
for (initialisation, condition, itération ){
    expression
}
```

Explication

![condition if/else/if](/images/dart-base/for.png)

- **initialisation** spécifie l'initialisation de la boucle. Il permet d'initialiser un compteur qui sera ensuite utilisé dans la boucle.
- **condition** dit si l'expression doit être exécutée. Si elle est vraie **true**, l' expression est exécutée puis l'**itération** est évaluée (s’il en existe une). Si la condition est omise elle est considérée comme vrai **true**. Si la condition est fausse **false** , l’instruction **for** se termine et le contrôle passe à l’instruction suivante du programme.
- **itération** est une expression qui s' exécute à chaque itération de la boucle après l' exécution de la portion de code de la boucle. L' itération est généralement une incrémention ou une décrémentation.

Exemple

```dart
for (var compteur = 1; compteur <= 3 ; compteur++){
    print("la valeur du compteur est $compteur");
}

/* Output
la valeur du compteur est 1
la valeur du compteur est 2
la valeur du compteur est 3
*/
```

Voici comment la boucle for marche dans notre exemple.

Pour commencer l'initialisation **var compteur = 1** est faite. Puis la condition est évaluée. Dans la première itération le compteur étant égal à 1 cette condition est vraie donc l'expression dans la boucle est exécutée avec **compteur = 1**. Ensuite le programme passe à l' itération qui incrémente la valeur du compteur à 2. La condition est encore évaluée. Avec le compteur étant égale à 2 cette condition est vraie donc l'expression dans la boucle est exécutée avec **compteur = 2** et ainsi de suite. Quand le compteur arrive à 4, la condition est évaluée. Elle est fausse (4 n'est pas inferieur ou égale à 3) donc l’instruction **for** se termine .

### Boucle for..in

il existe aussi une boucle **for .. in** en Dart. Elle permet de faire une itération dans une collection **liste, ensemble ou dictionnaire**. la boucle **for .. in** est une boucle de parcours . C'est à dire que la boucle est exécutée sur chacun des éléments d'une collection.

```dart
var langues = ['Francais', 'Anglais', 'Espagnol'];
for (var l in langues){
    print(l);
}

/* Output
Francais
Anglais
Espagnol
*/
```

Cette boucle se traduit par **pour l dans langues afficher l** .

> Nous y reviendrons quand nous parlerons des collections en profondeur.

## Boucle while

Le mot while se traduit par **tant que**. Alors cette boucle s' exécute **tant que sa condition est vraie**.

La boucle while est une boucle à pré-condition. Cela veut dire que la condition est évaluée avant l' exécution de l'expression.

![condition if/else/if](/images/dart-base/while.png)

Syntaxe d'une boucle **while**.

```dart
while (condition) {
    portion de code;
}
```

> Dans certain cas, une boucle while a besoin d'une itération dans le corps de la boucle. L' itération dans une boucle while est très importante car elle permet d' arrêter la boucle à un moment donné.

```dart
int x = 1;
while (x != 5){
    print(x);
    x++;
}
print("La valeur final de x est $x");

/* Output
1
2
3
4
La valeur final de x est 5
*/
```

Dans ce cas , tant que x est différent de 5, les instructions de la boucle sont exécutées. Mais quand x est égal à 5 grâce à l' incrémentation, la boucle se termine et le programme continue.

## Boucle do..while

Cette boucle se traduit par **faire .. tant que**.

La boucle do .. while est une boucle à post-condition. Cela veut dire la condition est évaluée après l' exécution de l'expression.

![condition if/else/if](/images/dart-base/do_while.png)

Syntaxe d'une boucle **do .. while**.

```dart
do {
    portion de code
} while(condition);
```

> Comme la boucle **while** peut avoir besoin d'une itération dans le corps de la boucle pour arrêter la boucle à un moment donné.

Exemple

Reprenons le même exemple que dans la boucle while mais avec la boucle **do .. while** cette fois ci

```dart
int x = 1;
do {
    print(x);
    x++;
}while (x != 5);
print("La valeur final de x est $x");

/* Output
1
2
3
4
La valeur final de x est 5
*/
```

Dans ce cas , les instructions de la boucle sont exécutées puis la condition est évaluée . Quand x est égal à 5 grâce à l' incrémentation, la boucle se termine et le programme continue.

## Break et Continue

### Break

L'instruction **break** termine l'exécution de la boucle **for**, **while** ou **do .. while**.

**break** termine l'exécution de la boucle qui l' **englobe**. C'est à dire la boucle la plus proche dans laquelle elle figure.

Pour l'utiliser , il suffit de la mettre dans la boucle à l'endroit voulu. Généralement elle est utilisée dans une boucle pour arrèter son exécution à une certaine condition.

Example

```dart
for (var i = 1; i <= 10; i++) {
    if (i == 5) {
      break;
    }
    print("La valeur de i est $i");
}

/* Output
La valeur de i est 1
La valeur de i est 2
La valeur de i est 3
La valeur de i est 4
*/
```

Dans le cas où cette boucle ne contient pas la condition **if** et l'expression **break**, l'instruction **print("La valeur de i est $i")** s' exécute 10 fois. Mais avec la condition; quand **i** est égale à 5, **break** termine l'exécution de la boucle.

### Continue

Quand **break** termine l'exécution de la boucle, **continue** passe le contrôle à l'itération suivante. Mais il est important de noter que **continue** passe le contrôle à l'itération suivante en ignorant toutes les instructions restantes dans le corps de la boucle ou de la condition.

Exemple

```dart
for (var i = 1; i <= 10; i++) {
    if (i == 5) {
      continue;
      print("Expression ignorée");
    }
    print("La valeur de i est $i");
 }

/* Output
La valeur de i est 1
La valeur de i est 2
La valeur de i est 3
La valeur de i est 4
La valeur de i est 6
La valeur de i est 7
La valeur de i est 8
La valeur de i est 9
La valeur de i est 10
*/
```

Il est simple de remarquer que dans ce cas l'instruction **print("Expression ignorée")** est ignorée.

L'inspecteur de code du langage Dart appelle cette instruction **un code mort**.

---

## Pratique

Ecrire un programme qui affiche "Dart est cool." 5 fois avec toutes les boucles.

```dart[for.dart]
main() {
  for (var i = 0; i < 5; i++) {
    print("Dart est cool.");
  }
}
```

```dart[while.dart]
main() {
  var i = 0;
  while (i != 5) {
    print("Dart est cool.");
    i++;
  }
}
```

```dart[do-while.dart]
main() {
  var i = 0;
  do {
    print("Dart est cool.");
    i++;
  }while (i != 5);
}
```

Les trois programmes produisent le même resultat

```[output]
Dart est cool.
Dart est cool.
Dart est cool.
Dart est cool.
Dart est cool.
```

Ecrire les programmes pour dessiner les figures suivantes avec des étoiles (**\***):

- un rectangle de 8 étoiles de long et 5 étoiles de large
- un carré de 6 étoiles de coté
- un triangle équilatéral de 7 étoiles de coté

> la méthode **stdout.write()** permet d' écrire sur la même ligne. Pour l'utiliser, importez la librairie **io** de Dart en faisant **import 'dart:io'** au début de votre programme. Cette méthode prend entre parenthèse la message à afficher.

un rectangle de 8 étoiles de long et 5 étoiles de large

```dart[rectangle.dart]
import 'dart:io';

main() {
  for (var i = 0; i < 5; i++) {
    for(var i = 0; i < 8; i++){
        stdout.write("* ");
    }
    stdout.write("\n");
  }
}
```

```[output]
* * * * * * * *
* * * * * * * *
* * * * * * * *
* * * * * * * *
* * * * * * * *
```

un carré de 6 étoiles de coté

```dart[carre.dart]
import 'dart:io';

main() {
  for (var i = 0; i < 6; i++) {
    for(var i = 0; i < 6; i++){
        stdout.write("* ");
    }
    stdout.write("\n");
  }
}
```

```[output]
* * * * * *
* * * * * *
* * * * * *
* * * * * *
* * * * * *
* * * * * *
```

un triangle équilatéral de 7 étoiles de coté

```dart[triangle.dart]
import 'dart:io';

main()
{
    int i, j, cote;
    cote = 7;
    for(i=1; i<=cote; ++i)
    {
        for(j=1; j<=i; ++j)
        {
            stdout.write("* ");
        }
        stdout.write("\n");
    }
    return 0;
}
```

```[output]
*
* *
* * *
* * * *
* * * * *
* * * * * *
* * * * * * *
```
