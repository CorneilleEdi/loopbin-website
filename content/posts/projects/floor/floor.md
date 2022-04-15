---
title: Application de note avec Floor
description: Application de todo list avec sauvegarde dans une base de données SQlite grâce au package Floor (La branche Provider utilise le package Provider pour la gestion des états)
tags: [dart, flutter, open-source]
topics: [dart, flutter]
date: 2020-01-19
slug: application-de-note-avec-floor
---

<action-button type="github" text="Floor task sur Github" link="https://github.com/CorneilleEdi/floor_task"></action-button>

Application de note avec sauvegarde dans une base de données SQlite grâce au package Floor (La branche Provider utilise le package Provider pour la gestion des états).
Le packae Floor est une extension du package SQFlite de Flutter.

<action-button type="package" text="Package Floor" link="https://pub.dev/packages/floor"></action-button>

La bibliothèque Floor fournit un code SQL léger avec une abstraction et un mappage automatique entre les objets en mémoire et les lignes de la base de données, tout en offrant un contrôle total de la base de données à l'aide de SQL.

Il est important de noter que cette bibliothèque n'est pas un ORM complet comme Hibernate et ne le sera jamais. Donc, c'est intentionnel.

## Les fonctionalitées:

- Lister toutes les notes
- Ajouter une note
- Editer un note
- Supprimer un note
- Supprimer toutes les notes

## Captures d'écrans

|              Liste              | Dialogue pour ajouter une note |   Dialogue pour editer une note   |
| :-----------------------------: | :----------------------------: | :-------------------------------: |
| ![list](/images/floor/main.png) | ![list](/images/floor/add.png) | ![list](/images/floor/update.png) |

```dart[task.dart]
@entity
class Task {
  @PrimaryKey(autoGenerate: true)
  final int id;

  String title;

  final int createdTime;
}
```

Ce code défini le model de la table **Task** dans la base de données

```dart[task_dao.dart]

@dao
abstract class TaskDao {
  @Query('SELECT * FROM task WHERE id = :id')
  Future<Task> findTaskById(int id);

  @Query('SELECT * FROM task')
  Future<List<Task>> findAllTasks();

  @Query('SELECT * FROM task')
  Stream<List<Task>> findAllTasksAsStream();

  @insert
  Future<void> insertTask(Task task);

  @update
  Future<void> updateTask(Task task);

  @delete
  Future<void> deleteTask(Task task);

  @Query('DELETE FROM task')
  Future<void> deleteAllTask();
}

```
