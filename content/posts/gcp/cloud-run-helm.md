---
title: Déployer sur Cloud Run grâce Helm
description: "Générer les configurations de déploiement d'un service sur Cloud Run avec Helm"
tags: [gcp, helm, docker]
topics: [gcp, helm, docker]
date: 2023-07-22
slug: deployer-sur-cloud-run-grace-helm
---

Le but de cet article est simple : répondre à la question “Cloud Run, Knative, Helm ?”. Oui, je me suis posé la question comme ça. Est-ce qu’on peut déployer un service sur Cloud Run avec une chart Helm ? Bien sûr qu’on peut le faire avec les outils comme Terraform, mais dans cet article, on le fera à l'aide d'un fichier de configuration généré par une charte Helm.

Pourquoi ? Parce que c’est possible. Et bien sûr, ça serait très utile pour des organisations qui utilisent déjà Helm et qui aimerait définir des configurations par défaut pour les services Cloud Run déployés dans leur périmètre.

Dans cette première partie, nous allons mettre en place tout le machinisme localement. Dans une deuxième partie, on utilisera Google Cloud Artefact Repository pour héberger notre charte et Cloud Build pour déployer automatiquement notre service sur Cloud Run.

## Logic

- Créer une charte Helm en se basant sur les spécifications pour déclarer les configurations d’un service Cloud Run
- Définir les variables a appliqué
- Générer le fichier de configuration
- Déployer le service grâce au service généré

![Helm docs](/images/gcp/cloud-run-helm/cloud-run-helm-diagram.jpg)


> Discalmer : Nous allons nous embarquer dans une EXPERIMENTATION.

## Alors, Helm?

Helm est un gestionnaire de paquets pour Kubernetes. Il simplifie le déploiement, la mise à jour et la gestion d’application. Une charte Helm permet de définir les configurations nécessaires pour faire tourner les objets sur kubernetes.

Pour cet article, nous allons profiter de l’approche de templating de Helm. Helm permet d’écrire des template de configuration qui seront ensuite rendu grâce à des valeurs pour donner une configuration valide pour faire tourner des applications sur kubernetes.

