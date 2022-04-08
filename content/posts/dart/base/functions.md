---
title: Dart 07 - Les fonctions
description: Les fonctions en Dart, leurs syntaxes et les différents types de paramètres
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

## Table of Contents

##

Une fonction est un bloc de code qui effectue une tâche spécifique. Au lieu d'écrire le code complet autant de fois que nécessaire, on crée une fonction que l’on appellera pour l'exécuter, ce qui peut aussi alléger le code, le rendre plus lisible. Les fonctions permettent de diviser le problème que veut résoudre le code en plusieurs parties indépendantes ou interdépendantes.

Une fonction contient des déclarations et des instructions et ces déclarations composent le corps de la fonction.

Il existe deux types de fonction dans la programmation en Dart:

- **Fonctions de la bibliothèque standard** .Ce sont des fonctions intégrées à la programmation en Dart permettant de gérer des tâches telles que les calculs mathématiques, le traitement des Entrée / Sortie, la gestion des chaînes de caractères, etc. Un exemple d'une fonction de la bibliothèque standard est la fonction **print** .
- **Fonctions définies par l'utilisateur** .Ce sont des fonctions conçues par le programmeur afin de résoudre des tâches spécifiques.

Dans ce chapitre nous allons étudier

- les propriétés des fonctions
- la syntaxe de base des fonctions
- les paramètres obligatoires
- les paramètres optionnels de position
- les paramètres optionnels nommés
- les paramètres optionnels nommés par défaut
- la syntaxe arrow

---

## Les propriétés des fonctions

Les fonctions ont deux propriétés principales

- **arguments** ou **paramètres** qui sont les informations fournies à la fonction
- **résultat** qui est les informations renvoyées par la fonction

Avant de créer une fonction, il est indispensable de penser d'abord à ces deux propriétés.

## la syntaxe de base des fonctions

Depuis le début de notre étude du langage Dart, nous utilisons certaines fonctions préconçues du langage comme la fonction **print** qui nous permet d' afficher un message dans la console.

Mais comment définit-on une fonction ?

```dart
type_de_retour nom_de_la_fonction (parametres) {
	//corps de la fonction
}
```

- **nom_de_la_fonction**. Chaque fonction a un nom. Ce nom servira plus tard au moment de l'appelle de cette fonction. Le nom de la fonction doit refléter la tâche de cette fonction.
- **paramètres** sont les informations fournies à la fonction.
- **type_de_retour**. Si il existe, le type de retour est de type de donnée du résultat que la fonction retour à la fin de son exécution. Quand une fonction ne retourne aucune valeur, la fonction retourne implicitement la valeur **null**.Quand une fonction ne retourne aucune valeur, on peut définir son type de retour comme étant **void**.
- **le corps de la fonction** est la partie de la fonction qui comporte les instructions à exécuter à l'appel de la fonction. Elle définit la tâche que la fonction fait.

> La spécification du type de retour d'une fonction n'est pas obligatoire.

> Une fonction définie par l'utilisateur est toujours définie hors de la fonction principale **main**.

Exemple

```dart
void affichage(){
	print("cool 😎, j'aime bien les fonctions");
}
```

Cette fonction a pour nom **affichage**. Elle n'a aucun paramètre et ne retourne aucune valeur(donc son type de retour peut être défini comme étant le type void). Sa tâche est d'afficher le message **cool😎, j'aime bien les fonctions**.

```dart
afficherNom(String nom){
    print("Votre nom est $nom");
}
```

Comme vous l'auriez deviné, Cette fonction a pour nom **afficherNom**. Elle prend en paramètre une chaîne de caractères appelée **nom** et ne retourne aucune valeur. Sa tâche est d'afficher le message **Votre nom est $nom** en utilisant le nom passé comme argument dans le message à afficher.

```dart
double square(double nombre){
    var carré = nombre * nombre;
    return carré;
}
```

Dans ce cas, le nom de la fonction est **square**. Elle a pour type de retour le type **double**. Elle prend en paramètre un nombre décimal nommé **nombre** et retourne son carré. Sa tâche est de calculer le carré du nombre qui lui a été passé comme argument en le multipliant par lui même et de retourner le résultat de ce calcul.

Une fonction peut avoir plusieurs paramètres.

Pour utiliser une fonction , il suffit de l' appeler. la syntaxe d'appelle d'une fonction est très simple.

```dart
nom_de_la_fonction (parametres);
```

On appelle la fonction par son nom et on lui passe les paramètres qu'il faut.

> La définition du type de donnée du paramètre n'est pas obligatoire au moment de la définition de la fonction.

Exemple

```dart
main() {
  affichage();
  afficherNom("Elon musk");
}

affichage() {
  print("cool 😎, j'aime bien les fonctions");
}

afficherNom(String nom) {
  print("Votre nom est $nom");
}


/* Output
cool 😎, j'aime bien les fonctions
Votre nom est Elon musk
*/

```

Si la fonction retourne une valeur, cette valeur peut être assignée à une variable.

