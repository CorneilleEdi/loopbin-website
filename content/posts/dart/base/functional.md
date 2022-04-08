---
title: Dart 11 - Map, Where, Reduce
description: L'utilisation de Map, Where, Reduce, Every en Dart
tags: [dart, dart-base]
topics: [dart]
date: 2020-01-01
---

## Table of Contents

##

Les méthodes **Map, Where, Reduce et d'autres** sont des méthodes qui s'appliquent aux collections en Dart. Elles permettent de passer à la programmation fonctionnelle en Dart.

Elle permettent de faire des actions sur des collections. Ces méthodes sont des outils vraiment puissants qui accélèrent le développent et qui permettent d'avoir un code concis et performant.

---

## Map

La méthode **map** est semblable à la méthode **forEach** qui s'applique sur les listes.

- **forEach ( )** - exécute une fonction fournie une fois pour chaque élément du tableau.
- **map ( )** - crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.

Exemple

```dart
main() {
  var nombre = [for(var i=0; i<10;i++) i];
  var square = [];

  nombre.forEach((int number) => square.add(number*2));

  print(square);
}

//[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

```dart
main() {
  var nombre = [for(var i=0; i<10;i++) i];

  var square = nombre.map((int number) =>number*2);

  print(square);
}
//(0, 2, 4, 6, 8, 10, 12, 14, 16, 18)
```

> Nous pouvons remarquer que la collection retourner est un itérable. Il est important, pour avoir le retour de type liste de convertir le résultat en liste.

---

## Where

**Where ()** crée un nouveau tableau avec les éléments du tableau principal qui respecte un critère donné. Elle est semblable à la méthode **filter ( )** existant dans d'autres langages comme le Javascript.

```dart
main() {
  var nombre = [for (var i = 0; i <= 30; i++) i];

  var paires = nombre.where((int number) => number % 2 == 0);

  print(paires);
}

