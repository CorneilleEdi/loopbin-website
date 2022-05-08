---
title: Utiliser les événements avec MongoDB
description: Mettre en place un système de Caching automatique avec MongoDB et Redis
tags: [mongodb, redis, nestjs]
topics: [mongodb, redis]
date: 2022-05-08
slug: utiliser-les-evenements-avec-mongodb
---

Pour mettre en place un système événementiel, il faut bien sûr des événements 😂. Dans une approche sans événements, si on aimerais faire du caching, on devrais mettre nos opérations ensemble (opération dans la db primaire + opération dans la cache) ou utiliser un worker avec une queue de messagerie.

Dans ce post, nous allons mettre en place un système de caching avec MongoDB comme base de données principale et Redis comme base de données de cache. La partie la plus intéressante est que nous allons utiliser les événements renvoyés par MongoDB à chaque fois qu’une opération est faite.

Nous utiliserons NestJS comme framework, mais le code sera assez simple pour être compréhensible avec ou sans des connaissances préliminaires du framework.

Cet article est un simple aperçu. Nous explorerons le sujet de ChangeStream plus en profondeur plus tard.

<action-button type="github" text="Code sur Github" link="https://github.com/CorneilleEdi/mongodb-redis-cache"></action-button>


## Les événements avec MongoDB

Comme plusieurs autres bases de données, MongoDB offre un ensemble d’événements qui se lancent quand des opérations se font dans la base de données.

Ces événements retournent des informations en rapport avec l’opération effectué qui peuvent être utilisé pour faire d’autres taches comme du caching.

Voici une liste des types d’événements disponible

L’observation des flux de changement est une opération qui peut être interrompue ou reprise (on en discutera dans un autre article.).

## Application

Notre application est un simple API de CRUD. Cette application est la même utilisé dans l’article sur les tests intégrations avec TestContainers.
<post-item-with-id slug="nestjs-facilitez-les-tests-dintegration-plus-simplement-avec-docker-et-testcontainers"></post-item-with-id>

## Mise en place

Les flux de modifications ne s'exécutent que dans des réplicas ou sharded cluster.

Pour cela, nous allons transformer notre base de données en réplica avec un seul nœud.

> Dans MongoDB, un jeu de répliques est une collection de serveurs. Le serveur principal est l'un de ces ordinateurs. Les serveurs secondaires sont les serveurs restants. Les opérations d'écriture sont gérées par le serveur primaire. Les actions sont également appliquées sur les serveurs secondaires. En d'autres termes, les données sont répliquées sur le serveur principal. L'objectif principal de la réplication est d'assurer la redondance et la haute disponibilité des données.
>

Nous allons trouver le fichier de configuration de mongodb sur notre machine et la modifié. Sur Linux, il se trouve sous `/etc/mongodb.conf`

1- Ajoutez les détails du jeu de réplicas suivants au fichier mongodb.conf

```json
replication:
      replSetName: "<nom du jeu de répliques>"
```

2- Lancer le jeu de répliques

Pour cela, il suffit de se connecter a mongodb en ligne de commande et taper la commande

```jsx
rs.initiate()
```

Le résultat ressemblera à ceci

```bash
> rs.initiate()
{
    "info2" : "no configuration specified. Using a default configuration for the set",
    "me" : "127.0.0.1:27017",
    "ok" : 1
}
```

Et c’est bon.

## Code

À partir de là, il ne nous reste plus qu'à écouter la collection qui nous intéresse et à réagir aux événements. Nous voulons faire les choses suivantes selon les événements :

- insert: lorsqu'un document est inséré, nous voulons récupérer le document à partir des informations sur l'événement et ajouter ce document au cache.
- update: lorsqu'un document est mis à jour, nous souhaitons récupérer le document à partir des informations sur l'événement, récupérer l'identifiant du document et remplacer le champ mis à jour dans le cache.
- delete: lorsqu'un document est supprimé, on veut récupérer l'identifiant et supprimer dans le cache l'entrée correspondante.

Nous allons commencer par regarder la collection `quote`

```typescript
this.changeStream = quotesRepository.getModel().collection.watch();
```

Maintenant que nous avons le flux de modifications, nous pouvons écouter les modifications et réagir en fonction des types d'opérations.

```typescript
this.changeStream.on('change', async (event) => {
      const documentId = event.documentKey._id.toString();

      switch (event.operationType) {
        case 'insert':
          await this.onDocumentInserted(documentId, event.fullDocument);
          break;

        case 'update':
          await this.onDocumentUpdated(documentId, event.updateDescription);
          break;

        case 'delete':
          await this.onDocumentDeleted(documentId);
          break;
        default:
          this.logger.warn('Event listener operation not supported');
      }
    });
```

Voici les opérations à chaque événements:

Insertion

```typescript
async onDocumentInserted(documentId: string, document: any) {
    const doc = this.quotesMapper.quoteDocumentToQuote(document);

    try {
      await this.redisRepository.add(doc);
    } catch (e) {
      this.logger.error('Cache insertion error', e);
    }
  }
```

Mise à jour

```typescript
async onDocumentUpdated(documentId: string, updatedDocument: UpdateDescription<QuoteDocument>) {
    try {
      const oldDocument = await this.redisRepository.get(documentId);

      if (!oldDocument) throw new Error('Document not found');

      const quote: Quote = {
        ...oldDocument,
        ...updatedDocument.updatedFields,
      };
      await this.redisRepository.update(quote);
    } catch (e) {
      this.logger.error('Cache update error', e);
    }
  }
```

Suppression

```typescript
async onDocumentDeleted(documentId: string) {
    try {
      await this.redisRepository.delete(documentId);
    } catch (e) {
      this.logger.error('Cache deletion error', e);
    }
  }
```

Et voila.

## Bonus

Nous pouvons fermer le changestream quand nous le voulons. dans notre cas, nous le fermerons lorsque notre application sera sur le point d'être fermée.

```typescript
@Injectable()
export class QuotesEventsListenerService {
private readonly changeStream: ChangeStream;
  ....

  async closeChangeStream() {
    await this.changeStream.close();
  }
}
```

```typescript
export class QuotesModule implements OnApplicationShutdown {
  constructor(private readonly listenerService: QuotesEventsListenerService) {}

  async onApplicationShutdown(signal?: string): any {
    try {
     await this.listenerService.closeChangeStream();
    } catch (e) {}
  }
}
```
