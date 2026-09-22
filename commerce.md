# Guide Technique Complet — Plateforme E-commerce (Next.js + MongoDB)

> Document de conception et de réalisation, du cahier des charges au déploiement.

---

## Table des matières

1. [Vue d'ensemble et stack technique](#1-vue-densemble-et-stack-technique)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Modélisation de la base de données (MongoDB)](#3-modélisation-de-la-base-de-données-mongodb)
4. [Cartographie complète des pages](#4-cartographie-complète-des-pages)
5. [Fonctionnalités détaillées](#5-fonctionnalités-détaillées)
6. [Rôles et permissions (RBAC)](#6-rôles-et-permissions-rbac)
7. [API — routes et contrats](#7-api--routes-et-contrats)
8. [Authentification et sécurité](#8-authentification-et-sécurité)
9. [Paiement, livraison et notifications](#9-paiement-livraison-et-notifications)
10. [SEO, performance et accessibilité](#10-seo-performance-et-accessibilité)
11. [Étapes de développement — feuille de route](#11-étapes-de-développement--feuille-de-route)
12. [Déploiement et DevOps](#12-déploiement-et-devops)
13. [Fonctionnalités et pages ajoutées pour compléter le projet](#13-fonctionnalités-et-pages-ajoutées-pour-compléter-le-projet)

---

## 1. Vue d'ensemble et stack technique

### 1.1 Objectif
Construire une plateforme e-commerce complète (type grand site marchand) avec :
- Vitrine publique (catalogue, recherche, panier, commande, compte client)
- Back-office multi-rôles (Admin, Gérant/Manager, éventuellement Vendeur)
- Gestion complète du catalogue (catégories, sous-catégories, produits, variantes, promotions)
- Gestion des commandes, paiements, livraisons, avis clients

### 1.2 Stack technique recommandée

| Couche | Technologie | Justification |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG, API Routes, Server Actions, SEO natif |
| Langage | **TypeScript** | Sécurité de typage, meilleure maintenabilité |
| Base de données | **MongoDB** (Atlas) | Flexible pour catalogues avec attributs variables |
| ODM | **Mongoose** | Schémas, validation, hooks |
| Auth | **NextAuth.js (Auth.js v5)** ou **Clerk** | Sessions, providers (email/password, Google) |
| État global (front) | **Zustand** ou **Redux Toolkit** | Panier, filtres, UI state |
| Data fetching | **TanStack Query (React Query)** | Cache, revalidation, mutations |
| Formulaires | **React Hook Form + Zod** | Validation robuste front + back |
| UI | **Tailwind CSS + shadcn/ui** | Rapide, cohérent, personnalisable |
| Upload images | **Cloudinary** ou **AWS S3** | Stockage et transformation d'images |
| Paiement | **Stripe** (+ CinetPay/PayDunya/Mobile Money pour l'Afrique de l'Ouest si besoin) | Standard du marché |
| Emails | **Resend** ou **Nodemailer + SMTP** | Emails transactionnels |
| Recherche | **MongoDB Atlas Search** ou **Algolia/Meilisearch** | Recherche full-text performante |
| File d'attente / cron | **Vercel Cron / node-cron / BullMQ + Redis** | Tâches planifiées (relances panier, stock) |
| Déploiement | **Vercel** (front+API) + **MongoDB Atlas** | Intégration native Next.js |
| Monitoring | **Sentry** + **Vercel Analytics** | Erreurs et performance |

### 1.3 Principes directeurs
- **Server Components par défaut**, Client Components uniquement pour l'interactivité.
- **Server Actions** pour les mutations simples (ajout au panier, formulaires).
- **API Routes REST** pour les intégrations externes (webhooks Stripe, mobile app future).
- Séparation stricte **public / client authentifié / back-office**.
- Validation **Zod** partagée entre client et serveur (schémas communs).

---

## 2. Architecture du projet

```
ecommerce-app/
├── src/
│   ├── app/
│   │   ├── (public)/                     # Layout public (header/footer boutique)
│   │   │   ├── page.tsx                  # Accueil
│   │   │   ├── produits/
│   │   │   │   ├── page.tsx              # Liste produits + filtres
│   │   │   │   └── [slug]/page.tsx       # Fiche produit
│   │   │   ├── categorie/[slug]/page.tsx
│   │   │   ├── categorie/[slug]/[sousSlug]/page.tsx
│   │   │   ├── panier/page.tsx
│   │   │   ├── commande/
│   │   │   │   ├── page.tsx              # Tunnel de commande (checkout)
│   │   │   │   └── confirmation/[id]/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── a-propos/page.tsx
│   │   │   ├── promotions/page.tsx
│   │   │   ├── recherche/page.tsx
│   │   │   └── marques/[slug]/page.tsx
│   │   ├── (auth)/
│   │   │   ├── connexion/page.tsx
│   │   │   ├── inscription/page.tsx
│   │   │   ├── mot-de-passe-oublie/page.tsx
│   │   │   └── reinitialiser/[token]/page.tsx
│   │   ├── (client)/                     # Espace client (protégé)
│   │   │   ├── mon-compte/page.tsx
│   │   │   ├── mon-compte/commandes/page.tsx
│   │   │   ├── mon-compte/commandes/[id]/page.tsx
│   │   │   ├── mon-compte/adresses/page.tsx
│   │   │   ├── mon-compte/favoris/page.tsx
│   │   │   ├── mon-compte/avis/page.tsx
│   │   │   └── mon-compte/parametres/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── admin/                    # Rôle: Admin (accès total)
│   │   │   │   ├── page.tsx              # Vue d'ensemble / KPIs
│   │   │   │   ├── produits/...
│   │   │   │   ├── categories/...
│   │   │   │   ├── promotions/...
│   │   │   │   ├── commandes/...
│   │   │   │   ├── clients/...
│   │   │   │   ├── utilisateurs/...      # Gestion des rôles (admin/gérant)
│   │   │   │   ├── carousel/...          # Config bannières accueil
│   │   │   │   ├── newsletter/...
│   │   │   │   ├── avis/...
│   │   │   │   ├── coupons/...
│   │   │   │   ├── rapports/...
│   │   │   │   └── parametres/...        # Config générale boutique
│   │   │   └── gerant/                   # Rôle: Gérant (accès restreint)
│   │   │       ├── page.tsx
│   │   │       ├── produits/...
│   │   │       ├── commandes/...
│   │   │       └── stock/...
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── produits/route.ts
│   │       ├── produits/[id]/route.ts
│   │       ├── categories/route.ts
│   │       ├── panier/route.ts
│   │       ├── commandes/route.ts
│   │       ├── paiement/stripe/route.ts
│   │       ├── paiement/webhook/route.ts
│   │       ├── newsletter/route.ts
│   │       ├── avis/route.ts
│   │       ├── upload/route.ts
│   │       └── recherche/route.ts
│   ├── components/
│   │   ├── ui/                           # shadcn/ui (bouton, input, etc.)
│   │   ├── shared/                       # Header, Footer, Breadcrumb...
│   │   ├── home/                         # Carousel, CategoriesGrid, BestSellers...
│   │   ├── product/                      # ProductCard, ProductGallery, Filters...
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── dashboard/
│   ├── models/                           # Schémas Mongoose
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── Order.ts
│   │   ├── Cart.ts
│   │   ├── Review.ts
│   │   ├── Coupon.ts
│   │   ├── Banner.ts
│   │   ├── Newsletter.ts
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts                         # Connexion MongoDB (singleton)
│   │   ├── auth.ts                       # Config NextAuth
│   │   ├── zod-schemas/                  # Schémas de validation
│   │   ├── stripe.ts
│   │   ├── email.ts
│   │   ├── upload.ts
│   │   └── utils.ts
│   ├── hooks/                            # useCart, useAuth, useDebounce...
│   ├── store/                            # Zustand: cartStore, filterStore...
│   ├── middleware.ts                     # Protection des routes par rôle
│   └── types/
├── public/
├── .env.local
├── next.config.js
└── package.json
```

---

## 3. Modélisation de la base de données (MongoDB)

### 3.1 `users`
```ts
{
  _id: ObjectId,
  nom: String,
  prenom: String,
  email: String,          // unique, index
  motDePasseHash: String,
  telephone: String,
  role: "client" | "gerant" | "admin",
  avatar: String,
  adresses: [{
    label: String,          // "Domicile", "Bureau"
    rue: String, ville: String, codePostal: String, pays: String,
    parDefaut: Boolean
  }],
  emailVerifie: Boolean,
  actif: Boolean,          // pour bloquer un compte
  dateCreation: Date,
  derniereConnexion: Date
}
```

### 3.2 `categories`
```ts
{
  _id: ObjectId,
  nom: String,
  slug: String,            // unique, index
  description: String,
  image: String,
  parentId: ObjectId | null,  // null = catégorie racine, sinon = sous-catégorie
  ordre: Number,               // ordre d'affichage
  active: Boolean,
  metaTitle: String,           // SEO
  metaDescription: String
}
```
> Une seule collection auto-référencée (`parentId`) permet catégories ET sous-catégories, avec possibilité d'aller sur plusieurs niveaux si besoin plus tard.

### 3.3 `products`
```ts
{
  _id: ObjectId,
  nom: String,
  slug: String,             // unique, index
  description: String,
  descriptionCourte: String,
  categorieId: ObjectId,     // sous-catégorie (ou catégorie si pas de sous-cat)
  marque: String,
  sku: String,               // unique
  images: [String],
  prix: Number,
  prixPromo: Number | null,
  enPromotion: Boolean,
  pourcentageRemise: Number,
  stock: Number,
  seuilAlerteStock: Number,
  variantes: [{               // taille, couleur, etc.
    nom: String,               // "Couleur"
    valeur: String,            // "Rouge"
    stockVariante: Number,
    prixSupplement: Number,
    sku: String
  }],
  attributs: [{ cle: String, valeur: String }],  // caractéristiques techniques
  poids: Number,
  noteMoyenne: Number,
  nombreAvis: Number,
  nombreVentes: Number,       // pour "produits les plus vendus"
  vues: Number,
  actif: Boolean,
  vedette: Boolean,           // mis en avant sur l'accueil
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  dateCreation: Date,
  dateMiseAJour: Date
}
```
> Index recommandés : `slug`, `categorieId`, `enPromotion`, `nombreVentes`, texte (`nom`, `description`) pour la recherche.

### 3.4 `orders`
```ts
{
  _id: ObjectId,
  numeroCommande: String,      // ex: CMD-2026-000123
  clientId: ObjectId,
  articles: [{
    produitId: ObjectId,
    nom: String, image: String,
    variante: String,
    prixUnitaire: Number,
    quantite: Number,
    sousTotal: Number
  }],
  adresseLivraison: { rue, ville, codePostal, pays, telephone },
  adresseFacturation: {...},
  sousTotal: Number,
  fraisLivraison: Number,
  reduction: Number,
  couponApplique: String,
  total: Number,
  statutPaiement: "en_attente" | "paye" | "echoue" | "rembourse",
  methodePaiement: "carte" | "mobile_money" | "paiement_livraison",
  statutCommande: "en_attente" | "confirmee" | "en_preparation" | "expediee" | "livree" | "annulee",
  historiqueStatuts: [{ statut: String, date: Date, commentaire: String }],
  transporteur: String,
  numeroSuivi: String,
  dateCommande: Date,
  dateLivraisonEstimee: Date
}
```

### 3.5 `carts`
```ts
{
  _id: ObjectId,
  clientId: ObjectId | null,   // null si panier invité (sessionId)
  sessionId: String,
  articles: [{ produitId, variante, quantite, prixUnitaire }],
  dateMiseAJour: Date
}
```

### 3.6 `reviews`
```ts
{
  _id: ObjectId,
  produitId: ObjectId,
  clientId: ObjectId,
  note: Number,                 // 1-5
  commentaire: String,
  images: [String],
  achatVerifie: Boolean,
  statut: "en_attente" | "approuve" | "rejete",   // modération
  reponseAdmin: String,
  dateCreation: Date
}
```

### 3.7 `coupons`
```ts
{
  _id: ObjectId,
  code: String,                 // unique
  type: "pourcentage" | "montant_fixe",
  valeur: Number,
  montantMinimum: Number,
  dateDebut: Date,
  dateFin: Date,
  usageMax: Number,
  usageActuel: Number,
  categoriesApplicables: [ObjectId],
  actif: Boolean
}
```

### 3.8 `banners` (carousel accueil)
```ts
{
  _id: ObjectId,
  titre: String,
  sousTitre: String,
  image: String,
  lienBouton: String,
  texteBouton: String,
  ordre: Number,
  actif: Boolean,
  dateDebut: Date,
  dateFin: Date
}
```

### 3.9 `newsletters`
```ts
{ _id: ObjectId, email: String, dateInscription: Date, actif: Boolean }
```

### 3.10 `wishlists`
```ts
{ _id: ObjectId, clientId: ObjectId, produits: [ObjectId] }
```

### 3.11 `contacts` (messages formulaire contact)
```ts
{
  _id: ObjectId, nom: String, email: String, sujet: String,
  message: String, statut: "nouveau" | "traite", dateCreation: Date
}
```

### 3.12 `faqs`
```ts
{ _id: ObjectId, question: String, reponse: String, categorie: String, ordre: Number, actif: Boolean }
```

### 3.13 `settings` (paramètres globaux boutique — géré par admin)
```ts
{
  _id: ObjectId,
  nomBoutique: String, logo: String, favicon: String,
  emailContact: String, telephone: String,
  reseauxSociaux: { facebook, instagram, tiktok, whatsapp },
  fraisLivraisonParDefaut: Number,
  seuilLivraisonGratuite: Number,
  devise: String,
  modesPaiementActifs: [String]
}
```

### 3.14 `activityLogs` (traçabilité actions admin/gérant)
```ts
{ _id: ObjectId, utilisateurId: ObjectId, action: String, cible: String, details: Object, date: Date }
```

---

## 4. Cartographie complète des pages

### 4.1 Pages publiques (visiteur / client)
| Page | Route | Description |
|---|---|---|
| Accueil | `/` | Carousel, catégories, best-sellers, promos, newsletter |
| Liste produits | `/produits` | Recherche, filtres, tri, pagination |
| Fiche produit | `/produits/[slug]` | Détails, galerie, avis, produits similaires |
| Catégorie | `/categorie/[slug]` | Produits d'une catégorie |
| Sous-catégorie | `/categorie/[slug]/[sousSlug]` | Produits d'une sous-catégorie |
| Recherche | `/recherche?q=...` | Résultats de recherche globale |
| Promotions | `/promotions` | Tous les produits en promo |
| Marques | `/marques/[slug]` | Produits d'une marque |
| Panier | `/panier` | Gestion du panier |
| Checkout | `/commande` | Tunnel de commande (adresse → livraison → paiement) |
| Confirmation | `/commande/confirmation/[id]` | Récapitulatif après paiement |
| FAQ | `/faq` | Questions fréquentes (par catégorie, accordéon) |
| Contact | `/contact` | Formulaire + infos (carte, horaires) |
| À propos | `/a-propos` | Présentation de l'entreprise |
| CGV / Mentions légales | `/cgv`, `/mentions-legales`, `/politique-confidentialite` | Obligatoire légalement |
| 404 / Erreur | `not-found.tsx`, `error.tsx` | Pages d'erreur personnalisées |

### 4.2 Authentification
| Page | Route |
|---|---|
| Connexion | `/connexion` |
| Inscription | `/inscription` |
| Mot de passe oublié | `/mot-de-passe-oublie` |
| Réinitialisation | `/reinitialiser/[token]` |
| Vérification email | `/verifier-email/[token]` |

### 4.3 Espace client (authentifié, rôle `client`)
| Page | Route |
|---|---|
| Tableau de bord compte | `/mon-compte` |
| Mes commandes | `/mon-compte/commandes` |
| Détail commande | `/mon-compte/commandes/[id]` |
| Mes adresses | `/mon-compte/adresses` |
| Mes favoris | `/mon-compte/favoris` |
| Mes avis | `/mon-compte/avis` |
| Paramètres du compte | `/mon-compte/parametres` |
| Suivi de colis | `/mon-compte/commandes/[id]/suivi` |

### 4.4 Back-office Admin (rôle `admin` — accès total)
| Page | Route |
|---|---|
| Dashboard (KPIs) | `/admin` |
| Produits (CRUD) | `/admin/produits` |
| Catégories & sous-catégories | `/admin/categories` |
| Promotions | `/admin/promotions` |
| Coupons | `/admin/coupons` |
| Commandes | `/admin/commandes` |
| Clients | `/admin/clients` |
| Utilisateurs internes (admin/gérant) | `/admin/utilisateurs` |
| Carousel / bannières | `/admin/carousel` |
| Newsletter (liste + envoi) | `/admin/newsletter` |
| Avis clients (modération) | `/admin/avis` |
| Messages de contact | `/admin/contacts` |
| FAQ (gestion) | `/admin/faq` |
| Rapports & statistiques | `/admin/rapports` |
| Paramètres boutique | `/admin/parametres` |
| Logs d'activité | `/admin/logs` |

### 4.5 Back-office Gérant (rôle `gerant` — accès restreint)
| Page | Route |
|---|---|
| Dashboard | `/gerant` |
| Produits (gestion stock/prix) | `/gerant/produits` |
| Commandes (traitement/expédition) | `/gerant/commandes` |
| Stock (alertes rupture) | `/gerant/stock` |

---

## 5. Fonctionnalités détaillées

### 5.1 Page d'accueil
1. **Carousel configurable** — images + titre + sous-titre + bouton + lien, ordre, dates de diffusion, géré depuis `/admin/carousel`.
2. **Grille de catégories** — clic → page catégorie/sous-catégorie filtrée.
3. **Produits vedettes / best-sellers** — triés par `nombreVentes`, sélection manuelle possible via champ `vedette`.
4. **Produits en promotion** — carrousel des `enPromotion: true`.
5. **Nouveautés** — derniers produits ajoutés (`dateCreation` desc).
6. **Bannières promotionnelles secondaires** (2-3 blocs visuels).
7. **Section newsletter** — formulaire d'inscription email.
8. **Avis clients récents** — témoignages avec note.
9. **Marques partenaires** — logos cliquables.
10. **Réassurance** — livraison, paiement sécurisé, retour, support (icônes + texte).
11. **Blog / articles** (optionnel mais recommandé pour le SEO) — derniers articles.

### 5.2 Page liste des produits
- Barre de recherche large avec **auto-suggestions** (debounce + API).
- **Filtres** : catégorie, sous-catégorie, marque, fourchette de prix, note, disponibilité, couleur/taille (variantes).
- **Tri** : pertinence, prix croissant/décroissant, popularité, nouveauté.
- **Pagination** (ou scroll infini) — recommandé : pagination classique pour le SEO + `?page=`.
- Vue grille / liste.
- Filtres combinables reflétés dans l'URL (query params) pour partage/SEO.

### 5.3 Fiche produit
- Galerie d'images avec zoom, sélection de variante (couleur/taille) qui met à jour image/prix/stock.
- Description complète, caractéristiques techniques (tableau attributs), avis clients avec notes.
- Indicateur de stock, quantité sélectionnable, bouton "Ajouter au panier" et "Acheter maintenant".
- Bouton favoris (wishlist).
- Fil d'Ariane (breadcrumb).
- **Produits similaires** (même sous-catégorie).
- **Produits fréquemment achetés ensemble** (cross-sell).
- Partage réseaux sociaux.
- Formulaire d'ajout d'avis (si achat vérifié).

### 5.4 Panier
- Ajout/suppression/modification quantité en temps réel.
- Calcul automatique sous-total, frais de livraison, réduction (coupon).
- Persistance : localStorage pour invité + synchronisation en base pour client connecté.
- Champ code promo.
- Bouton "Passer commande" → redirige vers checkout (connexion requise ou "commander en invité").

### 5.5 Tunnel de commande (Checkout)
Étapes :
1. Adresse de livraison (sélection ou nouvelle adresse).
2. Mode de livraison (standard, express) + frais calculés.
3. Mode de paiement (carte via Stripe, mobile money, paiement à la livraison).
4. Récapitulatif + validation → création commande + redirection paiement.
5. Page de confirmation avec numéro de commande + email de confirmation automatique.

### 5.6 Espace client
- Historique des commandes avec statuts et suivi.
- Gestion des adresses (ajout/suppression/par défaut).
- Liste de favoris.
- Mes avis publiés.
- Modification profil, mot de passe, préférences newsletter.
- Téléchargement de factures (PDF).

### 5.7 FAQ
- Regroupée par catégorie (Livraison, Paiement, Retours, Compte...).
- Accordéon, recherche dans la FAQ.
- Gérée dynamiquement depuis `/admin/faq`.

### 5.8 Contact
- Formulaire (nom, email, sujet, message) → sauvegarde en base + email de notification à l'équipe.
- Infos pratiques : adresse, téléphone, email, horaires, carte (Google Maps embed).
- Liens réseaux sociaux, WhatsApp direct.

### 5.9 Back-office Admin — fonctionnalités
- **CRUD Produits** : création avec upload multi-images, variantes, SEO, gestion stock.
- **CRUD Catégories/sous-catégories** : hiérarchie drag-and-drop, image, activation.
- **Promotions** : appliquer remise % ou montant à un produit ou une catégorie entière, avec dates.
- **Coupons** : génération de codes, conditions d'usage, suivi d'utilisation.
- **Commandes** : vue globale, changement de statut, impression bon de livraison/facture.
- **Clients** : liste, détails, historique d'achats, blocage de compte.
- **Utilisateurs internes** : création de comptes Gérant, attribution de permissions.
- **Carousel** : gestion des bannières d'accueil.
- **Newsletter** : liste des abonnés, création et envoi de campagnes.
- **Avis** : modération (approuver/rejeter), réponse publique.
- **Rapports** : chiffre d'affaires, produits les plus vendus, taux de conversion, graphiques (ventes par période, par catégorie).
- **Paramètres** : infos boutique, frais de livraison, devises, moyens de paiement actifs.
- **Logs d'activité** : traçabilité des actions sensibles (qui a modifié quoi et quand).

### 5.10 Back-office Gérant — fonctionnalités (accès restreint)
- Gestion quotidienne des produits (prix, stock) sans suppression ni accès aux paramètres globaux.
- Traitement des commandes (confirmer, préparer, expédier).
- Alertes de rupture de stock.
- Pas d'accès à : gestion des utilisateurs internes, paramètres globaux, logs.

---

## 6. Rôles et permissions (RBAC)

| Fonctionnalité | Client | Gérant | Admin |
|---|---|---|---|
| Parcourir/acheter | ✅ | ✅ | ✅ |
| Gérer son propre compte | ✅ | ✅ | ✅ |
| Voir dashboard back-office | ❌ | ✅ (limité) | ✅ (complet) |
| CRUD produits | ❌ | ✅ (prix/stock) | ✅ (total) |
| Supprimer produit/catégorie | ❌ | ❌ | ✅ |
| Gérer promotions/coupons | ❌ | ✅ (lecture + application simple) | ✅ |
| Traiter commandes | ❌ | ✅ | ✅ |
| Gérer utilisateurs internes | ❌ | ❌ | ✅ |
| Paramètres boutique | ❌ | ❌ | ✅ |
| Voir logs & rapports avancés | ❌ | ❌ | ✅ |

**Implémentation** :
- Champ `role` dans `users`.
- `middleware.ts` Next.js vérifie le rôle via le token de session avant d'accéder à `/admin/*` ou `/gerant/*`.
- Vérification supplémentaire côté API Route (ne jamais faire confiance au seul front).

---

## 7. API — routes et contrats

### 7.1 Produits
- `GET /api/produits` — liste avec query params : `?categorie=&recherche=&prixMin=&prixMax=&tri=&page=&limite=`
- `GET /api/produits/[id]` — détail
- `POST /api/produits` — création (admin/gérant)
- `PUT /api/produits/[id]` — modification
- `DELETE /api/produits/[id]` — suppression (admin uniquement)

### 7.2 Catégories
- `GET /api/categories` — arbre complet (catégories + sous-catégories)
- `GET /api/categories/[slug]/produits` — produits d'une catégorie
- `POST/PUT/DELETE /api/categories/[id]`

### 7.3 Panier
- `GET /api/panier`
- `POST /api/panier/ajouter`
- `PUT /api/panier/modifier`
- `DELETE /api/panier/supprimer/[produitId]`

### 7.4 Commandes
- `POST /api/commandes` — création
- `GET /api/commandes` — liste (client = ses commandes / admin = toutes)
- `GET /api/commandes/[id]`
- `PATCH /api/commandes/[id]/statut`

### 7.5 Paiement
- `POST /api/paiement/stripe` — créer une session de paiement
- `POST /api/paiement/webhook` — écoute des événements Stripe (confirmation)

### 7.6 Auth
- `POST /api/auth/inscription`
- `[...nextauth]` — connexion/déconnexion/session
- `POST /api/auth/mot-de-passe-oublie`
- `POST /api/auth/reinitialiser`

### 7.7 Autres
- `POST /api/newsletter`
- `POST /api/avis`, `PATCH /api/avis/[id]/moderer`
- `POST /api/contact`
- `GET /api/recherche?q=`
- `POST /api/upload` — upload image (Cloudinary/S3)
- `GET/POST /api/coupons`, `POST /api/coupons/verifier`

> Convention : réponses au format `{ succes: boolean, donnees?: any, erreur?: string }`.

---

## 8. Authentification et sécurité

- **NextAuth.js** avec provider Credentials (email/mdp) + éventuellement Google.
- Mots de passe hashés avec **bcrypt**.
- Sessions **JWT** avec rôle inclus dans le token.
- **Middleware** de protection par rôle sur `/admin`, `/gerant`, `/mon-compte`.
- Validation **Zod** de toutes les entrées API (empêche les injections).
- **Rate limiting** sur routes sensibles (connexion, inscription, contact) pour éviter le brute force / spam.
- **CSRF** géré nativement par NextAuth pour les formulaires d'auth.
- Sanitisation des champs texte libres (avis, description) pour éviter le XSS.
- Variables sensibles (clés API, secrets) uniquement en `.env.local`, jamais côté client.
- HTTPS obligatoire en production (géré automatiquement par Vercel).
- Vérification d'email à l'inscription.
- Logs d'activité pour les actions admin/gérant sensibles.

---

## 9. Paiement, livraison et notifications

### 9.1 Paiement
- Intégration **Stripe Checkout** ou **Stripe Elements**.
- Pour l'Afrique de l'Ouest : ajouter **CinetPay** ou **PayDunya** (Mobile Money, cartes locales).
- Option "Paiement à la livraison".
- Webhook pour mettre à jour `statutPaiement` automatiquement.

### 9.2 Livraison
- Frais calculés selon zone/poids (configurable dans `/admin/parametres`).
- Livraison gratuite au-delà d'un seuil.
- Statuts de commande synchronisés avec un numéro de suivi.

### 9.3 Notifications (emails automatiques)
- Confirmation d'inscription / vérification email.
- Confirmation de commande.
- Changement de statut de commande (expédiée, livrée).
- Réinitialisation de mot de passe.
- Alerte stock bas (interne, vers admin/gérant).
- Newsletter / campagnes promotionnelles.
- (Optionnel) notifications push ou SMS pour livraison.

---

## 10. SEO, performance et accessibilité

- Utiliser `generateMetadata` de Next.js pour chaque page dynamique (produit, catégorie).
- **Sitemap.xml** et **robots.txt** générés dynamiquement (`app/sitemap.ts`, `app/robots.ts`).
- Données structurées **Schema.org** (Product, BreadcrumbList, Review) en JSON-LD.
- Images optimisées via `next/image`.
- **ISR (Incremental Static Regeneration)** pour les pages produits/catégories (revalidation périodique).
- Lazy loading des composants non critiques.
- Score Lighthouse cible : 90+ sur toutes les métriques.
- Accessibilité : contrastes, alt sur images, navigation clavier, aria-labels.

---

## 11. Étapes de développement — feuille de route

### Phase 0 — Préparation
1. Créer le projet Next.js (`npx create-next-app@latest --typescript --tailwind --app`).
2. Configurer MongoDB Atlas + connexion (`lib/db.ts`).
3. Installer les dépendances clés (mongoose, next-auth, zod, react-hook-form, zustand, tanstack-query, shadcn/ui, stripe).
4. Mettre en place la structure de dossiers (voir section 2).
5. Configurer les variables d'environnement.

### Phase 1 — Fondations & Auth
6. Créer les modèles Mongoose (`User`, `Category`, `Product`).
7. Configurer NextAuth (Credentials + JWT + rôle).
8. Pages : `/connexion`, `/inscription`, `/mot-de-passe-oublie`.
9. Middleware de protection des routes par rôle.
10. Layout global (Header, Footer, navigation).

### Phase 2 — Catalogue (cœur du site)
11. Modèle `Product` complet + `Category` (avec `parentId`).
12. API CRUD Catégories/Sous-catégories.
13. API CRUD Produits (avec upload d'images).
14. Page `/produits` avec filtres, tri, pagination.
15. Page `/categorie/[slug]` et `/categorie/[slug]/[sousSlug]`.
16. Page `/produits/[slug]` (fiche produit + produits similaires).
17. Recherche avec auto-suggestions.

### Phase 3 — Panier & Commande
18. Modèle `Cart`, store Zustand + persistance.
19. Page `/panier` complète.
20. Tunnel `/commande` (adresse → livraison → paiement).
21. Intégration Stripe (session + webhook).
22. Modèle `Order` + API commandes.
23. Page de confirmation + email automatique.

### Phase 4 — Espace client
24. Pages `/mon-compte/*` (commandes, adresses, favoris, avis, paramètres).
25. Wishlist (modèle + toggle sur fiche produit).
26. Système d'avis (`Review`) avec modération.

### Phase 5 — Page d'accueil complète
27. Modèle `Banner` + gestion carousel.
28. Sections dynamiques : catégories, best-sellers, promos, nouveautés, newsletter.
29. Modèle `Newsletter` + API inscription.

### Phase 6 — Back-office Admin
30. Layout dashboard (sidebar, navigation par rôle).
31. Dashboard KPIs (ventes, commandes, clients — graphiques).
32. Gestion produits/catégories (interfaces CRUD avec tableaux, formulaires).
33. Gestion promotions & coupons.
34. Gestion commandes (changement statut, facture).
35. Gestion clients & utilisateurs internes (rôles).
36. Gestion carousel, newsletter, avis, FAQ, contacts.
37. Rapports & statistiques avancées.
38. Paramètres boutique.

### Phase 7 — Back-office Gérant
39. Layout et pages restreintes (`/gerant/*`) réutilisant les composants admin avec permissions limitées.

### Phase 8 — Pages complémentaires
40. FAQ, Contact, À propos, CGV, mentions légales, politique de confidentialité.
41. Pages d'erreur (404, 500) personnalisées.

### Phase 9 — Finitions
42. SEO complet (sitemap, robots, metadata, JSON-LD).
43. Optimisation performance (images, ISR, cache).
44. Tests (unitaires clés + tests manuels des parcours critiques : achat, paiement, auth).
45. Responsive design complet (mobile-first).
46. Logs d'activité + monitoring (Sentry).

### Phase 10 — Déploiement
47. Configuration Vercel + variables d'environnement production.
48. Configuration domaine + SSL.
49. Tests en production (paiement en mode test → live).
50. Mise en ligne + suivi post-lancement.

---

## 12. Déploiement et DevOps

- **Hébergement** : Vercel (optimisé Next.js) — build automatique depuis GitHub.
- **Base de données** : MongoDB Atlas (cluster dédié, sauvegardes automatiques).
- **Stockage images** : Cloudinary ou AWS S3 + CDN.
- **Environnements** : `development`, `staging`, `production` avec variables séparées.
- **CI/CD** : GitHub Actions (lint, build, tests) avant déploiement automatique Vercel.
- **Sauvegardes** : backup automatique quotidien MongoDB Atlas.
- **Monitoring** : Sentry (erreurs), Vercel Analytics (performance/trafic), Uptime Robot (disponibilité).

---

## 13. Fonctionnalités et pages ajoutées pour compléter le projet

En plus de ce que vous avez listé, voici les éléments essentiels à un **grand site e-commerce** qui manquaient et que j'ai intégrés dans ce guide :

1. **Gestion des variantes de produits** (taille, couleur) avec stock indépendant.
2. **Système d'avis et de notation** avec modération admin.
3. **Wishlist / Favoris** client.
4. **Coupons de réduction** distincts des promotions produit.
5. **Recherche avancée avec suggestions** en temps réel.
6. **Produits similaires** et **"fréquemment achetés ensemble"** (cross-sell/up-sell).
7. **Suivi de commande** avec historique des statuts et numéro de suivi transporteur.
8. **Gestion multi-adresses** client.
9. **Facturation PDF téléchargeable**.
10. **Pages légales obligatoires** : CGV, mentions légales, politique de confidentialité, politique de retour.
11. **Gestion des utilisateurs internes** avec rôles (Admin crée les comptes Gérant).
12. **Logs d'activité** pour la traçabilité des actions sensibles.
13. **Rapports et statistiques avancées** (ventes, produits populaires, taux de conversion).
14. **Alertes de stock bas** pour éviter les ruptures.
15. **Notifications email transactionnelles** complètes (commande, expédition, etc.).
16. **Page Marques** (filtrage par marque).
17. **Blog / articles** (optionnel, fortement recommandé pour le SEO et le trafic organique).
18. **Pages d'erreur personnalisées** (404, 500) cohérentes avec le design du site.
19. **Paiement à la livraison** en complément du paiement en ligne (pertinent selon marché cible).
20. **Panier invité** (achat sans création de compte obligatoire, avec fusion au moment de la connexion).

---

## Prochaines étapes suggérées

1. Valider ce guide et ajuster les priorités selon vos contraintes (délai, budget, marché cible).
2. Définir précisément les moyens de paiement selon votre pays (Stripe seul, ou + Mobile Money).
3. Démarrer par la **Phase 0 à Phase 2** (fondations + catalogue), qui constituent le socle indispensable avant toute autre fonctionnalité.
4. Mettre en place un dépôt Git dès le départ avec une convention de commits claire.

---

*Document généré comme guide de conception technique. Il peut être complété au fur et à mesure de l'avancement du projet.*
