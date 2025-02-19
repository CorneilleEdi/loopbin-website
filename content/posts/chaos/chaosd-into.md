---
title: Chaosd - Injecter du chaos sur vos VM
description: "Chaosd simule des pannes pour tester la solidité de vos applications et services."
tags: [chaos-engineering, linux, test]
topics: [chaos-engineering, linux]
date: 2025-01-11
slug: chaosd-injecter-du-chaos
---

Cet article fait partie d'une série à propos du Chaos Engineering.

On dit que tester, c'est douter, mais nous on aime tester. N'est-ce pas ?

Okay, let's go.

## C'est quoi le chaos engineering?
En quelques mots, le Chaos Engineering est une pratique qui consiste à `introduire des perturbations` dans un système pour observer comment il réagit.
L'objectif est de `comprendre comment les systèmes se comportent face à des situations imprévues`, comme des pannes de serveur, des latences réseau ou des comportements erratiques.

L'un des outils les plus utilisés pour ce but est [Chaos Mesh](https://chaos-mesh.org/). Mon préféré, et aussi le plus simple, est l'un de ses composants.
Une des fonctionnalités les plus attrayantes vient sous la forme de [chaosd](https://chaos-mesh.org/docs/chaosd-overview/), un utilitaire qui permet d'exécuter ces tests sur les machines, plutôt que dans un cluster Kubernetes.

## Les fonctionalités
**1 - Injection de pannes** ⚠️  
   Chaosd vous permet d'introduire facilement des pannes dans vos machines virtuelles.
   Pour injecter certains tester, chaosd utilise quelques executables specific comme `stress-ng` pour stresser les machines ou encore `Byteman` pour les pannes JVM.
   Voici quelques types de tests que vous pouvez réaliser :
   - **Processus** ⚙️ : Ajoute des pannes aux processus en cours, comme terminer ou mettre en pause des opérations.
   - **Réseau** 🌐 : Crée des problèmes dans le réseau, ce qui peut entraîner une latence accrue, une perte de paquets ou une corruption de paquets.
   - **Pression** 💥 : Met sous pression le CPU ou la mémoire d'une machine physique.
   - **Disque** 💾 : Injecte des pannes dans les systèmes de disque en augmentant les charges de lecture/écriture ou en remplissant l'espace de stockage.
   - **Hôte** 🖥️ : Ajoute des pannes au niveau de la machine physique, y compris l'arrêt de la machine.
   - **Applications JVM** ☕ : Teste des applications Java en introduisant des failles spécifiques à la JVM.
   - **Pannes temporelles** ⏳ : Simule des délais ou des interruptions dans le temps pour voir comment votre système réagit.
   - **Pannes de fichier** 📁 : Crée des erreurs dans les systèmes de fichiers, comme la corruption ou la suppression de fichiers.
   - **Pannes Redis** 🔄 : Introduit des erreurs spécifiques à Redis pour tester la résilience de vos bases de données cache.

**2 - Configuration simple** ⚙️  
   Configurez Chaosd rapidement et facilement, sans avoir à passer des heures sur des réglages compliqués.

**3 - Rapports clairs et stockage simple** 📊  
   Chaosd génère des rapports simples et compréhensibles après chaque test.

**4 - Executable et serveur** ✨
   Chaosd peut être lancer en tant qu'exécutable ou serveur qu'on peut contacter avec des requêtes HTTP.

## Installation
Installer chaosd est assez simple, il vous suffit de telecharger le fichier zipper content l'executable, et les executable de test et voila.
> Je vous laisse trouver la derniere version disponible au lien suivant https://github.com/chaos-mesh/chaosd/releases

```bash
# Installer Chaosd - étape par étape

# 1. Définir la version de Chaosd à télécharger
export CHAOSD_VERSION=v1.4.0

# 2. Télécharger Chaosd
curl -fsSLO "https://mirrors.chaos-mesh.org/chaosd-$CHAOSD_VERSION-linux-amd64.tar.gz"

# 3. Décompresser le fichier téléchargé
tar zxvf chaosd-$CHAOSD_VERSION-linux-amd64.tar.gz && sudo mv chaosd-$CHAOSD_VERSION-linux-amd64 /usr/local/

export PATH=/usr/local/chaosd-$CHAOSD_VERSION-linux-amd64:$PATH

# if ! grep -q "/usr/local/chaosd-$CHAOSD_VERSION-linux-amd64" ~/.bashrc; then
#     echo 'export PATH=/usr/local/chaosd-$CHAOSD_VERSION-linux-amd64:$PATH' >> ~/.bashrc
#     echo "Exécuter 'source ~/.bashrc'."
# else
#     echo "Chaosd est déjà dans votre PATH."
# fi
```

Vous pouvez tester votre instalation avec
```
chaosd version
# Chaosd Version: version.Info{GitVersion:"v1.4.0", GitCommit:"19a157239ebc523c9c6e8e3656c4918a1bc83929", 
# BuildDate:"2023-02-08T09:04:17Z", GoVersion:"go1.18.2", Compiler:"gc", Platform:"linux/amd64"}
```

## Quelques tests/pannes
### Stresser le CPU
Rien de plus simple que de lancer la commande :

```bash
chaosd attack stress cpu --load 80 --uid chaos-stress-80

# Pour plus d'options, utilisez : chaosd attack stress cpu --help
```
![top](/images/chaos/chaos-cpu-stress-top.png)

Cette commande lance un test qui mettra un stress de 80 % sur le CPU. 
L'option `--uid` vous permet d'assigner un identifiant à votre test, que nous utiliserons plus tard pour arrêter le test avec la commande :

```bash
chaosd recover chaos-stress-80
```

### Arrêter un process

Chaosd nous permet également de tuer des processus volontairement pour des tests. On peut effectuer les actions suivantes :

- **kill** : tuer le processus avec le signal par défaut 9.
- **stop** : arrêter le processus, ce qui envoie le signal **SIGSTOP**.

Le plus intéressant, c'est que `kill` dispose de l'option `--recover-cmd`, qui permet de spécifier une commande à exécuter pour effectuer un rollback.

```bash
❯ chaosd attack process kill -h
kill process, default signal 9

Usage:
  chaosd attack process kill [flags]

Flags:
  -h, --help                 help for kill
  -p, --process string       Le nom du processus ou l'ID du processus
  -r, --recover-cmd string   La commande à exécuter lors de la récupération de l'expérience
  -s, --signal int           Le numéro du signal à envoyer (par défaut 9)

Global Flags:
      --log-level string   le niveau de journalisation de chaosd. Les valeurs peuvent être 'debug', 'info', 'warn' et 'error'
      --uid string         l'identifiant de l'expérience
```

Essayons avec NGINX :

```bash
chaosd attack process kill --process nginx --recover-cmd "sudo systemctl restart nginx" --uid kill-nginx
```

NGINX sera alors arrêté, et `chaosd recover kill-nginx` exécutera la commande passée à `--recover-cmd` pour le redémarrer.

Et voilà ! C'est si simple.

Je reviendrai sur d'autres types de tests dans les articles à venir.  
See you !