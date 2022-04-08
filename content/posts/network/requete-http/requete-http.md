---
title: Les requêtes HTTP
description: C'est quoi les requêtes HTTP?
tags: [network, web]
topics: [network]
date: 2021-08-20
---

Si il existe une notion à connaître en temps que développeur frontend, backend ou mobile c’est celle des requêtes HTTP. Sans elle, l’internet que nous connaissons aujourd’hui serait totalement différente.

Dans cet article, nous allons explorer les requêtes HTTP, leur composition ainsi que les terminologies et verbes a connaître.

Prenons le scénario ou un utilisateur aimerais accéder à son compte Facebook. L’utilisateur en question prend son ordinateur, ouvre un navigateur et tape facebook.com et par magie la page de Facebook apparaît. Mais qu’est-ce qui s’est vraiment passé? Pour faire court, le navigateur a envoyé une requête HTTP aux serveurs de Facebook qui lui ont répondu avec une page web, celle de Facebook.com.

Si cette explication vous semble simple c’est parceque elle l’est. La notion de requêtes HTTP est simple de nature. J’envoie une `REQUÊTE` et je reçois une `RÉPONSE`.

mais c’est quoi une requête? C’est quoi une réponse? De quoi sont-elles composées?

## HTTP

HTTP veut dire HyperText Transfert Protocole. C’est une façon pour plusieurs entités de communiquer.

## Requête HTTP

C’est un protocole ce qui veut dire qu’il définit des standards à suivre. Chaque requête HTTP est composé de 5 parties.

- Version de HTTP
- L’URL
- une méthode HTTP (method)
- En-têtes de requête HTTP (headers)
- Corps HTTP (body)

### Version de HTTP

Comme tout en informatique, le protocole HTTP aussi à plusieurs versions: 1,2 et 3. Et bien sûr chaque version ont des itérations: 1.3,1.4.

Heureusement pour nous, ces versions gardent tous plusieurs similarités.

### URL

Ah oui, bien sûr qu’il va falloir préciser la ressource que nous voulons contacter avec notre requête. Exemple: api.google.com/user

Pour plus d’informations sur les URLs, veuillez lire mon article à propos de ce sujet. [C'est quoi une URL web?](https://loopbin.dev/tutos/c-est-quoi-une-url-web/)

```
https://jsonplaceholder.typicode.com/todos/
```

### Méthode HTTP

Une méthode ou verbe HTTP spécifie l'action que la requête HTTP souhaite que le serveur demandé entreprenne. Il en existe plusieurs (9+) avec des rôles différents :

`GET`,`POST`,`PUT`,`PATCH`,`DELETE`,`OPTION`,`TRACE`,`HEAD`, `CONNECT`. Les 6 premiers cité étant les plus utilisé.

**Exemple de signification**

`GET` doit seulement demander des données

`POST` est utilisé pour soumettre des données comme par exemple l’émail et le mot de passe durant une authentification

`DELETE` est employé pour supprimer la ressource spécifiée

### En-têtes de requête HTTP (headers)

Les en-têtes HTTP contiennent des informations textuelles stockées dans des paires clé-valeur, et ils sont inclus dans chaque requête HTTP (et réponse, nous y reviendrons plus tard). Ces en-têtes communiquent des informations essentielles, telles que le navigateur utilisé par le client, des clés 🔑 d’authentification, la version de la requêtes demandée et même des informations que le serveur a enregistré dans le navigateur de l’utilisateur (cookies)

**Exemple**

- `Origin`: l’URL de laquelle est produite la requête
- `Content-Type` : Indique le type de média (text/html ou text/JSON) de la réponse envoyée au client par le serveur, cela aidera le client à traiter correctement le corps de la réponse.
- `Cache-Control` : Il s'agit de la politique de cache définie par le serveur pour cette réponse, une réponse mise en cache peut être stockée par le client et réutilisée jusqu'à l'heure définie par l'en-tête Cache-Control.
- `Authorization` : porte les informations d'identification contenant les informations d'authentification du client pour la ressource demandée.

```
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
access-control-allow-origin: https://www.ibm.com
cache-control: no-cache, no-store, max-age=0, must-revalidate
content-language: en-US
content-length: 26
content-type: application/json
date: Fri, 20 Aug 2021 03:10:36 GMT
expires: 0
p3p: CP="NON CUR OTPi OUR NOR UNI"
server-timing: cdn-cache; desc=MISS
server-timing: edge; dur=208
server-timing: origin; dur=82
strict-transport-security: max-age=31536000; includeSubDomains
x-backside-transport: OK OK
x-content-type-options: nosniff
x-correlation-id: CORR_ID-19279ac0-d059-4397-8012-a6d17521143c
x-frame-options: SAMEORIGIN
x-global-transaction-id: 0853aeae611f1d2cf44810e1
x-ua-compatible: IE=edge
x-xss-protection: 1; mode=block
```

### Cors de le requête (body)

Elle est facultative. Le corps d'une requête HTTP contient toutes les informations soumises au serveur Web, telles que une image a uploader, un nom d'utilisateur et un mot de passe, ou toute autre donnée a envoyé à un serveur.

## Réponse HTTP

Chaque requête HTTP de la part d’un client est généralement suivi d’une réponse HTTP de la part de la ressource contacté (un serveur web).

Une réponse est composée de:

- Un code d'état HTTP (status code)
- En-têtes de réponse HTTP (headers)
- Corps HTTP (body)

Le corps et l’entête suivent les mêmes principes que celle d’une requête HTTP. Le corps d’une requête HTTP peut être un code HTML (pour une page html) ou des données encodés sous un format precis. Les codes d'état HTTP sont des codes à 3 chiffres utilisés pour indiquer si une requête HTTP a été effectuée avec succès ou pas. Les codes d'état sont répartis dans les 5 blocs suivants :

- 1xx Informationnel
- 2xx Succès
- Redirection 3xx
- Erreur client 4xx
- Erreur de serveur 5xx

**Exemple**:

le code 200 veut dire que la requête a été effectuée avec succès.

404: la ressources demandé n’a pas été trouvé

400: mauvaise requête

## Mécanisme

![requêtes HTTP](/images/requete-http/http-request.png)

## Cas d’utilisation

Tout ceci c’est bien mais qu’est-ce qu’on fait avec les requêtes HTTP?

Un exemple simple serait les navigateurs. Tous les navigateurs sont juste des logiciels qui font des requêtes HTTP et affiches le résultat.

Les applications mobiles sont aussi de bon exemple d’utilisateur de l’approche HTTP. Par exemple, l’application mobile de Twitter se charge de communiquer avec les serveurs de Twitter à l’aide de requêtes HTTP.