//(0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30)
```

---

## Reduce

Elle compresse ou réduit les éléments en une seule valeur, en utilisant la fonction donnée.

```dart
main() {
  var nombre = [for (var i = 0; i <= 10; i++) i];

  var paires = nombre.reduce((sum, number)=> sum + number);

  print(paires);
}
//55
```

La fonction qui est passée à **reduce ( )** prend deux variables du même type que les éléments de la liste en paramètres. La première variable est l'accumulateur et la deuxième variable est l' itérateur qui représentera à chaque itération un élément de la liste.

---

## Every

Retourne **true** si tous les éléments de la liste vérifient une condition donnée

```dart
main() {


  List<Map<String, dynamic>> users = [
    {"first_name": "Betsy", "age": 16},
    {"first_name": "Tamarra", "age": 19},
    {"first_name": "Kimble", "age": 25},
    {"first_name": "Lita", "age": 28},
    {"first_name": "Nanci", "age": 21}
  ];

  var result1 = users.every((user) => user["age"] >= 18);
  var result2 = users.every((user) => user["age"] >= 16);


  print(result1); // false
  print(result2); //true
}
```

**result1** est **false** parce que l' âge de tous les éléments de la liste n'est pas supérieur à 18.

---

## Pratique

Avec les données suivantes, veuillez répondre aux questions suivantes:

- Quelle est le nombre d' employés dans cette liste ?
- Quelles sont les compagnies de cette liste ?
- Quelle est l' âge minimum et l' âge maximum des employés de cette liste ?
- Créer une nouvelle liste ne contenant que le nom des employés dont l' âge dépasse 30 ans

```json:title=donées
[{
  "nom": "Wallie Colisbe",
  "age": 33,
  "compagnie": "Rhycero"
}, {
  "nom": "Laughton Neath",
  "age": 38,
  "compagnie": "Brainverse"
}, {
  "nom": "Dinah Worsnip",
  "age": 29,
  "compagnie": "Edgepulse"
}, {
  "nom": "Elizabet Henkmann",
  "age": 31,
  "compagnie": "Oyonder"
}, {
  "nom": "Chrisse Gribbell",
  "age": 35,
  "compagnie": "Jabberbean"
}, {
  "nom": "Madella Massey",
  "age": 30,
  "compagnie": "Jazzy"
}, {
  "nom": "Blithe Coppins",
  "age": 36,
  "compagnie": "Edgeify"
}, {
  "nom": "Emmalynn Fitzroy",
  "age": 31,
  "compagnie": "Shuffletag"
}, {
  "nom": "Fred Meldrum",
  "age": 22,
  "compagnie": "Zoomzone"
}, {
  "nom": "Ophelia Stilgoe",
  "age": 25,
  "compagnie": "Vimbo"
}, {
  "nom": "Gustavus Challiner",
  "age": 34,
  "compagnie": "Skinix"
}, {
  "nom": "Annette Allans",
  "age": 26,
  "compagnie": "Leexo"
}, {
  "nom": "Allard Dunbleton",
  "age": 39,
  "compagnie": "Realcube"
}, {
  "nom": "Gonzalo Kobelt",
  "age": 25,
  "compagnie": "Zoombox"
}, {
  "nom": "Heda Candey",
  "age": 26,
  "compagnie": "Plajo"
}]
```

```dart:title=employees.dart
void main() {
  List<Map<String, dynamic>> employees = [{
  "nom": "Wallie Colisbe",
  "age": 33,
  "compagnie": "Rhycero"
    }, {
      "nom": "Laughton Neath",
      "age": 38,
      "compagnie": "Brainverse"
    }, {
      "nom": "Dinah Worsnip",
      "age": 29,
      "compagnie": "Edgepulse"
    }, {
      "nom": "Elizabet Henkmann",
      "age": 31,
      "compagnie": "Oyonder"
    }, {
      "nom": "Chrisse Gribbell",
      "age": 35,
      "compagnie": "Jabberbean"
    }, {
      "nom": "Madella Massey",
      "age": 30,
      "compagnie": "Jazzy"
    }, {
      "nom": "Blithe Coppins",
      "age": 36,
      "compagnie": "Edgeify"
    }, {
      "nom": "Emmalynn Fitzroy",
      "age": 31,
      "compagnie": "Shuffletag"
    }, {
      "nom": "Fred Meldrum",
      "age": 22,
      "compagnie": "Zoomzone"
    }, {
      "nom": "Ophelia Stilgoe",
      "age": 25,
      "compagnie": "Vimbo"
    }, {
      "nom": "Gustavus Challiner",
      "age": 34,
      "compagnie": "Skinix"
    }, {
      "nom": "Annette Allans",
      "age": 26,
      "compagnie": "Leexo"
    }, {
      "nom": "Allard Dunbleton",
      "age": 39,
      "compagnie": "Realcube"
    }, {
      "nom": "Gonzalo Kobelt",
      "age": 25,
      "compagnie": "Zoombox"
    }, {
      "nom": "Heda Candey",
      "age": 26,
      "compagnie": "Plajo"
    }];

  print('nombre d\' employees : ${employees.length}');

  var compagnies = employees.map(
        (employee) => employee['compagnie']
    ).toList();

  var ages = employees.map(
        (employee) => employee['age']
    ).toList();

  var sup = employees.where(
    (employee) => employee['age'] > 30
    );

  var sup_name = sup.map((s) => s['nom']).toList();

  print('Listes des compagnies : $compagnies');

  print('max des ages : ${max(ages)}');

  print('min des ages : ${min(ages)}');

  print('liste des employees sont l\'age depasse 30 : $sup_name');

}


max(liste) {
  var maximum = 0;

  for (var element in liste) {
    if (element > maximum) maximum = element;
  }
  return maximum;
}

min(liste) {
  var minimum = liste[0];

  for (var element in liste) {
    if (element < minimum) minimum = element;
  }
  return minimum;
}

```

```:title=output
nombre d'employees : 15
Listes des compagnies : [Rhycero, Brainverse,
			Edgepulse, Oyonder, Jabberbean, Jazzy, Edgeify,
			Shuffletag, Zoomzone, Vimbo,
			Skinix, Leexo, Realcube, Zoombox, Plajo]
max des ages : 39
min des ages : 22
liste des employees sont l'age depasse 30 : [Wallie Colisbe,
		Laughton Neath, Elizabet Henkmann,
		Chrisse Gribbell, Blithe Coppins,
		Emmalynn Fitzroy, Gustavus Challiner,
		Allard Dunbleton]
```
