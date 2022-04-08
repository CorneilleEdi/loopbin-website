---
title: Sauvegarder l'état de Terraform sur Google Cloud Storage
description: Comment sauvegarder l'état de Terraform sur Google Cloud Storage
tags: [terraform, gcp]
topics: [terraform, gcp]
date: 2021-05-05
---

## Table of Contents

#

import Button from '~/components/Button.vue'

S'il existe un truc indispensable et très important en travaillant avec Terraform c'est l'état (state). Pour faire simple ,l'état permet de sauvegarder les configurations et les ressources créées. Cet état est normalement enregistré dans un fichier local appelé `terraform.tfstate`, mais il peut également être enregistré dans un service de stockage, ce qui est préférable dans un environnement d'équipe et pour de vrais projets.Nous allons voir comment sauvegarder nos états sur Google Cloud Storage.

## Les backends

<Button isDoc text="Documentation" link="https://www.terraform.io/docs/language/settings/backends/index.html"/>

L'approche pour sauvegarder les états dans un service de stockage n'est pas nouvelle. Elle est directement intégrée dans Terraform grâce aux `backend`

Il existe deux types de backend :

- local
- distant

Nous allons utiliser un backend distant dans notre cas.

Les `backends` distants de Terraform nous permettent de stocker le fichier d'état dans un service de stockage .

Il existe bien sur plusieurs backend disponible comme :

- s3 : Stocke l'état en tant qu'objet sur AWS
- gcs: Stocke l'état en tant qu'objet sur Google Cloud Storage
- http: il enregistre l'état grâce a un client REST L'état sera récupéré à l'aide de GET, modifié à l'aide de POST et purgé à l'aide de DELETE. Le processus de mise à niveau est personnalisable.

## Configuration

Pour utiliser le backend `gcs`, la première chose a noté est que votre bucket doit exister avant que n'ajoutiez la configuration du backend dans votre configuration Terraform. Pour cela, vous pouvez creer le bucket manuellement ou le créer avec Terraform en utilisant le backend local puis changer le backend vers `gcs`.

Dans ce tuto, je vais utiliser la deuxième approche. La première approche est quand même interressante car elle vous permet de garder vos états même si vous détruisez votre infrastructure avec Terraform.

### Code

Pour cette démonstration, nous allons lancer une instance sur Google Cloud et sauvegarder l'etat sur Google Cloud Storage.

Nos fichiers Terraform ressembleront à ceci

<Button isGithub=true text="Code sur Github" link="https://github.com/CorneilleEdi/terraform-state-google-cloud"/>

#

```json:title=variable.tf
variable "project_id" {
  description = "Google Cloud Platform (GCP) Project ID"
  type        = string
  default     = "loopbin"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "europe-west1"
}

variable "zone" {
  description = "GCP zone."
  type        = string
  default     = "europe-west1-b"
}

variable "name" {
  description = "Nom du server web "
  type        = string
  default     = "nginx-server"
}

variable "machine_type" {
  description = "type de machie sur GCE"
  type        = string
  default     = "n1-highcpu-2"
}

variable "state_bucket_name" {
  description = "Nom du bucket ou sont enregister les etats"
  type        = string
  default     = "loopbin-terraform-state-bucket"
}
```

```json:title=compute.tf
resource "google_compute_instance" "vm" {
  name         = var.name
  machine_type = var.machine_type
  zone         = var.zone
  tags         = ["http-server"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }

  metadata_startup_script = "sudo apt-get update; sudo apt-get install -yq nginx"
}

resource "google_compute_firewall" "nginx_server_firewall" {
  name    = "nginx-server-firewall"
  network = "default"
  target_tags = [ "http-server" ]

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
}

output "server_ip" {
  value = google_compute_instance.vm.network_interface.0.access_config.0.nat_ip
}
```

```json:title=storage.tf
resource "google_storage_bucket" "terraform_state_bucket" {
  name        = var.state_bucket_name
  location    = upper(var.region)
  uniform_bucket_level_access = true
  force_destroy = true
}
```

```json:title=main.tf
provider "google" {
  project = var.project_id
  region  = var.region
}

terraform {
  backend "local" {
    path = "state/terraform.tfstate"
  }
}
```

Comme spécifié dans le fichier main.tf, nous allons au début garder notre état localement dans l'emplacement `state/terraform.tfstate`.

Ce code exécutera les actions suivantes :

- Créer un bucket avec le nom `loopbin-terraform-state-bucket` dans la zone EUROPE-WEST
- Créer une instance nommée `nginx-server` et y installera nginx à la création
- Créer une règle Firewall autorisant la connexion au port 80 par TCP

### Déploiement

C'est le moment de deployer

```bash
terraform init
```

```bash
terraform plan
```

```bash
terraform apply
```

Si tout va bien, le déploiement sera un succès. Nous pouvons vérifier notre déploiement avec les commandes suivantes.

```bash
$ gcloud compute instances list
NAME          ZONE            MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
nginx-server  europe-west1-b  n1-highcpu-2               10.132.0.4   35.195.174.19  RUNNING
```

```bash
$ gcloud compute firewall-rules list
NAME                    NETWORK  DIRECTION  PRIORITY  ALLOW                         DENY  DISABLED
default-allow-icmp      default  INGRESS    65534     icmp                                False
default-allow-internal  default  INGRESS    65534     tcp:0-65535,udp:0-65535,icmp        False
default-allow-rdp       default  INGRESS    65534     tcp:3389                            False
default-allow-ssh       default  INGRESS    65534     tcp:22                              False
nginx-server-firewall   default  INGRESS    1000      tcp:80                              False
```

```bash
$ gsutil list
gs://loopbin-terraform-state-bucket/
```

Et bien sur, l'adresse IP de notre instance nous montrera la page d'accueil par défaut de NGINX.

### Ajout du backend

À ce niveau, nous avons notre bucket, mais nous ne l'utilisons pas encore comme backend. Tout ce qu'il nous faut, c'est quelque ligne de code dans notre ficher [main.tf](http://main.tf/)

```json:title=main.tf
provider "google" {
  project = var.project_id
  region  = var.region
}

terraform {
  backend "gcs" {
    bucket  = "loopbin-terraform-state-bucket"
    prefix  = "state"
  }
}
```

Dans le code si dessus, nous avons changé notre backend local pour le backend gcs.

Le backend gcs prend une valeur de configuration obligatoire, c'est `bucket` le nom du bucket ou sera stocker nos états. l'option préfix nous permet de spécifier un préfixe qui sera utiliser comme emplacement dans le bucket (nom de dossier).

Tout ce qu'il nous faut maintent, c'est faire les commandes de déploiement `terraform init`, `terraform plan` et `terraform apply`

### Vérification

```bash
$ gsutil ls -r gs://loopbin-terraform-state-bucket/**
gs://loopbin-terraform-state-bucket/state/default.tfstate
```

La commande gsutil nous montre que notre fichier tfstate est maintenant dans notre bucket sur Google Cloud

> Attention
> n'oubliez pas de ramener le backend vers `local` avant de lancer une infrastructure. Si vous ne le faites pas, terraform supprimera le bucket puis ne sera plus en mesure d'avoir accès à l'état bloqué pour continuer.

Bravo
