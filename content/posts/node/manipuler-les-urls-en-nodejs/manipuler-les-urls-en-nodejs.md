---
title: Manipuler les URLs en NodeJs
description: Construire et extraire des informtions des URLs en Javascript
tags: [javascript, nodejs, network, web]
topics: [nodejs]
date: 2021-01-16
slug: manipuler-les-urls-en-nodejs
---

Il est fréquent que dans votre code vous soyez appelé à créer une URL.

Bien sûr vu que l’URL est une chaîne de caractère vous pouvez simplement essayer de concaténer les données afin d’avoir votre URL comme ceci

Mais à moins que vous soyez suicidaire, la plupart des langages de programmation viennent avec une librairie url qui vous permettra de créer ou de décoder une URL.

Dans ce tuto, nous allons explorer le module URL inclut dans NodeJs par défaut.

<action-button type="github" text="Code sur Github" link="https://github.com/CorneilleEdi/loopbin-tutos/tree/main/manipuler-les-urls-en-nodejs"></action-button>

> Le module url est un module inclut le défaut dans vous n’avez pas besoin de l’installer

## Décodage ou extraction d’information

Le première chose serait d’avoir une URL à décoder 😅. Dans ce cas , nous allons travailler avec les urls suivantes:

```js
https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation
```

```js
mongo://corneille:verniselle@localhost:27017/utilisateur?authDB=admin
```

Le deuxième url (une URI) est une url fréquemment utilisée pour se connecter à des serveurs spéciaux comme les bases de données. Elle contient l’URL ainsi que les données de connexions comme le nom d’utilisateur et le mot de passe d’authentification.

Nous allons utiliser la méthode standard supportée par les navigateurs pour manipuler les URL.

Pour commencer, je vais passer l'URL comme constructeur pour que les informations puissent être extraites.

```js
const url = new URL(
  'https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation'
)
```

Si l'url n'est pas valide, ce code retournera un TypeError TypeError [ERR_INVALID_URL]: Invalid URL.

notre variable url est maintenant du type URL ce qui nous permet de pouvoir appeler plusieur méthodes et avoir accès à plusieurs informations comme

- hash (le signet)
- host (le host)
- hostname (le nom de domaine)
- pathname (le chemin)
- href (l'url)
- origin (le nom de domaine complet)
- username (le nom d'utilisateur pour l'authentification)
- password (le mot de passe pour l'authentification)
- port (le port du service)
- protocol (le protocol de connexion)
- search (toute la partie des données de requête )
- searchParams (un objet de type URLSearchParams regroupant toutes les données de requête )

En jetant un coup d'oeil à la variable url, nous constatons que nous avons

```js
URL {
  href: 'https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation',
  origin: 'https://www.loopbin.dev',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.loopbin.dev',
  hostname: 'www.loopbin.dev',
  port: '',
  pathname: '/tutos/redis',
  search: '?dark=true&type=short',
  searchParams: URLSearchParams { 'dark' => 'true', 'type' => 'short' },
  hash: '#installation'
}
```

A ce point , nous pouvons facilement accéder au information avec les accesseurs

```js
const url = new URL(
  'https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation'
)
console.log(url.protocol)
console.log(url.host)
console.log(url.pathname)
console.log(url.search)
```

```js
https:
www.loopbin.dev
/tutos/redis
?dark=true&type=short
```

## Construire une URL

Nous allons maintenant construire une URL en écrivant du code. Cette approche débute comme la précédente. Il nous faut un url de base (un nom de domaine et un protocole pour que l'url de base ne soit pas considérée comme invalide ).

```js
const url = new URL('mongo://localhost:27017')

console.log(url)
```

```js
URL {
  href: 'mongo://localhost:27017',
  origin: 'null',
  protocol: 'mongo:',
  username: '',
  password: '',
  host: 'localhost:27017',
  hostname: 'localhost',
  port: '27017',
  pathname: '',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
```

A ce point nous pouvons pas à pas construire notre url

```js
mongo://corneille:verniselle@localhost:27017/utilisateur?authDB=admin
```

```js
const url = new URL('mongo://localhost:27017')

url.username = 'corneille'
url.password = 'verniselle'
url.pathname = '/utilisateur'
url.searchParams.append('authDB', 'admin')

console.log(url.href)
```

Le résultat

```js
mongo://corneille:verniselle@localhost:27017/utilisateur?authDB=admin&authDB=admin
```