```dart
main() {
  int x = 25;
  int y = 9;
  //assignation de la valeur retourné a une variable maximum
  var maximum = max(x, y);
  print("le maximum entre $x et $y est $maximum");
}

int max(x,y){
  return x > y ? x : y;
}

//Output
//le maximum entre 25 et 9 est 25
```

Dans le langage Dart, les paramètres ne peuvent être que de deux types

- les paramètres obligatoires
- les paramètres optionnels

---

## les paramètres obligatoires

Comme nous l'avions vu précédemment, nous pouvons définir les données à passer à une fonction. Ces données sont ensuite utilisées dans la fonctions pour exécuter certaines tâches.

Nous pouvons passer plusieurs paramètres à une fonction.

Les paramètres obligatoires sont des paramètres qui sont obligatoires au fonctionnement de la fonction. En effet, si un de ces paramètres n'est pas passé comme argument à l'appel de la fonction le programme ne s'exécutera pas.

A l'appel de cette fonction, nous passons les arguments en **ordre** à la position où ils ont été définis.

Si la position d'un argument au moment de l'appel de la fonction est fausse, elle peut causer une erreur pendant l' exécution ou un mauvais fonctionnement de la fonction.

> Il est alors primordial de passer les arguments en ordre.

```dart
// à la declaration
type_de_retour func(type1 parametre1,type2 parametre2, ....,typeN  parametreN){

}

// à l'appelle
func(type1 parametre1,type2 parametre2, ....,typeN  parametreN);
```

Exemple

```dart
information(String pays, String capital, int population) {
  print("pays : $pays");
  print("capital : $capital");
  print("nombre d'habitants : $population");
}

main() {
  information("France", "Paris", 67795000);
}

/*
pays : France
capital : Paris
nombre d'habitants : 67795000
*/
```

---

## Paramètres optionnels

Les paramètres optionnels sont des paramètres qui peuvent être définis ou pas lors de l'appel de la fonction.

Il existe trois (3) type de paramètre optionnels.

- les paramètres optionnels de position
- les paramètres optionnels nommés
- les paramètres optionnels nommés par défaut

### les paramètres optionnels de position

Ce sont des paramètres qui peuvent être omis au moment de l'appel de la fonction en ne mettant rien à sa position.

Pour définir un paramètre comme étant optionnel, il suffit de le mettre entre des **crochets [ ]**.

Il est important de vérifier la disponibilité d'un paramètre optionnel de position avant de l'utiliser. Pour cela on peut utiliser une condition **if** pour vérifier si le paramètre est non nul avant de l'utiliser.
Sans cela , le programme se terminera par une erreur durant l' exécution parce que vous essayez d'utiliser une valeur qui n'existe pas.

Exemple

Sans les paramètres optionnels

```dart
information(String pays, String capital, [int population]) {
  print("pays : $pays");
  print("capital : $capital");

  if(population != null){
    print("nombre d'habitants : $population");
  }

}

main() {
  information("Inde", "New Delhi");
}

/* Output
pays : Inde
capital : New Delhi
*/
```

Avec les paramètres optionnels

```dart
information(String pays, String capital, [int population]) {
  print("pays : $pays");
  print("capital : $capital");

  if(population != null){
    print("nombre d'habitants : $population");
  }

}

main() {
  information("Inde", "New Delhi", 1296834042);
}

/* Output
pays : Inde
capital : New Delhi
nombre d'habitants : 1296834042
*/
```

### les paramètres optionnels nommés

Cette méthode permet de forcer l'utilisation du nom du paramètre optionnel à l'appel de la fonction.

Pour définir un paramètre optionnel nommé il suffit de déclarer ces paramètres entre **des accolades { }**.

Syntaxe

```dart
// à la déclaration
type_de_retour nom_de_la_fonction (type1 param1, type2 param2,
      {type3 param3, type4 param4}){

    //corps de la fonction
}

// à l'appelle
nom_de_la_fonction (param1, param2, param3 : valeur3);
//dans ce cas, nous passons seulement le parametre 3
//vu que le parametre 3 et 4 sont optionnels
```

Exemple

Reprenons notre exemple précédent.

```dart
information(String pays, String capital, {int population}) {
  print("pays : $pays");
  print("capital : $capital");

  if(population != null){
    print("nombre d'habitants : $population");
  }

}

main() {
  information("Inde", "New Delhi", population : 1296834042);
}

/* Output
pays : Inde
capital : New Delhi
nombre d'habitants : 1296834042
*/
```

```dart
information(String societe, String fondateur,
            {String fondateur2, int effectif }) {
  print("societe : $societe");
  print("fondateur : $fondateur");

  if(fondateur2 != null){
    print("deuxieme fondateur : $fondateur2");
  }

  if(effectif != null){
    print("effectif : $effectif");
  }
}

main() {
  information("Microsoft", "Bill Gates",
              fondateur2 : "Paul Allen", effectif : 131300);
}

/* Output
societe : Microsoft
fondateur : Bill Gates
deuxieme fondateur : Paul Allen
effectif : 131300
*/
```

### les paramètres optionnels nommés par défaut

Il est possible de donner des valeurs par défaut aux paramètres d'une fonction. Cette méthode permet d'avoir une valeur par défaut pour un paramètre au cas où cette valeur ne serait pas redéfinie.

