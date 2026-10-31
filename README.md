# Les Silences Anonymes — Application Spirituelle

> **« Chaque jour, un instant avec Dieu. »**

Application spirituelle et littéraire conçue pour accompagner les croyants dans leur intimité quotidienne avec Dieu à travers des pensées courtes du matin et du soir, des temps de silence contemplatif, et une bibliothèque d'ouvrages chrétiens.

---

## Table des Matières

1. [Présentation et Identité](#présentation-et-identité)
2. [Fonctionnalités Clés Réalisées (Phase 1)](#fonctionnalités-clés-réalisées-phase-1)
3. [Architecture Technique](#architecture-technique)
4. [Installation et Démarrage Local](#installation-et-démarrage-local)
5. [Variables d'Environnement](#variables-denvironnement)
6. [Système de Notifications Quotidiennes](#système-de-notifications-quotidiennes)
7. [Achats, Abonnements et Moyens de Paiement](#achats-abonnements-et-moyens-de-paiement)
8. [Espace Administrateur](#espace-administrateur)
9. [Feuille de Route pour les Prochaines Étapes](#feuille-de-route-pour-les-prochaines-étapes)

---

## 1. Présentation et Identité

- **Nom :** Les Silences Anonymes
- **Mission :** Offrir un havre de paix, de méditation et d'édification spirituelle sans agitation ni distraction commerciale.
- **Direction Artistique :** Palette éditoriale noble combinant le bleu nuit profond (`#070a13`), des surfaces anthracite, des textes ivoire chaleureux et des accents dorés / ambrés discrets. Typographie associant *Cormorant Garamond* (élégance littéraire) et *Plus Jakarta Sans* (lisibilité moderne).

---

## 2. Fonctionnalités Clés Réalisées (Phase 1)

### Accueil Dynamique
- Détection de l'heure locale pour mettre en valeur la **Pensée du Matin** (avant 15h) ou la **Pensée du Soir** (dès 15h).
- Indicateur du prochain rendez-vous de silence (ex. 6h00 ou 20h00).
- Sélection de livres recommandés et accès rapide à la bibliothèque.

### Pensées du Matin (6h00 / 05h45)
- Titre officiel « PENSÉE DU JOUR ».
- Citation biblique attribuée avec exactitude.
- Salutation fraternelle et expression de gratitude.
- Méditation concise (60 à 120 mots).
- Application concrète pour la vie quotidienne.
- Courte prière et bénédiction fraternelle.
- Minuterie de silence contemplatif (1, 3 ou 5 min) avec carillon harmonique Web Audio API.

### Pensées du Soir (20h00 / 21h00)
- Titre officiel « PENSÉE DU SOIR ».
- Citation ou idée spirituelle marquante.
- Méditation d'apaisement (80 à 120 mots).
- Question d’introspection pour déposer ses fardeaux.
- Courte prière du crépuscule et bénédiction pour la nuit.

### Bibliothèque Chrétienne (7 Catégories Officielles)
1. *Apprendre à connaître Dieu*
2. *Comprendre le silence de Dieu*
3. *Apprendre à aimer Dieu*
4. *Les combats de nuit*
5. *Témoignages de foi*
6. *Prières et méditations*
7. *Croissance spirituelle*
- Recherche textuelle, filtres d'accès (Gratuit, Déjà possédé, Inclus dans l'abonnement).

### Lecteur Numérique Immersif
- Mode plein écran apaisé sans distractions.
- Réglage de la taille de texte (14px à 26px).
- Thèmes de lecture : Nuit profonde, Sépia chaud, Crépuscule lapis.
- Choix de police : Sérif classique vs Sans-serif épuré.
- Sommaire des chapitres avec navigation instantanée.
- Mémorisation automatique du pourcentage de lecture et reprise au bon endroit.
- Fonction d'ajout de signet/marque-page.

### Espace Utilisateur & Notifications
- Profil personnel (nom, ville, pays, fuseau).
- Configuration des horaires du matin (05h45 / 06h00) et du soir (20h00 / 21h00).
- Test réel de notification via l'API Web Notification du navigateur.
- Consultation des favoris, signets et historique des commandes.

### Console d'Administration Sécurisée
- Protégée par code d'accès (`silence2026`).
- Création, modification et publication de pensées (brouillon, programmé, publié).
- Ajout de nouveaux livres, gestion des chapitres et des extraits.
- Consultation des commandes et des offrandes.
- Prévisualisation fidèle avant publication.

---

## 3. Architecture Technique

- **Frontend :** React 19 + TypeScript + Tailwind CSS v4.
- **PWA (Progressive Web App) :** Manifeste `/public/manifest.json`, Service Worker `/public/sw.js`, icône vectorielle `/public/icon.svg`, prise en charge de l'installation sur mobile (Android & iOS).
- **Audio :** Synthèse d'harmoniques de cloche via Web Audio API (aucun fichier audio externe lourd à charger).
- **Persistance :** LocalStorage réactif avec initialisation par maquette éditoriale riche.

---

## 4. Installation et Démarrage Local

```bash
# 1. Cloner ou ouvrir le projet
cd applet

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Compiler pour la production
npm run build
```

---

## 5. Variables d'Environnement

Le fichier `.env.example` liste les variables requises :
```env
# Clé Gemini pour les fonctionnalités d'analyse future (optionnel)
GEMINI_API_KEY="VOTRE_CLE_API"

# URL publique de l'application (injectée automatiquement lors du déploiement)
APP_URL="https://votredomaine.com"
```

---

## 6. Notifications Quotidiennes

- **En Phase 1 (Actuelle) :** L'application utilise l'API `Notification` standard du navigateur et le Service Worker. L'utilisateur peut autoriser la permission et recevoir des notifications de test directement sur son appareil.
- **En Phase 3 (Production programmée) :** Intégration d'un serveur cron (Cloud Scheduler / Firebase Cloud Messaging) avec clés Web Push VAPID pour réveiller les appareils aux heures exactes (05h45, 06h00, 20h00, 21h00) même lorsque le navigateur est fermé.

---

## 7. Achats et Moyens de Paiement (Mobile Money XOF)

- **Tarifs officiels :**
  - Achat à l'unité : **500 FCFA** par livre.
  - Abonnement illimité : **1 000 FCFA** par mois.
- **Zone monétaire :** Franc CFA (XOF / UEMOA).
- **Opérateurs prévus :** Wave, Orange Money, MTN MoMo, Moov Money.
- **Mode actuel :** Démonstration sécurisée clairement signalée. La validation débloque immédiatement les droits dans l'application sans débiter de compte réel.
- **Passage en production (Phase 4) :** Raccordement à une passerelle agréée (Paystack, CinetPay, Bizao ou FedaPay) avec vérification de signature par webhook côté serveur.

---

## 8. Espace Administrateur

- Pour accéder à la console, cliquez sur « Administration » dans le pied de page ou « Espace Administrateur » depuis votre profil.
- **Code secret par défaut :** `silence2026`
