---
title: NestJS -  Facilitez les tests d’intégration avec Docker et TestContainers
description: Configurer facilement les tests d'intégration à l'aide de testcontainers et de Docker
tags: [nest, docker, tests]
topics: [nestjs, docker]
date: 2022-05-05
slug: nestjs-facilitez-les-tests-dintegration-plus-simplement-avec-docker-et-testcontainers
---

Parfois, nous essayons de tester nos systèmes avec une vraie base de données. Ceci est une pratique normale et fait partie des tests d'intégration.

Dans ce tuto d’introduction, nous verrons comment mettre en place un environnement de test grâce à Docker. Oui docker seulement.

L’application qui sera utilisée est un simple API CRUD qui utilise MongoDB comme base de données.

## la logic

Durant les tests, la base de données utilisée pour le test ne doit être utilisée que pour ce test pendant le test. Ensuite, il peut être effacé et utilisé pour un autre essai. Par conséquent, nous avons besoin de bases de données dédiées aux tests. Dans un cas pareil, quoi de mieux que des conteneurs ? Facile à mettre en place et éphémère de nature.

Pour nous faciliter la tâche nous allons utiliser TestContainer. TestContainer est une librairie qui nous permet de créer et de gérer des conteneurs Docker depuis notre code.
C’est comme les librairies Docker disponibles dans presque tous les
langages populaires mais en plus puissants et simples à utiliser.Dans
notre cas, avec TestContainer nous pourrons lancer un conteneur basé
sur l’image docker de MongoDB afin de faciliter la mise en place de notre environnement de test.

TestContainer est disponible dans plusieurs langages essentiellement Java, NodeJS, Python, Go et plus.

> TestContainers est une bibliothèque qui prend en charge les tests, fournissant des instances légères et jetables de bases de données communes, de navigateurs Web Selenium ou de tout ce qui peut s'exécuter dans un conteneur Docker.
>

Si TestContainers peut faire tourner tout genre de conteneurs sans souci alors nous pouvons aller plus loin que les bases de données. Nous pouvons lancer des composants externes comme des émulateurs de service Cloud (Google Cloud, AWS), des applications de caching (Redis, MemCacheD), des messages brokers (RabbitMQ, Kafka) et plus.

## Installation

Installer TestContainer dans un projet NodeJs est aussi simple que lancer la commande

```bash
npm install -D testcontainers
```

et c’est tout. Tout ce qui reste à faire maintenant, c’est configurer notre conteneur et nous pourrons ensuite passer aux tests.

## Création et configuration

Pour créer un conteneur et suffit de créer une instance la classe `GenericContainer` et lui passer l’image de base du conteneur en paramètre.

```jsx
const container = await new GenericContainer("mongo:5.0")
```

Nous pouvons de là configurer notre conteneur générique (en utilisant une syntaxe qui ressemble au patron de conception Builder).

Pour spécifier les configurations du conteneur, il existe plusieurs méthodes.

![set configs](/images/nest/test-containers/set-config-methods.png)

```typescript
container = await new GenericContainer('mongo:5.0')
      .withExposedPorts(MONGODB_PORT)
      .withEnv('MONGO_INITDB_ROOT_USERNAME', MONGODB_USERNAME)
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', MONGODB_PASSWORD)
```

Dans cet exemple, nous spécifions les variables d’environnement à passer au conteneur avec `withEnv` ainsi que le port qu'expose le conteneur avec `withExposedPorts`. Le port du conteneur sera mappé à un port aléatoire sur la machine que nous pourrions récupérer avec des méthodes sur `container`.Bien sûr, il ne faut pas oublier de lancer le conteneur avec `start()`.

```typescript
container = await new GenericContainer('mongo:5.0')
      .withExposedPorts(MONGODB_PORT)
      .withEnv('MONGO_INITDB_ROOT_USERNAME', MONGODB_USERNAME)
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', MONGODB_PASSWORD)
      .start()
```


Maintenant  que notre conteneur `container` de test est lancé, nous pouvons nous y connecter. On peut récupérer des attributs comme le `host`, le port mappé sur la machine a un certain port et plus.

![get propieties](/images/nest/test-containers/get-config-methods.png)

Donc pour mettre en place le module  `@nestjs/mongoose` dans la création du module de test, nous pouvons récupérer ces informations venant du conteneur.

```tsx
beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const host = container.getHost();
            const port = container.getMappedPort(MONGODB_PORT);
            return {
              uri: `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${host}:${port}`,
            };
          },
        }),
        MongooseModule.forFeature([
          { name: QuoteEntity.name, schema: QuoteSchema, collection: 'quotes' },
        ]),
      ],
      providers: [QuotesMapper, QuotesRepository],
    }).compile();

    repository = module.get<QuotesRepository>(QuotesRepository);
  });
```

## Tests

Nous avons maintenant une base de données en place pour nos tests. C’est le moment d’écrire de vrais tests.

```tsx
it('findAll to return empty array', async () => {
    const quotes = await repository.findAll();
    expect(quotes).toEqual([]);
  });

  it('insert should return inserted quote', async () => {
    const quoteToInsert = {
      content: faker.lorem.sentence(),
      author: faker.name.findName(),
    };
    const insertedQuote = await repository.create(quoteToInsert);

    expect(insertedQuote.id).toBeDefined();
    expect(insertedQuote.content).toEqual(quoteToInsert.content);
    expect(insertedQuote.author).toEqual(quoteToInsert.author);
  });
```

Il est important de ne pas oublier de terminer le conteneur de test à la fin de nos tests avec `stop()`.

```tsx
afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
});
```

## Avantages et inconvénients

### Avantages

- Testez avec presque tous les composants tiers: vu que test container fait tourner les conteneurs Docker, on peut presque tout lancer comme conteneur de test (du moment où il existe une image du service tiers)
- Testez par rapport à des composants authentiques, qui ressemblent (ou sont exactement semblables) aux composants qui seront utilisés en production.
- Pas besoin de se connecter à un service tiers en ligne (dans notre cas un service comme MongoDB Atlas)
- Pas besoin de configurer des environnements de test compliqués. Tout ce qu’il faut, c’est Docker

### inconvénients

- Étant donné que les conteneurs sont lancés pendant le test, cela peut prendre du temps et allonger le temps de test.
- Jouer avec de nombreux conteneurs pour les tests peut consommer beaucoup de ressources.

## Plus

- TestContainer peut aussi supporter des environnements [Docker Compose](https://github.com/testcontainers/testcontainers-node#docker-compose)
- Il existe des modules qui peuvent simplifier la mise en place des conteneurs de test
- TestContainers est disponible dans plusieurs langages (java,go, python, rust, scala) et marche avec plusieurs framework


<action-button type="github" text="Code sur Github" link="https://github.com/CorneilleEdi/mongodb-redis-cache"></action-button>