> Cette méthode supprime l'étape de la vérification de la disponibilité d'un paramètre optionnel avant de l'utiliser.

Exemple

```dart
information(String societe, String fondateur, {String fondateur2 = "Paul Allen", int effectif }) {
  print("societe : $societe");
  print("fondateur : $fondateur");
  print("deuxieme fondateur : $fondateur2");


  if(effectif != null){
    print("effectif : $effectif");
  }
}

main() {
  information("Microsoft", "Bill Gates",  effectif : 131300);
}

/* Output
societe : Microsoft
fondateur : Bill Gates
deuxieme fondateur : Paul Allen
effectif : 131300
*/
```

Dans cet exemple, une valeur par défaut **Paul Allen** a été assignée au paramètre optionnel nommé **fondateur2**.

Il est tout à fait possible de redéfinir ce paramètre optionnel nommé par défaut en lui passant une valeur à l'appel.

Exemple

```dart
information(String societe, String fondateur,
            String fondateur2="Paul Allen", int effectif }) {
              print("societe : $societe");
              print("fondateur : $fondateur");

              if(fondateur2 != null){
                print("deuxieme fondateur : $fondateur2");
              }

              if(effectif != null){
                print("effectif : $effectif");
              }
}

main() {
  information("Microsoft", "Bill Gates",
  effectif : 131300, fondateur2 : "Steve Jobs");
}

/* Output
societe : Microsoft
fondateur : Bill Gates
deuxieme fondateur : Steve Jobs
effectif : 131300
*/
```

Dans ce cas le paramètre optionnel nommé par défaut **fondateur2** devient **Steve Jobs**.

> Avec les paramètres optionnels nommés le respect de l'ordre de passage de ces paramètres optionnels n'est plus obligatoire.

> Cette méthode est très utilisée dans le Framework **Flutter**. Elle permet de définir certaines propriétés d'un composant par défaut.

## Syntaxe arrow

La syntaxe arrow ou syntaxe flèche est une syntaxe particulière permettant de définir une fonction. En effet quand la fonction qu'on veut définir n' exécute qu'**une seule instruction** dans son corps il est possible d'utiliser la syntaxe flèche.

Si la seule instruction de la fonction est le retour d'une valeur, le mot clé **return** n'est plus utilisé

> Ce type de fonction est aussi appelé **fonction lambda** dans certains langage.

Syntaxe

```dart
type_de_retour nom_de_la_fonction(parametre) => instruction
```

Exemple

Syntaxe simple

```dart
int max(x,y){
  return x > y ? x : y;
}
```

Syntaxe arrow

```dart
int max (x, y) => x > y ? x : y;
```

```dart
int max (x, y) => x > y ? x : y;

main() {
  int x = 25;
  int y = 9;
  //assignation de la valeur retourné a une variable maximum
  var maximum = max(x, y);
  print("le maximum entre $x et $y est $maximum");
}

//Output
//le maximum entre 25 et 9 est 25
```

## Encore plus

Il est possible de passer une fonction comme argument à une autre fonction.

Exemple

```dart
main() {
  List maListe = [for (var i = 1; i <= 10; i++) i];
  List maListeAuCaree = appliquerFonction(maListe, square);

  print('liste : $maListe');
  print('liste au carree : $maListeAuCaree');
}

appliquerFonction(List liste, Function fun) {
  List nouvelleListe = [];
  for (var nombre in liste) {
    nouvelleListe.add(fun(nombre));
  }

  return nouvelleListe;
}

square(x) => x * x;

/*Output

liste : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
liste au carree : [1, 4, 9, 16, 25,
                  36, 49, 64, 81, 100]
*/
```

Dans ce programme, nous créons deux fonctions **square** et **appliquerFonction**.
**square** est une fonction qui calcule et retourne le caré de la valeur qui lui est passée en paramètre.
**appliquerFonction** prend en paramètre une liste et une fonction et retourne une nouvelle liste. Cette nouvelle liste contient les résultats de l'application de la fonction **square** sur tous les élements de la liste passée en paramètre.

**Function** est le type de donnée de toutes les fonctions.

---

## Pratique

Ecrire une fonction qui affiche tous les éléments de la liste qui lui est passée en paramètre

```dart:title=listes.dart
affichageListe(liste){
  for(var element in liste){
    print(element);
  }
}

main() {
  List<String> societes;
  societes = ["Amazon", "Apple", "Samsung", "Microsof",
              "ASUS", "DELL", "GOOGLE"];
  affichageListe(societes);
}
```

```:title=output
Amazon
Apple
Samsung
Microsof
ASUS
DELL
GOOGLE
```

Ecrire une fonction qui retourne le factoriel de l'entier positif qui lui est passé en paramètre

```dart:title=factoriel.dart
void main() {
  int z = 5;
  int resultat = fact(z);
  print("le factoriel de $z est $resultat");
}

int fact(int nombre) {
  int factoriel = 1;

  for (var i = 1; i <= nombre; ++i) {
    factoriel *= i;
  }

  return factoriel;
}
```

```:title=output
le factoriel de 5 est 120
```