Par exemple, avec le fichier template de déploiement et le fichier de la valeur suivant, on pourra avoir un template complet.

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-nginx
  labels:
    app: nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: {{ .Chart.Name }}-{{ .Values.env.name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

```yaml
# values.yaml
replicaCount: 2

image:
  repository: nginx
  tag: "1.16.0"
  pullPolicy: IfNotPresent
env:
  name: dev
```

Template généré

```yaml
---
# Source: nginx-chart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-nginx
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx-chart-dev
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

## Un coup d’œil à Cloud Run

C’est un service de Google Cloud qui permet de faire tourner des conteneurs en mode serverless, il est basé sur la technologie Knative donc il supporte la même approche de configuration déclarative que kubernetes.

Lien vers la référence de la déclaration Helm de Cloud Run https://cloud.google.com/run/docs/reference/yaml/v1.

On peut dire que pour lancer un service sur Cloud Run en utilisant Helm, il nous suffit d’écrire notre template et de le générer avec les valeurs désirées. C’est aussi simple que ça.

La commande `gcloud run services replace service.yaml` ou service.yaml est notre fichier de déclaration nous permettra de créer ou de remplacer un service à partir d'une spécification de service YAML.

## Configuration

Voici la structure de notre charte (kind of)

```yaml
|-- Chart.yaml
|-- charts
|-- templates
|   -- service.yaml
|-- values
|   |-- values_dev.yaml
|   |-- values_prod.yaml
|    -- values_staging.yaml
-- values.yaml
```

`service.yaml` : le template de la configuration du service que nous voulons déployer

`values.yaml` : valeurs par défaut a appliqué

`values_dev.yaml` : valeurs a appliqué en développement

`Chart.yaml` : information à propos de la charte (version, type, description)

Les fichiers sous le dossier `values` ne sont là que pour le déploiement local. Dans la deuxième partie, nous les retirons avant de publier notre charte Helm.

Simple à mettre en place avec les commandes suivantes

```bash
# Crée une charte helm
helm create cloud-run-helm
cd cloud-run-helm
rm -rf templates/*
touch templates/service.yaml
mkdir values
touch values/values_dev.yaml
```

Le fichier `service.yaml`. Dans ce cas, je vais garder notre exemple très simple.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: {{ required "A valid name value is required!" .Values.name }}-{{ required "An environment value is required!" .Values.env }}
  generation: 1
  labels:
    cloud.googleapis.com/location: "{{ .Values.location | default "us-central1"  }}"
  annotations:
    run.googleapis.com/ingress: "{{ .Values.ingress | default "internal-and-cloud-load-balancing"  }}"
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "{{ .Values.minScale | default "0" }}"
        autoscaling.knative.dev/maxScale: "{{ .Values.maxScale | default "10"  }}"
    spec:
      containerConcurrency: "{{ .Values.containerConcurrency  | default 1000 }}"
      timeoutSeconds: "{{ .Values.timeoutSeconds | default 60  }}"
      serviceAccountName: "{{ required "A valid serviceAccount value is required!" .Values.serviceAccount }}"
      containers:
      - image: "{{ required "A valid image value is required!" .Values.image }}"
        ports:
        - name: http1
          containerPort: "{{ .Values.containerPort | default 8080 }}"
        resources:
          limits:
            cpu: "{{ .Values.resources.limits.cpu  }}"
            memory: "{{ .Values.resources.limits.memory  }}"
```

values.yaml

```yaml
# -- `(required)` name name of the service
name: ""

# -- `(required)` env deployment environment
env: dev

# -- minScale minimum number of instances
minScale: "0"

# -- maxScale maximum number of instances
maxScale: "3"

# -- `(required)` image docker image to deploy
image: ""

# -- containerPort container port to expose
containerPort: 8080

resources:
  limits:
    # -- cpu cpu limit
    cpu: "1000m"
    # -- memory memory limit
    memory: "256Mi"

# -- containerConcurrency number of concurrent requests per container
containerConcurrency: 100

# -- timeoutSeconds request timeout in seconds
timeoutSeconds: 600

# -- ingress service ingress configuration "all", "internal" or "internal-and-cloud-load-balancing", default: internal-and-cloud-load-balancing
ingress: internal-and-cloud-load-balancing

# -- `(required)` serviceAccount service account to use
serviceAccount: ""
```

values-dev.yaml

```yaml
name: "cloud-run-hello"
env: dev
image: "us-docker.pkg.dev/cloudrun/container/hello"
ingress: "all"
serviceAccount: "cloud-run-hello-sa@$1111.iam.gserviceaccount.com"
```

### Fichier généré

Avec la commande suivante, on sera capable de compiler notre template et d’avoir un résultat qu’on pourra ensuite mettre dans un fichier service pour le déployer.

Compiler et afficher

```yaml
helm template cloudrun . -f values.yaml --values=values/values_dev.yaml
```

Compiler et insérer dans un fichier

```bash
helm template cloudrun . -f values.yaml --values=values/values_dev.yaml > cloud-run-helm-service.yaml
```

### Déploiement

Pour déployer le service grâce à notre fichier de configuration, il nous faudra une seule commande.

```bash
gcloud run services replace cloud-run-helm-service.yaml
```

Résultat :
![Helm docs](/images/gcp/cloud-run-helm/cloud-run.png)
![Helm docs](/images/gcp/cloud-run-helm/cloud-run-browser.png)

Bravo

Pour applique des modifications au service, il suffit de modifier les attributs, générer le fichier de configuration et exécuter la commande de déploiement.

## Bonus

En utilisant l’outil `helm-docs` https://github.com/norwoodj/helm-docs, il est possible de générer une documentation automatique grâce au fichier `values.yaml`

```yaml
Helm-docs -f values.yaml
```
![Helm docs](/images/gcp/cloud-run-helm/helm-docs.png)

Until next time, stay in the loop, stay awesome.
