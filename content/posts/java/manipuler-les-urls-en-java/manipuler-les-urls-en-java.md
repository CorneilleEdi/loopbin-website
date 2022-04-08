---
title: Manipuler les  URLs en Java
description: Construire et extraire des informtions des URLs en Java
tags: [java, network, web]
topics: [java]
date: 2021-01-16
---

Java ainsi que plusieurs autres langages de programmation comme le Javascript ou Dart contient une librairie qui permet aux programmeurs de jouer avec les urls. Dans ce tuto, nous allons explorer les méthodes offertes par le langage pour extraire les informations d'une url ainsi que générer une URL.

<action-button type="github" text="Code sur Github" link="https://github.com/CorneilleEdi/loopbin-tutos/tree/main/manipuler-les-urls-en-java"></action-button>

Dans java , il existe deux classes en Java pour interagir avec les URLs:

- la classe URL de java.net.URL
- la classe URL de java.net.URI

## Extraction de donnée ou décodage

### Avec la classe URL

Contrairement à la classe URL en Javascript, celle de Java donne assez peu d'informations sur l'URL qu'elle reçoit en paramètre.

```java
URL url = new URL("https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation");
```

Le code si dessus retourne une erreur MalformedURLException si l'URL passé en parametre n'est pas valide ou bien formattée. Il seraint judicieux d'anticiper l'erreur

```java
try {
    URL url = new URL("https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation");
} catch (MalformedURLException e) {
    e.printStackTrace();
}
```

Il est important d'importer la classe URL

```java
import java.net.URL
```

A ce point , nous avons seulement accès au informations suivantes

- protocole avec getProtocol()
- le nom de domaine avec getAuthority()
- le host avec getHost()
- le port avec getPort()
- le chemin avec getPath()
- les données de requêtes (query) avec getQuery()
- le chemin complet (query inclus) avec getFile()
- le signet (ou le hash) avec getRef()

```java
import java.netURL;
import java.net.MalformedURLException;

public class Decoder {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://www.loopbin.dev/tutos/redis?dark=true&type=short#installation");

            System.out.println("protocole = " + url.getProtocol());
            System.out.println("domaine = " + url.getAuthority());
            System.out.println("host = " + url.getHost());
            System.out.println("port = " + url.getPort());
            System.out.println("chemin = " + url.getPath());
            System.out.println("query = " + url.getQuery());
            System.out.println("cheminComplet = " + url.getFile());
            System.out.println("hash = " + url.getRef());

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
}
```

```js
protocole = https
domaine = www.loopbin.dev
host = www.loopbin.dev
port = -1
chemin = /tutos/redis
query = dark=true&type=short
cheminComplet = /tutos/redis?dark=true&type=short
hash = installation
```

La classe URL est très très limitée. Elle ne supporte pas les URI comme par exemple

```
redis://johndoe:fenty762@www.redislabs.com?db=0
```

Pour aller loin, il existe la classe URI.

### Avec la classe URI

La classe URI peut permettre d'avoir encore plus d'informations sur l'URI ou l'URL passée comme constructeur.

> Dans le cas de l'URI, l'erreur dans le cas d'une malformation est l'erreur URISyntaxException

<action-button type="doc" text="Documentation de la classe URI" link="https://docs.oracle.com/javase/8/docs/api/java/net/URI.html"></action-button>

```java
import java.net.URISyntaxException;
import java.net.URI;

public class Decoder {
    public static void main(String[] args) {
        try {
            URI uri = new URI("mongo://corneille:verniselle@localhost:27017/utilisateur?authDB=admin&db=0");

            System.out.println("protocole = " + uri.getScheme());
            System.out.println("host = " + uri.getHost());
            System.out.println("port = " + uri.getPort());
            System.out.println("chemin = " + uri.getPath());
            System.out.println("query = " + uri.getQuery());
            System.out.println("information d'authentification = " + uri.getUserInfo());

        } catch ( URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
```

```bash
protocole = mongo
host = localhost
port = 27017
chemin = /utilisateur
query = authDB=admin&db=0
information d'authentification = corneille:verniselle
```

## Construire une URL

<action-button type="doc" text="Exemple officiel" link="https://docs.oracle.com/javase/tutorial/networking/urls/creatingUrls.html"></action-button>

### Avec la classe URL

Comme vous l'aurez surement deviner, la classe URL est aussi assez limiter dans la creation d'une URL

```java
import java.net.MalformedURLException;
import java.net.URL;

public class Encoder {
    public static void main(String[] args) {
        try {
            String protocol = "https";
            String host = "loopbin.dev";
            String file = "/tutos/redis";
            int port = 80;
            URL url = new URL(protocol, host, port, file);

            System.out.println(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
}
```

> la classe URL peut prendre un nombres différentes de valeurs comme constructeur

### Avec la classe URI

Dans ce cas aussi , la classe URI nous permet de faire plus que la classe URL

```java
import java.net.URI;
import java.net.URISyntaxException;

public class Encoder {
    public static void main(String[] args) {
        try {

            String protocol = "mongodb";
            String host = "localhost";
            int port = -1;
            String path = "/utilisateur";
            String auth = "corneille:vermiselle";
            String fragment = "installation";
            String query = "authDb=admin";
            URI uri = new URI(protocol, auth, host, port, path, query, fragment);

            System.out.println(uri);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
```

```js
mongodb://corneille:vermiselle@localhost:0/utilisateur?authDb=admin#installation
```

Remarquer que le port est à -1 dans ce cas, ce qui indique au constructeur d'ignorer le port dans l'uri final. Une autre valeur plus grande que 0 sera considérée comme le port et une valeur plus petite que -1 provoquera une erreur.

Pour ignorer les autres détails, il suffit de passer des nulles à la place des valeurs.

---

## Plus

Même avec les classes URL et URI, la manipulation des URL/URI en java peut être un peut limiter pour vos besoins. Heureusement il existe plusieurs librairies externes qui offrent des alternatives plus fonctionnelles.

### OKHTTP

**`https://square.github.io/okhttp/`**

OkHttp est un client HTTP efficace par défaut:

La prise en charge HTTP / 2 permet à toutes les requêtes adressées au même hôte de partager un socket.
Le regroupement de connexions réduit la latence des requêtes (si HTTP / 2 n'est pas disponible).
Transparent GZIP réduit la taille des téléchargements.
La mise en cache des réponses évite complètement le réseau pour les demandes répétées.

<action-button type="package" text="Librairie OkHTTP" link="https://square.github.io/okhttp/"></action-button>

Exemple

```java
HttpUrl url = new HttpUrl.Builder()
    .scheme("https")
    .host("www.google.com")
    .addPathSegment("search")
    .addQueryParameter("q", "polar bears")
    .build();
System.out.println(url);
```

### Apache client

**`https://hc.apache.org/httpcomponents-client-4.3.x/quickstart.html`**

<action-button type="package" text="Librairie Apache client" link="https://hc.apache.org/httpcomponents-client-4.3.x/quickstart.html"></action-button>

---

N'hésitez pas à jeter un coup d'oeil aux test unitaire sur github

<action-button type="github" text="Test unitaire" link="https://github.com/CorneilleEdi/loopbin-tutos/blob/main/manipuler-les-urls-en-java/src/test/java/EncodeurTest.java"></action-button>
