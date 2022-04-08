---
title: Le package SweetSheet pour Flutter
description: Utiliser SweetSheet pour afficher rapidement et facilement un bottom sheet de confirmation.
tags: [flutter, dart, ui]
topics: [dart, flutter]
date: 2020-06-01
---

#

<table>
<tr>
<td>
<img src="/images/sweet_sheet_package/nice_sheet.jpg" alt="">
</td>
<td>
<img src="/images/sweet_sheet_package/warning_sheet.jpg" alt="">
</td>
</tr>
</table>

<action-button type="package" text="Package SweetSheet" link="https://pub.dev/packages/sweetsheet"></action-button>

Le package **sweetsheet** permet d'utiliser des bottom sheets comme dialogues de confirmation.
C'est le premier package que j'ai officiellement créer et publier.

Nous allons voir comment l'utiliser.

## Comment l'installer

Ajoutez ceci au fichier pubspec.yaml de votre projet:

```yaml
dependencies:
  sweetsheet: ^0.2.0
```

et rafraîchissez les dépendances du projet en faisant la commande :

```shell
$ flutter pub get
```

## Comment l'utiliser

la première étape consiste à importer le package dans le fichier dans lequel vous souhaitez l'utiliser.

```dart
import 'package:sweetsheet/sweetsheet.dart';
```

Parce que SweetSheet est une classe, nous devons créer une instance de cette classe.

```dart
final SweetSheet _sweetSheet = SweetSheet();
```

Vous pouvez maintenant afficher votre bottom sheet en appelant la méthode **show()** sur l'instance.

Voici la signature de la méthode **show()**

```dart
show({
  @required BuildContext context,
  Text title,
  @required Text description,
  @required CustomSheetColor color,
  @required SweetSheetAction positive,
  SweetSheetAction negative,
  IconData icon,
}){}
```

On peut remarquer que l'argument `positive` est obligatoire.
Positive et negative sont des actions qui viennent avec le package.

Voici la signature du widget **SweetSheetAction**:

```dart
class SweetSheetAction extends StatelessWidget {
  final String title;
  final VoidCallback onPressed;
  final IconData icon;
  final Color color;

  SweetSheetAction({
    @required this.title,
    @required this.onPressed,
    this.icon,
    this.color = Colors.white,
  });
}
```

Le **SweetSheetColor** est une classe qui a quatre valeurs static et qui détermine la couleur en creant des instances de **CustomSheetColor**:

- SweetSheetColor.SUCCESS (vert)
- SweetSheetColor.DANGER (rouge)
- SweetSheetColor.WARNING (orange)
- SweetSheetColor.NICE (bleu)

> Attention: Au moins une action est requise et les icônes sont **IconData** pour garder l'uniformité.

---

## Customisation

<table>
<tr>
<td>
<img src="/images/sweet_sheet_package/black.jpg" alt="">
</td>
<td>
<img src="/images/sweet_sheet_package/light.jpg" alt="">
</td>
</tr>
</table>

Pour personnaliser, créez une nouvelle instance de **CustomSheetColor** et passez-la à l'argument **color** lors de l'appel de la méthode **show()**.

signature de **CustomSheetColor**:

```dart
class CustomSheetColor {
  Color main;
  Color accent;
  Color icon;

  CustomSheetColor({@required this.main, @required this.accent, this.icon});
}
```

Pour personnaliser l'action, passez une nouvel valeur à l'argument **color** de **SweetSheetAction**.

---

## Exemple

<action-button type="github" text="Exemple sur Github" link="https://github.com/CorneilleEdi/sweetsheet/tree/master/example"></action-button>

### Warning

```dart
_sweetSheet.show(
    context: context,
    title: Text("Attention"),
    description: Text(
        'Your app is not connected to internet actually, please turn on Wifi/Celullar data.'),
    color: SweetSheetColor.WARNING,
    icon: Icons.portable_wifi_off,
    positive: SweetSheetAction(
      onPressed: () {
        Navigator.of(context).pop();
      },
      title: 'OPEN SETTING',
      icon: Icons.open_in_new,
    ),
    negative: SweetSheetAction(
      onPressed: () {
        Navigator.of(context).pop();
      },
      title: 'CANCEL',
    ),
);

```

### Custom Light

```dart
_sweetSheet.show(
    context: context,
    description: Text(
      'Place your order. Please confirm the placement of your order : Iphone X 128GB',
      style: TextStyle(color: Color(0xff2D3748)),
    ),
    color: CustomSheetColor(
      main: Colors.white,
      accent: Color(0xff5A67D8),
      icon: Color(0xff5A67D8),
    ),
    icon: Icons.local_shipping,
    positive: SweetSheetAction(
      onPressed: () {
        Navigator.of(context).pop();
      },
      title: 'CONTINUE',
    ),
    negative: SweetSheetAction(
      onPressed: () {
        Navigator.of(context).pop();
      },
      title: 'CANCEL',
  ),
);
```

> Le package SweetSheet est un projet **open-source** alors n'hésitez pas à y contribuer.

<action-button type="github" text="Code source de SweetSheet" link="https://github.com/CorneilleEdi/sweetsheet"></action-button>
