import "./env";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { ROLES, type StatutCommande, type StatutPaiement } from "@/lib/constants";
import { slugify } from "@/lib/slugify";
import User from "@/models/User";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Depot from "@/models/Depot";
import Banner from "@/models/Banner";
import Faq from "@/models/Faq";
import Coupon from "@/models/Coupon";
import Review from "@/models/Review";
import Order from "@/models/Order";

/* ──────────────────────────────────────────────────────────────────────────────
 *  IMAGE PAR DÉFAUT — une seule image générique pour tous les produits
 *  (au lieu des URLs présentes dans le catalogue source)
 * ────────────────────────────────────────────────────────────────────────── */

const IMAGE_DEFAUT =
  "https://placehold.co/600x600/e7e5e4/44403c.png?text=Perrier+Bois";

/* ──────────────────────────────────────────────────────────────────────────────
 *  TYPES SEED
 * ────────────────────────────────────────────────────────────────────────── */

interface CategorieSeed {
  nom: string;
  description?: string;
}

interface ProduitSeed {
  nom: string;
  slug?: string;
  categorie: string;
  typeLivraison: "retrait" | "livraison_portail" | "livraison_garage";
  prix: number;          // en euros (EUR)
  prixPromo?: number;    // prix barré en promotion (EUR)
  stock: number;
  poids?: number;        // kg
  sku?: string;
  description: string;
  descriptionCourte?: string;
  attributs?: Array<{ cle: string; valeur: string }>;
  vedette?: boolean;
  nombreVentes?: number;
}

/* ──────────────────────────────────────────────────────────────────────────────
 *  EXTRACTION DES CARACTÉRISTIQUES depuis la description
 *  (bullets « Caractéristiques : » → paires clé/valeur)
 * ────────────────────────────────────────────────────────────────────────── */

function extraireCaracteristiques(
  description: string,
): Array<{ cle: string; valeur: string }> {
  const lignes = description.split("\n");
  const debut = lignes.findIndex(
    (l) => /caract[eé]ristiques/i.test(l.trim()) && l.includes(":"),
  );
  if (debut === -1) return [];

  const attributs: Array<{ cle: string; valeur: string }> = [];
  for (const ligne of lignes.slice(debut + 1)) {
    const t = ligne.trim();
    if (t === "") continue;
    if (/^avantages/i.test(t)) break;
    if (/^[A-Za-zÀ-ÿÀ-ÖØ-öø-ÿ0-9 ]+\s*:$/.test(t) && attributs.length > 0) break;
    if (!t.startsWith("*")) {
      if (attributs.length > 0) break;
      continue;
    }
    const contenu = t.replace(/^\*\s*/, "").replace(/\.$/, "").trim();
    const indexDeuxPoints = contenu.indexOf(":");
    if (indexDeuxPoints > 0) {
      attributs.push({
        cle: contenu.slice(0, indexDeuxPoints).trim(),
        valeur: contenu.slice(indexDeuxPoints + 1).trim(),
      });
    }
  }

  return attributs;
}

/* ──────────────────────────────────────────────────────────────────────────────
 *  CATÉGORIES — « catalogue_seed_fran_ais.md » (5)
 * ────────────────────────────────────────────────────────────────────────── */

const CATEGORIES: CategorieSeed[] = [
  {
    nom: "GRANULES DE BOIS",
    description:
      "Granulés de bois premium certifiés DIN Plus / EN Plus A1, fabriqués en France, au Portugal et en Belgique. Palettes de 65 à 78 sacs de 15 kg.",
  },
  {
    nom: "POELES A BOIS",
    description:
      "Poêles à bois les plus vendus et les moins chers du marché français : INVICTA, SUPRA et GODIN, de 6 à 12 kW.",
  },
  {
    nom: "BOIS DE CHAUFFAGE",
    description:
      "Bûches de bois sec (chêne, hêtre, frêne, charme, bouleau) et bûches densifiées premium. 1 stère = 1 m³ empilé.",
  },
  {
    nom: "ACCESSOIRES DE CHAUFFAGE",
    description:
      "Accessoires et pièces de rechange pour l'entretien de vos poêles : ramonage, vitrocéramique, grille de foyer.",
  },
  {
    nom: "APPAREILS DE CHAUFFAGE",
    description:
      "Appareils de chauffage : inserts de cheminée, chaudières bois, poêles à granulés et conduits inox isolés.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  36 PRODUITS — « catalogue_seed_fran_ais.md » (5 catégories)
 *  Granulés : produits 1-3 du fichier + produits 4-18 (seed original conservé)
 *  Poêles à bois : produits 19-23 · Bois de chauffage : 24-29
 *  Accessoires : 30-32 · Appareils de chauffage : 33-36
 * ────────────────────────────────────────────────────────────────────────── */

const PRODUITS: ProduitSeed[] = [
  /* ── GRANULES DE BOIS ────────────────────────────────────────────────── */

  {
    nom: "Ardenforest – Granulés – Palette de 70 sacs de 15 kg",
    slug: "ardenforest-pellets-pale-con-70-sacos-de-15-kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 510,
    prixPromo: 469,
    stock: 50,
    poids: 1050,
    nombreVentes: 165,
    vedette: true,
    descriptionCourte:
      "Les granulés Ardenforest possèdent la certification DIN Plus et sont fabriqués dans la région Champagne-Ardenne.",
    description: `Granulés Ardenforest : palette de 70 sacs de 15 kg

Les granulés Ardenforest sont des granulés de bois de haute qualité, parfaits pour ceux qui recherchent une solution de chauffage efficace, écologique et économique. Cette palette contient 70 sacs fabriqués à partir de bois 100 % naturel et renouvelable. Grâce à leur faible taux d'humidité et à leur pouvoir calorifique élevé, ces granulés brûlent de manière propre et efficace, ce qui en fait le choix idéal pour les poêles, chaudières et autres systèmes de chauffage à biomasse.

Caractéristiques :
* Quantité : 70 sacs de 15 kg par palette
* Composition : 100 % bois naturel et renouvelable
* Faible taux d'humidité pour une combustion propre et efficace
* Pouvoir calorifique élevé pour une chaleur stable et durable
* Faibles résidus de cendres, ce qui facilite le nettoyage et l'entretien
* Adapté aux poêles, chaudières et systèmes de chauffage à biomasse

Avantages :
* Haute efficacité énergétique, réduit les dépenses de chauffage
* Écologique et durable, issu de sources forestières responsables
* Facile à stocker et à manipuler grâce aux sacs de 15 kg
* Faibles émissions de CO₂, option respectueuse de l'environnement
* Combustion propre avec un minimum de fumée et de résidus

Les granulés Ardenforest offrent une chaleur puissante, économique et respectueuse de l'environnement tout au long de la saison de chauffage.`,
  },
  {
    nom: "Excellent Pellets : palette de 65 sacs de 15 kg",
    slug: "excellent-pellets-pale-con-65-sacos-de-15-kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 624,
    prixPromo: 559,
    stock: 50,
    poids: 975,
    nombreVentes: 145,
    vedette: true,
    descriptionCourte:
      "EXCELLENT PELLETS : granulés de bois de haute qualité certifiés DIN Plus et EN Plus A1, fabriqués au Portugal à partir de bois de pin 100 % naturel, sans additifs.",
    description: `Excellents granulés : palette de 65 sacs de 15 kg

Les granulés Excellent constituent une option parfaite pour ceux qui recherchent un chauffage efficace, écologique et économique. Cette palette contient 65 sacs de 15 kg, fabriqués à partir de bois 100 % naturel et renouvelable. Grâce à leur faible taux d'humidité et à leur pouvoir calorifique élevé, ces granulés garantissent une combustion propre et puissante. Ils sont idéaux pour les poêles, chaudières et autres systèmes de chauffage à biomasse.

Caractéristiques :
* Quantité : 65 sacs de 15 kg
* Composition : 100 % bois naturel et renouvelable
* Faible taux d'humidité pour une combustion efficace et propre
* Pouvoir calorifique élevé pour une chaleur stable et durable
* Faible quantité de cendres, ce qui facilite l'entretien
* Adapté aux poêles, chaudières et systèmes de chauffage à biomasse

Avantages :
* Haute efficacité énergétique, réduit les dépenses de chauffage
* Écologique et durable, issu de forêts gérées de manière responsable
* Facile à stocker et à manipuler grâce aux sacs de 15 kg
* Faibles émissions de CO₂, option respectueuse de l'environnement
* Combustion propre, peu de résidus et de fumée

Avec les granulés Excellent, vous profiterez d'une chaleur puissante, économique et respectueuse de l'environnement tout au long de la saison de chauffage.`,
  },
  {
    nom: "Granulés Badger : palette de 65 sacs de 15 kg chacun.",
    slug: "pellets-badger-pale-con-65-sacos-de-15-kg-cada-uno",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 535,
    prixPromo: 489,
    stock: 50,
    poids: 975,
    nombreVentes: 112,
    descriptionCourte:
      "Les granulés BADGER sont certifiés DIN Plus. Ces granulés de bois offrent des performances énergétiques exceptionnelles.",
    description: `Granulés Badger : palette de 65 sacs de 15 kg

Les granulés BADGER constituent une excellente option pour un chauffage efficace, écologique et économique. Cette palette contient 65 sacs de 15 kg, fabriqués à partir de bois 100 % naturel et renouvelable.

Caractéristiques :
* Quantité : 65 sacs de 15 kg
* Composition : 100 % bois naturel et renouvelable
* Pouvoir calorifique élevé
* Faible taux de cendres
* Homologué DIN Plus
* Adapté aux poêles, chaudières et systèmes à biomasse

Avantages :
* Performance énergétique exceptionnelle
* Combustion propre et efficace
* Stockage et manipulation faciles
* Faibles émissions de CO₂`,
  },
  {
    nom: "Granulés Bio Energy : palette de 66 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 565,
    prixPromo: 509,
    stock: 90,
    poids: 990,
    nombreVentes: 155,
    vedette: true,
    description:
      "Les granulés Bio Energy sont une solution premium certifiée pour un chauffage efficace, écologique et économique. Cette palette contient 66 sacs de 15 kg, fabriqués à partir de 100 % de bois de pin naturel sans additifs. Fabriqués au Portugal dans une scierie respectueuse de l'environnement, ils proviennent de forêts gérées durablement. Faible teneur en humidité et haut pouvoir calorifique.",
    attributs: [
      { cle: "Sacs par palette", valeur: "66 sacs de 15 kg (990 kg au total)" },
      { cle: "Composition", valeur: "100 % pin / bois résineux" },
      { cle: "Certification", valeur: "DINplus / ENplus A1" },
      { cle: "Humidité", valeur: "< 10 %" },
      { cle: "Teneur en cendres", valeur: "< 0,7 %" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés NOVA LENHA : palette de 77 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 633,
    stock: 55,
    poids: 1155,
    nombreVentes: 135,
    description:
      "Les granulés Nova Lenha sont la solution parfaite pour une alternative de chauffage efficace, écologique et économique. Pin pur sans additifs. Pouvoir calorifique de 4700 kcal/kg (18 MJ/kg). Faible teneur en humidité et en cendres pour un nettoyage facile.",
    attributs: [
      { cle: "Sacs par palette", valeur: "77 sacs de 15 kg (1155 kg au total)" },
      { cle: "Pouvoir calorifique", valeur: "4700 kcal/kg (18 MJ/kg)" },
      { cle: "Certification", valeur: "ENplus A1" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés Energia Natural : palette de 70 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 600,
    stock: 65,
    poids: 1050,
    nombreVentes: 125,
    description:
      "Ils sont composés à 100 % de sciure de bois tendre provenant de scieries locales, garantissant un produit de qualité supérieure, naturel et respectueux de l'environnement. Idéal pour les poêles à granulés et chaudières domestiques ou industriels.",
    attributs: [
      { cle: "Sacs par palette", valeur: "70 sacs de 15 kg (1050 kg au total)" },
      { cle: "Composition", valeur: "100 % bois tendre (résineux)" },
      { cle: "Certification", valeur: "ENplus A1 / DINplus" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés Limouzi : palette de 66 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 530,
    stock: 75,
    poids: 990,
    nombreVentes: 110,
    description:
      "Les granulés LIMOUZI possèdent deux certifications : DIN Plus et PEFC. Ils sont composés à 100 % de bois résineux. Ils garantissent une faible humidité, une combustion propre et efficace, un haut pouvoir calorifique et une faible teneur en cendres pour un entretien facile.",
    attributs: [
      { cle: "Sacs par palette", valeur: "66 sacs de 15 kg (990 kg au total)" },
      { cle: "Certification", valeur: "DIN Plus, PEFC" },
      { cle: "Origine", valeur: "France" },
    ],
  },
  {
    nom: "Granulés Vimasol – palette de 72 sacs",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 218,
    prixPromo: 189,
    stock: 100,
    poids: 1080,
    nombreVentes: 170,
    vedette: true,
    description:
      "Granulés Vimasol sur une palette de 72 sacs. Excellent rapport qualité-prix pour une chaleur régulière et durable pendant toute la saison hivernale.",
    attributs: [
      { cle: "Sacs par palette", valeur: "72 sacs de 15 kg (1080 kg au total)" },
      { cle: "Certification", valeur: "ENplus A1" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés Green Energy : palette de 65 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 395,
    stock: 80,
    poids: 975,
    nombreVentes: 120,
    description:
      "Ces granulés répondent aux normes DIN Plus et EN Plus. Ils sont composés de 70 % de bois tendre et 30 % de bois dur. Fabriqués dans deux usines aux Pays-Bas et en Belgique, ils constituent la solution idéale pour un budget limité.",
    attributs: [
      { cle: "Sacs par palette", valeur: "65 sacs de 15 kg (975 kg au total)" },
      { cle: "Composition", valeur: "70 % tendre, 30 % dur" },
      { cle: "Certification", valeur: "DIN Plus, EN Plus" },
      { cle: "Origine", valeur: "Pays-Bas / Belgique" },
    ],
  },
  {
    nom: "Granulés DIN : palette de 65 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 653,
    stock: 50,
    poids: 975,
    nombreVentes: 115,
    description:
      "La faible teneur en humidité et le haut pouvoir calorifique garantissent une combustion efficace et propre, parfaite pour les poêles, chaudières et autres systèmes de biomasse. Haute efficacité énergétique qui réduit les coûts de chauffage.",
    attributs: [
      { cle: "Sacs par palette", valeur: "65 sacs de 15 kg (975 kg au total)" },
      { cle: "Composition", valeur: "100 % bois naturel" },
      { cle: "Certification", valeur: "DIN Plus / ENplus" },
      { cle: "Origine", valeur: "Europe" },
    ],
  },
  {
    nom: "Granulés WOODSTOCK Premium : palette de 78 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 435,
    prixPromo: 389,
    stock: 45,
    poids: 1170,
    nombreVentes: 140,
    vedette: true,
    description:
      "Granulés premium de la marque réputée Woodstock. Ils offrent une densité constante, un débit régulier dans le réservoir du poêle et un minimum de cendres. Efficacité énergétique maximale avec un rendement constamment élevé.",
    attributs: [
      { cle: "Sacs par palette", valeur: "78 sacs de 15 kg (1170 kg au total)" },
      { cle: "Composition", valeur: "100 % bois résineux pur" },
      { cle: "Certification", valeur: "DINplus" },
      { cle: "Origine", valeur: "France" },
    ],
  },
  {
    nom: "Granulés Helios : palette de 65 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 395,
    stock: 90,
    poids: 975,
    nombreVentes: 100,
    description:
      "Respectueux de l'environnement, fabriqués à partir de ressources durables. Grâce aux sacs pratiques de 15 kg, faciles à stocker et à manipuler. Faibles émissions de CO₂ et combustion propre avec peu de résidus.",
    attributs: [
      { cle: "Sacs par palette", valeur: "65 sacs de 15 kg (975 kg au total)" },
      { cle: "Composition", valeur: "100 % bois de pin naturel" },
      { cle: "Certification", valeur: "ENplus A1" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés Valboval : palette de 65 sacs de 15 kg (975 kg)",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 585,
    stock: 58,
    poids: 975,
    nombreVentes: 108,
    description:
      "Les granulés VALBOVAL sont fabriqués au Portugal à partir de 100 % de bois résineux et certifiés DINplus. Ils offrent un haut pouvoir calorifique avec une faible teneur en cendres et en poussière et garantissent une combustion propre et efficace.",
    attributs: [
      { cle: "Sacs par palette", valeur: "65 sacs de 15 kg (975 kg au total)" },
      { cle: "Certification", valeur: "DINplus" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },
  {
    nom: "Granulés Crépito® Premium",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 625,
    stock: 72,
    poids: 1000,
    nombreVentes: 150,
    vedette: true,
    description:
      "Les granulés Crépito® Premium sont fabriqués à 100 % à partir de bois naturel frais, issu de sous-produits recyclés de l'industrie du bois. Sans additifs ni liants, ces granulés garantissent une pureté et une qualité écologique. Ils offrent des performances optimales et une combustion propre.",
    attributs: [
      { cle: "Sac de", valeur: "15 kg (environ 66–72 sacs)" },
      { cle: "Composition", valeur: "100 % bois naturel frais" },
      { cle: "Certification", valeur: "DINplus / NF" },
      { cle: "Origine", valeur: "France" },
    ],
  },
  {
    nom: "Granulés MM ROYAL : palette de 78 sacs",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 395,
    stock: 85,
    poids: 1170,
    nombreVentes: 105,
    description:
      "Les granulés MM ROYAL sont fabriqués selon les normes de qualité les plus strictes. Palette de grande capacité avec 78 sacs de 15 kg. Excellente durabilité, chaleur régulière et formation très faible de scories ou de cendres.",
    attributs: [
      { cle: "Sacs par palette", valeur: "78 sacs de 15 kg (1170 kg au total)" },
      { cle: "Certification", valeur: "ENplus A1" },
      { cle: "Origine", valeur: "Autriche / Europe" },
    ],
  },
  {
    nom: "Granulés Proxima Star : série complète",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 405,
    stock: 77,
    poids: 990,
    nombreVentes: 95,
    description:
      "Cette série contient 66 sacs robustes en plastique de 15 kg chacun, soit 990 kg de granulés au total. Chaque sac est soigneusement emballé pour protéger le produit de l'humidité et faciliter un stockage prolongé.",
    attributs: [
      { cle: "Sacs par palette", valeur: "66 sacs de 15 kg (990 kg au total)" },
      { cle: "Certification", valeur: "ENplus A1 / DINplus" },
      { cle: "Origine", valeur: "Europe" },
    ],
  },
  {
    nom: "Granulés Starforest : palette de 70 sacs de 15 kg",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 500,
    stock: 66,
    poids: 1050,
    nombreVentes: 130,
    vedette: true,
    description:
      "Les granulés Starforest sont connus pour leur régularité exceptionnelle de granulométrie et empêchent les bouchons dans les vis de convoyage. Chaleur intense, allumage rapide et production minimale de cendres.",
    attributs: [
      { cle: "Sacs par palette", valeur: "70 sacs de 15 kg (1050 kg au total)" },
      { cle: "Certification", valeur: "DIN Plus / ENplus A1" },
      { cle: "Origine", valeur: "France" },
    ],
  },
  {
    nom: "Granulés Van Roje : palette de 65 sacs",
    categorie: "GRANULES DE BOIS",
    typeLivraison: "livraison_portail",
    prix: 542,
    stock: 70,
    poids: 975,
    nombreVentes: 118,
    description:
      "Les granulés VANROJE sont fabriqués dans une scierie écologique au Portugal. Nos granulés de très haute qualité se distinguent par un haut pouvoir calorifique et une faible teneur en cendres, poussière et humidité. Plus de 10 ans de garantie pour une combustion efficace et sans résidus.",
    attributs: [
      { cle: "Sacs par palette", valeur: "65 sacs de 15 kg (975 kg au total)" },
      { cle: "Composition", valeur: "100 % bois naturel" },
      { cle: "Origine", valeur: "Portugal" },
    ],
  },

  /* ── POELES A BOIS (5) ────────────────────────────────────────────────── */

  {
    nom: "Poêle à bois INVICTA Samara 6 kW",
    slug: "poele-bois-invicta-samara-6kw",
    categorie: "POELES A BOIS",
    typeLivraison: "livraison_garage",
    prix: 899,
    prixPromo: 799,
    stock: 20,
    poids: 140,
    sku: "SAMARA-6KW",
    nombreVentes: 90,
    vedette: true,
    descriptionCourte:
      "Poêle à bois compact INVICTA Samara 6 kW. Design vintage en fonte, idéal pour petits espaces. Rendement 82 %, certification Flamme Verte 7 étoiles.",
    description: `Poêle à bois INVICTA Samara 6 kW - Chauffage compact et performant

Le poêle INVICTA Samara est le choix idéal pour ceux qui recherchent une solution de chauffage compacte, performante et esthétique. Avec une puissance de 6 kW, ce poêle en fonte offre un chauffage efficace pour des pièces jusqu'à 60 m².

Caractéristiques principales :
* Puissance : 6 kW
* Rendement : 82 %
* Combustible : Bûches de bois (20-35 cm)
* Matériau : Fonte
* Surface de chauffe : 60 m²
* Volume de chauffe : 150 à 180 m³
* Taux CO : 0,08 %
* Certification Flamme Verte : 7 étoiles
* Certification EN 13240
* Design : Vintage
* Couleur : Noir
* Poids : 140 kg
* Dimensions (L×H×P) : 65×75×50 cm
* Diamètre buse : 150 mm
* Raccord fumées : Arrière ou dessus

Avantages :
* Très bon rapport qualité/prix, marque française
* Rendement énergétique élevé (82 %)
* Design vintage intemporel
* Faible encombrement, adapté aux petits espaces
* Combustion efficace et propre
* Faibles émissions de CO₂
* Facilité d'entretien
* Garantie 5 ans
* SAV réactif avec pièces détachées disponibles

Le poêle INVICTA Samara est actuellement l'un des poêles à bois les plus vendus et les moins chers du marché français. Idéal comme chauffage d'appoint ou principal pour petits à moyens espaces.`,
  },
  {
    nom: "Poêle à bois INVICTA Mesnil 8 kW",
    slug: "poele-bois-invicta-mesnil-8kw",
    categorie: "POELES A BOIS",
    typeLivraison: "livraison_garage",
    prix: 1099,
    stock: 18,
    poids: 130,
    sku: "MESNIL-8KW",
    nombreVentes: 85,
    vedette: true,
    descriptionCourte:
      "Poêle à bois INVICTA Mesnil 8 kW. Rendement 83 %, design moderne avec vitre panoramique. Chauffage principal pour pièces de 80 à 100 m².",
    description: `Poêle à bois INVICTA Mesnil 8 kW - Performance et élégance

Le poêle INVICTA Mesnil 8 kW combine performance thermique et design contemporain. Avec sa vitre panoramique, il offre une vue apaisante des flammes tout en chauffant efficacement votre intérieur.

Caractéristiques :
* Puissance : 8 kW
* Rendement : 83 %
* Combustible : Bûches de bois (25-40 cm)
* Matériau : Acier et vitre
* Surface de chauffe : 80 à 100 m²
* Volume de chauffe : 200 à 250 m³
* Taux CO : 0,06 %
* Certification Flamme Verte : 7 étoiles
* Vitrage : Panoramique haute température
* Vitre propre automatique
* Post-combustion
* Couleur : Anthracite
* Poids : 130 kg
* Dimensions (L×H×P) : 70×82×55 cm

Avantages :
* Rendement énergétique excellent (83 %)
* Design moderne avec vitre panoramique
* Vision agréable des flammes
* Combustion prolongée (jusqu'à 10 heures)
* Chauffage principal efficace
* Moins cher qu'un modèle Godin équivalent
* Entretien facile
* Disponibilité pièces détachées assurée

Le Mesnil 8 kW est l'un des bestsellers INVICTA pour son excellent rapport qualité-prix.`,
  },
  {
    nom: "Poêle à bois SUPRA Vercors 8.7 kW - Moins cher",
    slug: "poele-bois-supra-vercors-8-7kw",
    categorie: "POELES A BOIS",
    typeLivraison: "livraison_garage",
    prix: 1199,
    prixPromo: 1049,
    stock: 16,
    poids: 125,
    sku: "VERCORS-8.7",
    nombreVentes: 80,
    descriptionCourte:
      "Poêle SUPRA Vercors 8.7 kW. Rendement 84 %, étanche, design contemporain. Parmi les moins chers du marché.",
    description: `Poêle à bois SUPRA Vercors 8.7 kW - Qualité d'entrée de gamme

SUPRA propose des poêles à bois de qualité à prix avantageux. Le Vercors 8.7 kW allie performance et économie.

Caractéristiques :
* Puissance : 8.7 kW
* Rendement : 84 %
* Combustible : Bûches de bois
* Etanche : Oui (pour maison basse consommation)
* Rendement saisonnier : 80 %
* Taux CO : 0,05 %
* Certification Flamme Verte : 7 étoiles
* Couleur : Noir
* Poids : 125 kg
* Surface de chauffe : 85 à 105 m²

Avantages :
* Excellent rapport qualité-prix
* Marque historique depuis 1873
* Rendement énergétique élevé
* Étancheité assurée
* Pièces détachées faciles à trouver
* Prix parmi les moins chers du marché
* Combustion efficace

SUPRA représente une alternative fiable et économique aux grandes marques premium.`,
  },
  {
    nom: "Poêle à bois GODIN Petit Godin 7.5 kW - Vintage",
    slug: "poele-bois-godin-petit-godin-7-5kw",
    categorie: "POELES A BOIS",
    typeLivraison: "livraison_garage",
    prix: 2290,
    stock: 10,
    poids: 155,
    sku: "PETIT-GODIN-7.5",
    nombreVentes: 60,
    vedette: true,
    descriptionCourte:
      "Poêle GODIN Petit Godin 7.5 kW. Icône du design vintage en fonte, rendement 85 %, fabrication française. Qualité premium, garantie 10 ans.",
    description: `Poêle à bois GODIN Petit Godin 7.5 kW - Référence du design vintage

Le Petit Godin est l'icône incontournable du poêle à bois français. Ce classique de la fonte conjugue tradition, performance et design intemporel.

Caractéristiques :
* Puissance : 7.5 kW
* Rendement : 85 %
* Combustible : Bûches de bois (25-40 cm)
* Matériau : Fonte massive
* Finition : Noir brillant
* Surface de chauffe : 75 m²
* Taux CO : 0,04 %
* Certification Flamme Verte : 7 étoiles
* Fabrication : 100 % française, fonderies intégrées
* Poids : 155 kg
* Garantie : 10 ans
* Pièces détachées : Disponibles 10 ans minimum

Avantages :
* Design vintage intemporel reconnaissable
* Fonte massive pour inertie thermique excellente
* Rendement énergétique élevé
* Fabrication française avec savoir-faire ancestral
* Durabilité exceptionnelle (décennies)
* Finitions soignées
* Plus cher mais justifié par qualité premium
* Symbole de prestige et tradition française

Le Petit Godin est plus onéreux qu'INVICTA mais offre une qualité haut de gamme avec pérennité garantie.`,
  },
  {
    nom: "Poêle à bois INVICTA Mandor 12 kW - Puissant",
    slug: "poele-bois-invicta-mandor-12kw",
    categorie: "POELES A BOIS",
    typeLivraison: "livraison_garage",
    prix: 1490,
    stock: 12,
    poids: 160,
    sku: "MANDOR-12KW",
    nombreVentes: 75,
    descriptionCourte:
      "Poêle INVICTA Mandor 12 kW puissant. Rendement 85 %, chauffage principal pour grands espaces. Bûches jusqu'à 50 cm.",
    description: `Poêle à bois INVICTA Mandor 12 kW - Chauffage principal puissant

Le Mandor 12 kW est le choix idéal pour chauffer efficacement les grands espaces. Avec ses 12 kW de puissance, il assure un chauffage principal performant.

Caractéristiques :
* Puissance : 12 kW
* Rendement : 85 %
* Combustible : Bûches jusqu'à 50 cm
* Matériau : Fonte
* Surface de chauffe : 120 à 150 m²
* Volume de chauffe : 300 à 400 m³
* Taux CO : 0,05 %
* Certification Flamme Verte : 7 étoiles
* Autonomie : Jusqu'à 12 heures
* Poids : 160 kg
* Dimensions (L×H×P) : 80×90×60 cm

Avantages :
* Puissance élevée 12 kW
* Excellent rendement énergétique
* Idéal chauffage principal
* Bûches longues (50 cm) = moins de manipulation
* Autonomie prolongée (12 h)
* Meilleur rapport qualité-prix gamme haute puissance
* Combustion très efficace

Le Mandor 12 kW est le best-seller INVICTA pour les clients nécessitant une puissance importante à prix compétitif.`,
  },

  /* ── BOIS DE CHAUFFAGE (6) ────────────────────────────────────────────── */

  {
    nom: "Bûches de Bois Chêne Sec 50 cm - Stère - 1 m³",
    slug: "buches-bois-chene-sec-50cm-stere",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 110,
    prixPromo: 99,
    stock: 100,
    poids: 750,
    sku: "CHENE-SEC-50",
    nombreVentes: 70,
    vedette: true,
    descriptionCourte:
      "Bûches de Chêne sec (humidité < 20 %), pouvoirs calorifiques élevés de 3,8 kWh/kg. Essence dure premium. 1 stère = 1 m³ empilé.",
    description: `Bûches de Bois Chêne Sec - Chauffage premium

Le chêne est l'essence de référence pour le bois de chauffage. Nos bûches de chêne sec offrent un chauffage optimal et durable.

Caractéristiques :
* Essence : Chêne (feuillu dur)
* Humidité : < 20 % (bois sec)
* Longueur : 50 cm
* Volume : 1 stère = 1 m³ empilé
* Pouvoir calorifique : 3,8 kWh/kg
* Densité sèche : 750 kg/m³
* Combustion : Lente et progressive
* Autonomie : Très bonne (8-12 heures)
* Résidus cendres : Modérés
* Rendement poêle : 80 % minimum

Avantages :
* Essence dure de référence
* Combustion lente = moins de consommation
* Chauffage intense et stable
* Bois sec bien séché (2 ans minimum)
* Peu de fumée et peu d'encrassement
* Idéal pour poêles et cheminées
* Stockage limité grâce à coupe 50 cm
* Livraison possible en petit volume

Le chêne est l'essence premium pour un chauffage efficace et économique. Référence du marché français.`,
  },
  {
    nom: "Bûches de Bois Hêtre Sec 33 cm - Stère - Chauffage efficace",
    slug: "buches-bois-hetre-sec-33cm-stere",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 105,
    stock: 100,
    poids: 750,
    sku: "HETRE-SEC-33",
    nombreVentes: 65,
    descriptionCourte:
      "Bûches Hêtre sec, coupe 33 cm. Pouvoir calorifique élevé de 3,8 kWh/kg, combustion longue. Stère complet 1 m³.",
    description: `Bûches de Bois Hêtre Sec - Chauffage principal

Le hêtre offre un pouvoir calorifique excellent, quasi égal au chêne. Nos bûches hêtre sont parfaitement séchées.

Caractéristiques :
* Essence : Hêtre (feuillu dur)
* Humidité : < 20 %
* Longueur : 33 cm (compact)
* Volume : 1 stère = 0,7 m³ réel (0,33 cm de longueur)
* Pouvoir calorifique : 3,8 kWh/kg (égal chêne)
* Densité sèche : 750 kg/m³
* Combustion : Longue et régulière
* Rendement : Excellent (80-85 %)
* Peu de résidus cendres

Avantages :
* Pouvoir calorifique égal au chêne
* Combustion très régulière
* Bonne autonomie (8-10 heures)
* Format 33 cm pratique pour petits foyers
* Moins cher que le chêne
* Essence dure de qualité
* Stockage limité (bûches plus courtes)

Le hêtre est le second choix pour un chauffage performant et économique, prix légèrement inférieur au chêne.`,
  },
  {
    nom: "Bûches de Bois Bouleau Sec 50 cm - Stère",
    slug: "buches-bois-bouleau-sec-50cm-stere",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 95,
    stock: 100,
    poids: 600,
    sku: "BOULEAU-SEC-50",
    nombreVentes: 55,
    descriptionCourte:
      "Bûches Bouleau sec. Pouvoir calorifique 3,0 kWh/kg, combustion vive, prix attractif. Coupe 50 cm.",
    description: `Bûches de Bois Bouleau Sec

Le bouleau offre une bonne alternative aux essences dures. Combustion vive et agréable, prix avantageux.

Caractéristiques :
* Essence : Bouleau (feuillu tendre)
* Humidité : < 25 %
* Longueur : 50 cm
* Volume : 1 stère = 1 m³ empilé
* Pouvoir calorifique : 3,0 kWh/kg
* Densité sèche : 600 kg/m³
* Combustion : Vive et intense
* Autonomie : Bonne (6-8 heures)
* Résidus cendres : Peu

Avantages :
* Prix attrayant, moins cher que chêne / hêtre
* Combustion vive et agréable
* Bois sec bien préparé
* Idéal chauffage appoint
* Bonne alternative qualité/prix

Le bouleau représente une solution intermédiaire entre essences dures premium et résineux moins chers.`,
  },
  {
    nom: "Bûches de Bois Frêne Sec 40 cm - Stère - Chauffage versatile",
    slug: "buches-bois-frene-sec-40cm-stere",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 115,
    stock: 90,
    poids: 750,
    sku: "FRENE-SEC-40",
    nombreVentes: 60,
    descriptionCourte:
      "Bûches Frêne sec. Pouvoir calorifique 3,8 kWh/kg égal au chêne. Brûle bien même légèrement humide.",
    description: `Bûches de Bois Frêne Sec - Chauffage versatile

Le frêne est apprécié des professionnels pour son excellente combustion en toutes conditions.

Caractéristiques :
* Essence : Frêne (feuillu dur)
* Humidité : < 20 %
* Longueur : 40 cm
* Volume : 1 stère = 1 m³ empilé
* Pouvoir calorifique : 3,8 kWh/kg (égal chêne)
* Densité sèche : 750 kg/m³
* Combustion : Excellente même humide
* Autonomie : 8-10 heures
* Peu de résidus

Avantages :
* Pouvoir calorifique égal aux essences premières
* Brûle bien même légèrement humide (atout)
* Combustion très propre
* Essence dure de qualité
* Idéal pour toutes conditions stockage
* Rendement excellent
* Prix avantageux comparé au chêne

Le frêne est le choix des connaisseurs : performance premium avec flexibilité d'usage.`,
  },
  {
    nom: "Bûches Densifiées Premium - Pack 450 kg - Chauffage intense",
    slug: "buches-densifiees-premium-450kg",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 350,
    prixPromo: 299,
    stock: 40,
    poids: 450,
    sku: "DENSE-PREM-450",
    nombreVentes: 45,
    vedette: true,
    descriptionCourte:
      "Bûches densifiées, sciures compressées sans colle. Humidité 8 %, pouvoir calorifique 4,8 kWh/kg, rendement 95 %.",
    description: `Bûches Densifiées Premium - Chauffage haute performance

Les bûches densifiées offrent le meilleur compromis : performance de bois dur avec encombrement minimaliste.

Caractéristiques :
* Composition : Sciures de bois comprimées (sans colle)
* Humidité : 8 % (très sec)
* Longueur : 25 cm
* Diamètre : 10 cm
* Pouvoir calorifique : 4,8 kWh/kg (supérieur au bois traditionnel)
* Densité : 1,2 kg par bûche
* Rendement : 95 % (maximal)
* Combustion : 1,5 à 2 heures par bûche
* Autonomie : Moyenne mais chaleur intense
* Peu de fumée et de résidus
* Prix palette : 350 € (pack de 450 kg)

Avantages :
* Pouvoir calorifique supérieur
* Très faible humidité (8 %)
* Encombrement minimum (50 % de moins que le bois traditionnel)
* Rendement poêle maximal (95 %)
* Très propre, peu de fumée
* Longue durée de conservation, stable
* Idéal appoint ou petits espaces
* Moins d'espace de stockage

Utilisation idéale :
* Appoint intense en épisodes froids
* Chauffage petits espaces
* Complément granulés
* Stockage limité

Les densifiées coûtent plus cher au kg mais offrent plus de chaleur utile : bon compromis performance/praticité.`,
  },
  {
    nom: "Bûches de Bois Charme Sec 50 cm - Stère - Chauffage premium",
    slug: "buches-bois-charme-sec-50cm-stere",
    categorie: "BOIS DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 120,
    stock: 0,
    poids: 850,
    sku: "CHARME-SEC-50",
    nombreVentes: 30,
    descriptionCourte:
      "Bûches Charme sec, essence rare et excellente. Pouvoir calorifique 3,8 kWh/kg, combustion très lente. Stock limité.",
    description: `Bûches de Bois Charme Sec - Chauffage premium rare

Le charme est une essence rare et excellente, demandé par les connaisseurs pour sa combustion incomparable.

Caractéristiques :
* Essence : Charme (feuillu dur rare)
* Humidité : < 20 %
* Longueur : 50 cm
* Volume : 1 stère = 1 m³ empilé
* Pouvoir calorifique : 3,8 kWh/kg (égal chêne et hêtre)
* Densité sèche : 850 kg/m³ (plus dense)
* Combustion : Très lente et progressive
* Autonomie : Exceptionnelle 12-14 heures
* Résidus : Très peu
* Rendement : Excellent 85 %+

Avantages :
* Essence très rare et difficile à trouver
* Combustion lentement progressive = moins de recharge
* Densité très élevée = plus de chaleur
* Très peu de fumée
* Autonomie exceptionnelle
* Chauffage confort maximisé
* Prix premium mais justifié

Le charme est le choix des puristes : essence rare pour chauffage confort et autonomie exceptionnelle. Stock limité.`,
  },

  /* ── ACCESSOIRES DE CHAUFFAGE (3) ────────────────────────────────────── */

  {
    nom: "Kit Ramonage Poêle à Bois - Brosse et Tiges",
    slug: "kit-ramonage-poele-bois-brosse-tiges",
    categorie: "ACCESSOIRES DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 45,
    prixPromo: 39,
    stock: 200,
    poids: 2,
    sku: "KIT-RAMONAGE-01",
    nombreVentes: 40,
    descriptionCourte:
      "Kit de ramonage complet pour poêles : brosse nylon Ø 150 mm, tiges télescopiques jusqu'à 3 m. Entretien facile.",
    description: `Kit de Ramonage Complet pour Poêles à Bois

Kit d'entretien professionnel pour nettoyer vos conduits efficacement.

Contenu :
* Brosse de ramonage nylon 150 mm
* 6 tiges télescopiques (extension jusqu'à 3 m)
* Adaptateur visses universelle
* Sac récupération poussière
* Mode d'emploi

Caractéristiques :
* Diamètre brosse : 150 mm (universel)
* Matériau brosse : Nylon résistant
* Longueur maximum : 3 mètres
* Poids : 2 kg
* Compatible : Tous poêles standard

Avantages :
* Ramonage facile et sans risque
* Efficace pour enlever les encrassements
* Réutilisable année après année
* Prix économique
* Installation facile
* Maintenance obligatoire pour sécurité
* Garantit le rendement du poêle

Entretien régulier = performance optimale et sécurité garantie.`,
  },
  {
    nom: "Thermo-Verre Haute Température pour Poêle - Vitrocéramique",
    slug: "thermo-verre-poele-vitroceram",
    categorie: "ACCESSOIRES DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 85,
    stock: 150,
    poids: 5,
    sku: "VERRE-VITRO-01",
    nombreVentes: 35,
    descriptionCourte:
      "Vitre vitrocéramique haute température pour poêles. Résiste à 800 °C, transparence optimale. Universel plusieurs modèles.",
    description: `Thermo-Verre Vitrocéramique pour Poêles

Verre de rechange haute performance pour vos poêles.

Caractéristiques :
* Matériau : Vitrocéramique (Robax®)
* Température max : 800 °C
* Épaisseur : 5 mm
* Dimensions : 300×400 mm (réglable)
* Transparence : Excellente (87 %)
* Résistance chocs : Très élevée
* Durée de vie : 5-7 ans
* Rechange facile : 5 minutes

Avantages :
* Haute résistance thermique (800 °C)
* Transparence optimale pour la vue des flammes
* Très résistant aux chocs
* Compatible plusieurs modèles
* Facilement remplaçable
* Prix raisonnable pour remplacement

Maintenance essentielle pour profiter pleinement de votre poêle.`,
  },
  {
    nom: "Grille Foyer pour Poêle à Bois - Fonte réfractaire",
    slug: "grille-foyer-fonte-refractaire",
    categorie: "ACCESSOIRES DE CHAUFFAGE",
    typeLivraison: "livraison_portail",
    prix: 65,
    stock: 180,
    poids: 3,
    sku: "GRILLE-FOYER-01",
    nombreVentes: 32,
    descriptionCourte:
      "Grille de foyer en fonte réfractaire pour poêles. Durabilité exceptionnelle, pièce-clé pour une combustion efficiente.",
    description: `Grille de Foyer en Fonte Réfractaire

Pièce de rechange fonctionnelle pour une combustion optimale.

Caractéristiques :
* Matériau : Fonte réfractaire
* Support combustible : Bûches ou pellets
* Température max : 1000 °C
* Durée de vie : 10+ ans
* Nettoyage : Facile
* Installation : Universelle
* Poids : 3 kg

Avantages :
* Très durable (10+ ans)
* Résistance à la chaleur extrême
* Maintenance facilitée
* Prix économique pour une longue durée de vie
* Essentielle pour un bon tirage

Grille bien entretenue = combustion optimale = économies de chauffage.`,
  },

  /* ── APPAREILS DE CHAUFFAGE (4) ──────────────────────────────────────── */

  {
    nom: "Insert de Cheminée Foyer Fermé - 12 kW",
    slug: "insert-cheminee-foyer-ferme-12kw",
    categorie: "APPAREILS DE CHAUFFAGE",
    typeLivraison: "livraison_garage",
    prix: 1690,
    prixPromo: 1490,
    stock: 15,
    poids: 200,
    sku: "INSERT-CHEM-12KW",
    nombreVentes: 28,
    vedette: true,
    descriptionCourte:
      "Insert de cheminée 12 kW, foyer fermé. Rendement 88 %, transforme votre cheminée ouverte en chauffage efficace.",
    description: `Insert de Cheminée - Foyer Fermé 12 kW

Transformez votre cheminée ouverte en système de chauffage performant.

Caractéristiques :
* Puissance : 12 kW
* Rendement : 88 %
* Combustible : Bûches bois
* Foyer fermé
* Vitre panoramique
* Surface chauffe : 120 m²
* Circulation air : Système soufflage possible
* Taux CO : 0,04 %
* Certification Flamme Verte : 7 étoiles
* Installation : Encastrement dans cheminée

Avantages :
* Réutilisation cheminée existante
* Rendement 88 % vs 15 % cheminée ouverte
* Chauffage principal possible
* Soufflage air vers plusieurs pièces
* Installation moins coûteuse que poêle neuf
* Maintient l'esthétique de la cheminée
* Récupération d'air chaud

Idéal pour transformer une cheminée décorative en système de chauffage efficace.`,
  },
  {
    nom: "Chaudière Bois Chauffage Central - 25 kW - Chauffage maison entière",
    slug: "chaudiere-bois-chauffage-central-25kw",
    categorie: "APPAREILS DE CHAUFFAGE",
    typeLivraison: "livraison_garage",
    prix: 4500,
    stock: 6,
    poids: 400,
    sku: "CHAUD-BOIS-25KW",
    nombreVentes: 12,
    descriptionCourte:
      "Chaudière bois 25 kW pour chauffage central. Rendement 90 %, eau chaude, radiateurs et chauffage plancher.",
    description: `Chaudière Bois Chauffage Central 25 kW

Solution complète de chauffage central pour toute la maison.

Caractéristiques :
* Puissance : 25 kW
* Rendement : 90 %
* Combustible : Bûches bois ou granulés
* Système : Chauffage central eau chaude
* Eau sanitaire : Possible via échangeur
* Température sortie : Max 90 °C
* Volume chauffe : Jusqu'à 300 m² (maison)
* Taux émission : Minimal
* Certification EN 12809

Système :
* Raccord radiateurs / plancher
* Thermostat programmable
* Tuyauterie isolée
* Ballon accumulation recommandé
* Installation professionnelle obligatoire

Avantages :
* Chauffage principal complet
* Eau chaude sanitaire
* Rendement très élevé (90 %)
* Confort radiateurs toutes pièces
* Solution longue durée (15+ ans)
* Économies importantes vs électricité / gaz

Investissement important mais chauffage complètement autonome au bois.`,
  },
  {
    nom: "Poêle à Granulés Ventilé - 10 kW - Chauffage automatisé",
    slug: "poele-granules-ventile-10kw",
    categorie: "APPAREILS DE CHAUFFAGE",
    typeLivraison: "livraison_garage",
    prix: 2100,
    stock: 15,
    poids: 120,
    sku: "POELE-GRAN-10KW",
    nombreVentes: 30,
    vedette: true,
    descriptionCourte:
      "Poêle à granulés 10 kW ventilé. Rendement 94 %, automatique, thermostat programmable. Chauffage confort optimal.",
    description: `Poêle à Granulés Ventilé 10 kW

Chauffage moderne automatisé avec granulés.

Caractéristiques :
* Puissance : 10 kW
* Rendement : 94 %
* Combustible : Granulés (pellets)
* Système : Alimentation automatique
* Thermostat : Programmable digital
* Ventilation : Forcée chauffage rapide
* Autonomie : 24-48 heures
* Consommation : ~2 kg/heure
* Bruit : Faible (35 dB)
* Température max sortie : 90 °C
* Surface chauffe : 100 m²

Fonctionnement :
* Remplissage silo 1x/semaine
* Chauffage automatique jour/nuit
* Programmation thermostat
* Nettoyage cendres 1x/mois

Avantages :
* Chauffage automatique confort
* Rendement excellent (94 %)
* Programmation journalière
* Moins d'intervention utilisateur
* Chauffage rapide (minutes)
* Accumulation pas nécessaire
* Design moderne
* Connectivité possible (wifi)

Chauffage moderne sans la manipulation des bûches.`,
  },
  {
    nom: "Kit Tuyauterie Poêle - Conduit Inox Isolé - Diamètre 150 mm",
    slug: "kit-tuyauterie-poele-inox-isole-150mm",
    categorie: "APPAREILS DE CHAUFFAGE",
    typeLivraison: "livraison_garage",
    prix: 380,
    stock: 40,
    poids: 25,
    sku: "KIT-TUYAU-INX-150",
    nombreVentes: 25,
    descriptionCourte:
      "Kit tuyauterie poêle complet en inox isolé. Diamètre 150 mm standard, coudes et sections droites. Isolation thermique excellente.",
    description: `Kit Tuyauterie Poêle - Conduit Inox Isolé

Système complet de tuyauterie pour installation de poêle.

Contenu typique du kit :
* 2 sections droites 1 m
* 1 coude 90°
* 1 coude 45°
* 1 T collecteur
* Rosace encadrement
* Brides fixation
* Joint isolation

Caractéristiques :
* Matériau : Inox double paroi
* Diamètre : 150 mm (standard)
* Isolation : Laine roche 50 mm
* Température max : 600 °C (paroi interne)
* Tirage : Optimal
* Installation : Sur toit ou façade
* Longueur totale kit : ~4 m

Avantages :
* Double paroi isolation excellente
* Sécurité feu optimale
* Tirage régulier garanti
* Installation facile par clipsage
* Compatibilité standard
* Durée de vie 20+ ans
* Maintenance réduite

Kit essentiel pour une bonne installation de poêle = rendement optimal et sécurité.`,
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  5 FAQs
 * ────────────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    question: "Dans quelle zone livrez-vous ?",
    reponse:
      "Nous livrons dans toute la France métropolitaine, avec des frais de livraison selon la zone géographique. La livraison s'effectue par camion-grue ou transpalette, qui dépose la palette au plus près de votre zone de stockage.",
    categorie: "Livraison",
    ordre: 1,
  },
  {
    question: "Quelle est la consommation de granulés pour une maison de 100 m² ?",
    reponse:
      "Pour une maison bien isolée de 100 m² (norme RT2012 / RE2020), entièrement chauffée par un poêle à granulés, la consommation moyenne est de 1 à 1,5 tonne de granulés par an, soit 1 à 1,5 palette. Cela varie selon l'isolation, le climat et les habitudes de chauffage.",
    categorie: "Conseils",
    ordre: 1,
  },
  {
    question: "Comment stocker correctement les granulés de bois ?",
    reponse:
      "Les granulés de bois doivent être stockés à l'abri de l'humidité. Conservez les sacs dans un garage, un jardin ou sous une bâche. Contrairement au bois traditionnel, ils n'ont pas besoin de temps de séchage supplémentaire et sont prêts à l'emploi dès réception.",
    categorie: "Conseils",
    ordre: 2,
  },
  {
    question: "Comment puis-je payer ?",
    reponse:
      "Nous acceptons exclusivement le paiement par virement bancaire. Après validation de votre commande, vous recevrez par e-mail nos coordonnées bancaires officielles (IBAN et BIC/SWIFT). Veuillez mentionner le numéro de commande dans le libellé du virement et envoyer le justificatif de paiement à contact@perrierbois.fr pour accélérer l'expédition.",
    categorie: "Paiement",
    ordre: 1,
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  4 BANNIÈRES
 * ────────────────────────────────────────────────────────────────────────── */

const BANNIERES = [
  {
    titre: "Chauffage naturel et économique avec des granulés de bois haut de gamme",
    sousTitre: "Qualité supérieure. Livraison à domicile sur palettes prêtes à l'emploi.",
    texteBouton: "Commander des granulés",
    lienBouton: "/produits",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2000&auto=format&fit=crop",
    ordre: 1,
  },
  {
    titre: "Granulés premium certifiés ENplus A1",
    sousTitre: "Le pouvoir calorifique optimal pour un hiver paisible. Livraison sur palette.",
    texteBouton: "Commander des granulés",
    lienBouton: "/produits",
    image: "https://images.unsplash.com/photo-1517596009890-00d98bfbdf8a?q=80&w=1920&auto=format&fit=crop",
    ordre: 2,
  },
  {
    titre: "Livraison dans toute la France",
    sousTitre: "Nos entrepôts garantissent une livraison rapide jusqu'à votre domicile.",
    texteBouton: "Nos entrepôts",
    lienBouton: "/depots",
    image: "https://images.unsplash.com/photo-1620612644265-27a3c3b0ebfd?q=80&w=1920&auto=format&fit=crop",
    ordre: 3,
  },
  {
    titre: "100 % bois naturel",
    sousTitre: "Sans additifs chimiques, liants ni écorce. Haut pouvoir calorifique.",
    texteBouton: "Découvrir les produits",
    lienBouton: "/produits",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
    ordre: 4,
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  2 ENTREPÔTS (France)
 * ────────────────────────────────────────────────────────────────────────── */

const DEPOTS = [
  {
    nom: "Entrepôt principal – Melay",
    codePostal: "71340",
    ville: "Melay",
    adresse: "109 Zone des Varennes",
    telephone: "+33 6 12 34 56 78",
    horaires: "Lu-Ve : 08h00-18h00, Sa : 09h00-12h00",
  },
  {
    nom: "Entrepôt Sud – Lyon",
    codePostal: "69007",
    ville: "Lyon",
    adresse: "25 rue de l'Industrie",
    telephone: "+33 4 00 00 00 00",
    horaires: "Lu-Sa : 09h00-19h00",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  2 COUPONS
 * ────────────────────────────────────────────────────────────────────────── */

const COUPONS = [
  { code: "BIENVENUE10", type: "pourcentage", valeur: 10, montantMinimum: 5000, usageMax: 200 },
  { code: "HIVER2026", type: "pourcentage", valeur: 15, montantMinimum: 15000, usageMax: 50 },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  AVIS CLIENTS
 * ────────────────────────────────────────────────────────────────────────── */

interface AvisSeed {
  auteur: string;        // "Prénom Nom" affiché sur l'avis
  produitIndex: number;  // index dans l'ordre des produits triés par ventes
  note: number;
  commentaire: string;
  statut: "approuve" | "en_attente";
}

const AVIS: AvisSeed[] = [
  { auteur: "Camille Dubois", produitIndex: 0, note: 5, commentaire: "Granulés excellents ! Très peu de cendres et le poêle fonctionne à merveille. Je commande 2 palettes chaque année.", statut: "approuve" },
  { auteur: "Julien Morel", produitIndex: 0, note: 5, commentaire: "Livraison impeccable, les sacs sont bien emballés sur la palette. Le pouvoir calorifique tient ses promesses.", statut: "approuve" },
  { auteur: "Sophie Laurent", produitIndex: 0, note: 4, commentaire: "Très bons granulés, j'enlève une étoile car le délai de livraison en plein hiver était de 2 semaines.", statut: "approuve" },
  { auteur: "Nicolas Girard", produitIndex: 1, note: 5, commentaire: "Incroyable ! Les granulés chauffent bien mieux que le bois traditionnel. Fini le bûchage pénible !", statut: "approuve" },
  { auteur: "Élodie Roux", produitIndex: 1, note: 5, commentaire: "Propre, facile à stocker et une chaleur merveilleuse. Enfin plus de poussière partout.", statut: "approuve" },
  { auteur: "Thomas Perrin", produitIndex: 2, note: 5, commentaire: "S'allument en quelques secondes, aucune odeur chimique. Qualité supérieure.", statut: "approuve" },
  { auteur: "Marion Fabre", produitIndex: 2, note: 4, commentaire: "Bon produit écologique. Un peu plus cher que les bûchettes classiques, mais la qualité est au rendez-vous.", statut: "approuve" },
  { auteur: "Lucas Chevalier", produitIndex: 3, note: 5, commentaire: "Parfait pour toute la saison ! Chaleur régulière et durable.", statut: "approuve" },
  { auteur: "Chloé Fontaine", produitIndex: 4, note: 5, commentaire: "Livraison rapide et qualité exceptionnelle. Très recommandé.", statut: "approuve" },
  { auteur: "Antoine Lefèvre", produitIndex: 4, note: 4, commentaire: "Très beau cadeau que j'ai fait à mes parents. Ils étaient ravis.", statut: "approuve" },
  { auteur: "Léa Moreau", produitIndex: 5, note: 5, commentaire: "Les meilleurs granulés que j'ai jamais utilisés. Combustion parfaite.", statut: "approuve" },
  { auteur: "Hugo Blanchard", produitIndex: 6, note: 5, commentaire: "Je viens de recevoir ma première palette. J'ai hâte de l'hiver ! L'emballage est top.", statut: "en_attente" },
];

/* ══════════════════════════════════════════════════════════════════════════════
 *  FONCTIONS SEED
 * ════════════════════════════════════════════════════════════════════════════ */

async function creerUtilisateur(
  prenom: string,
  nom: string,
  email: string,
  motDePasse: string,
  role: "client" | "gerant" | "admin",
) {
  if (await User.findOne({ email })) {
    console.log(`[seed] Utilisateur ${email} déjà existant.`);
    return;
  }
  const motDePasseHash = await bcrypt.hash(motDePasse, 10);
  await User.create({
    prenom,
    nom,
    email,
    telephone: "",
    motDePasseHash,
    role,
    emailVerifie: true,
    actif: true,
  });
  console.log(`[seed] Utilisateur ${role} créé : ${email}`);
}

/* ── Catalogue (catégories + produits) ──────────────────────────────────── */

async function seedCatalogue() {
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log("[seed] Ancien catalogue supprimé.");

  const mapCategories = new Map<string, string>();

  for (const c of CATEGORIES) {
    const parent = await Category.create({
      nom: c.nom,
      slug: slugify(c.nom),
      description: c.description ?? "",
      ordre: 0,
      active: true,
    });
    mapCategories.set(c.nom, String(parent._id));
  }
  console.log(`[seed] ${CATEGORIES.length} catégorie(s) créée(s).`);

  const produitsBruts = PRODUITS.map((p, index) => {
    const id = mapCategories.get(p.categorie);
    if (!id) {
      console.warn("⚠ Catégorie pour", p.nom, "introuvable");
    }

    const attributs = p.attributs ?? extraireCaracteristiques(p.description);
    const slug = p.slug ?? slugify(p.nom);

    return {
      nom: p.nom,
      slug,
      description: p.description,
      descriptionCourte:
        p.descriptionCourte ?? p.description.replace(/\s+/g, " ").slice(0, 140),
      categorieId: id,
      typeLivraison: p.typeLivraison,
      sku:
        p.sku ??
        `SKU-${String(index + 1).padStart(3, "0")}-${slug
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 12)}`,
      images: [IMAGE_DEFAUT],
      prix: p.prix,
      prixPromo: p.prixPromo ?? null,
      enPromotion: typeof p.prixPromo === "number",
      pourcentageRemise:
        typeof p.prixPromo === "number"
          ? Math.round(((p.prix - p.prixPromo) / p.prix) * 100)
          : 0,
      stock: p.stock,
      poids: p.poids ?? 0,
      variantes: [],
      attributs,
      nombreVentes: p.nombreVentes ?? 0,
      vedette: p.vedette ?? false,
      actif: true,
      tags: [p.typeLivraison, p.categorie],
    };
  });

  await Product.insertMany(produitsBruts);
  console.log(`[seed] ${produitsBruts.length} produits créés.`);
}

/* ── Contenu (bannières, FAQs, coupons) ────────────────────────────────── */

async function seedContenu() {
  await Banner.deleteMany({});
  await Faq.deleteMany({});
  await Coupon.deleteMany({});

  await Banner.insertMany(BANNIERES);
  await Faq.insertMany(FAQS);
  await Coupon.insertMany(COUPONS);
  console.log("[seed] Bannières, FAQs et coupons créés.");
}

/* ── Entrepôts ──────────────────────────────────────────────────────────── */

async function seedDepots() {
  await Depot.deleteMany({});

  const depotsBruts = DEPOTS.map((d) => ({
    ...d,
    slug: slugify(d.nom + " " + d.ville),
  }));

  await Depot.insertMany(depotsBruts);
  console.log(`[seed] ${depotsBruts.length} entrepôt(s) créé(s) (France).`);
}

/* ── Avis clients ──────────────────────────────────────────────────────── */

const mapAuteurs = new Map<string, mongoose.Types.ObjectId>();

async function getIdAuteur(auteur: string): Promise<mongoose.Types.ObjectId> {
  const existant = mapAuteurs.get(auteur);
  if (existant) return existant;

  const [prenom, ...reste] = auteur.split(" ");
  const nom = reste.join(" ");
  const email = `${slugify(prenom)}.${slugify(nom)}@client-demo.fr`;

  let id = (await User.findOne({ email }).lean())?._id;
  if (!id) {
    const u = await User.create({
      prenom,
      nom,
      email,
      telephone: "",
      motDePasseHash: await bcrypt.hash("ChangezMoi123!", 10),
      role: ROLES.CLIENT,
      emailVerifie: true,
      actif: true,
    });
    id = u._id;
  }
  mapAuteurs.set(auteur, id);
  return id;
}

async function seedAvis() {
  await Review.deleteMany({});

  const produits = await Product.find().sort({ nombreVentes: -1 }).lean();
  if (produits.length === 0) return;

  for (const avis of AVIS) {
    const produit = produits[avis.produitIndex];
    if (!produit) continue;

    await Review.create({
      produitId: produit._id,
      clientId: await getIdAuteur(avis.auteur),
      note: avis.note,
      commentaire: avis.commentaire,
      achatVerifie: true,
      statut: avis.statut,
    });
  }

  const avisApprouves = AVIS.filter((a) => a.statut === "approuve");
  const parProduit = new Map<number, { total: number; count: number }>();

  for (const a of avisApprouves) {
    const entry = parProduit.get(a.produitIndex) ?? { total: 0, count: 0 };
    entry.total += a.note;
    entry.count += 1;
    parProduit.set(a.produitIndex, entry);
  }

  for (const [idx, { total, count }] of Array.from(parProduit.entries())) {
    const produit = produits[idx];
    if (!produit) continue;
    await Product.updateOne(
      { _id: produit._id },
      { $set: { noteMoyenne: Math.round((total / count) * 10) / 10, nombreAvis: count } },
    );
  }

  console.log(`[seed] ${AVIS.length} avis client créés.`);
}

/* ── Commandes de démonstration ─────────────────────────────────────────── */

const CHEMIN_STATUTS: Record<StatutCommande, StatutCommande[]> = {
  en_attente: ["en_attente"],
  confirmee: ["en_attente", "confirmee"],
  en_preparation: ["en_attente", "confirmee", "en_preparation"],
  expediee: ["en_attente", "confirmee", "en_preparation", "expediee"],
  livree: ["en_attente", "confirmee", "en_preparation", "expediee", "livree"],
  annulee: ["en_attente", "annulee"],
};

async function seedCommandes(clientId: string) {
  await Order.deleteMany({});

  const produits = await Product.find().sort({ nombreVentes: -1 }).limit(6).lean();
  if (produits.length === 0) return;

  const definition: Array<{
    statutCommande: StatutCommande;
    statutPaiement: StatutPaiement;
    ageJours: number;
  }> = [
      { statutCommande: "livree", statutPaiement: "paye", ageJours: 180 },
      { statutCommande: "livree", statutPaiement: "paye", ageJours: 150 },
      { statutCommande: "livree", statutPaiement: "paye", ageJours: 120 },
      { statutCommande: "livree", statutPaiement: "paye", ageJours: 95 },
      { statutCommande: "livree", statutPaiement: "paye", ageJours: 70 },
      { statutCommande: "expediee", statutPaiement: "paye", ageJours: 50 },
      { statutCommande: "expediee", statutPaiement: "paye", ageJours: 35 },
      { statutCommande: "en_preparation", statutPaiement: "paye", ageJours: 20 },
      { statutCommande: "confirmee", statutPaiement: "paye", ageJours: 10 },
      { statutCommande: "en_attente", statutPaiement: "en_attente", ageJours: 3 },
      { statutCommande: "en_attente", statutPaiement: "en_attente", ageJours: 1 },
    ];

  const adresse = {
    rue: "12 rue Principale",
    ville: "Melay",
    codePostal: "71340",
    pays: "France",
    telephone: "+33 6 12 34 56 78",
  };

  const methodes = ["virement"] as const;

  for (let i = 0; i < definition.length; i++) {
    const spec = definition[i];
    const produit = produits[i % produits.length];
    const quantite = (i % 3) + 1;
    const prixUnitaire = produit.prix;
    const sousTotal = prixUnitaire * quantite;
    const fraisLivraison = sousTotal > 100 ? 0 : 9.9;
    const reduction = i === 2 ? Math.round(sousTotal * 0.1) : 0;
    const total = sousTotal + fraisLivraison - reduction;
    const dateCommande = new Date(Date.now() - spec.ageJours * 86400000);
    const livreeOuExpediee =
      spec.statutCommande === "expediee" || spec.statutCommande === "livree";

    await Order.create({
      numeroCommande: `CMD-${30000 + i}`,
      clientId,
      email: "client@example.com",
      articles: [
        {
          produitId: produit._id,
          nom: produit.nom,
          image: produit.images?.[0] ?? "",
          variante: "",
          prixUnitaire,
          quantite,
          sousTotal,
        },
      ],
      adresseLivraison: adresse,
      adresseFacturation: adresse,
      sousTotal,
      fraisLivraison,
      reduction,
      couponApplique: reduction > 0 ? "BIENVENUE10" : "",
      total,
      statutPaiement: spec.statutPaiement,
      methodePaiement: methodes[i % methodes.length],
      statutCommande: spec.statutCommande,
      historiqueStatuts: CHEMIN_STATUTS[spec.statutCommande].map((statut, idx) => ({
        statut,
        date: new Date(dateCommande.getTime() + idx * 86400000),
        commentaire: "",
      })),
      transporteur: livreeOuExpediee ? "Livraison palette" : "",
      numeroSuivi: livreeOuExpediee ? `TRK${200000 + i * 37}` : "",
      dateCommande,
      dateLivraisonEstimee: new Date(dateCommande.getTime() + 7 * 86400000),
    });
  }

  console.log(`[seed] ${definition.length} commandes de démonstration créées.`);
}

/* ══════════════════════════════════════════════════════════════════════════════
 *  POINT D'ENTRÉE
 * ════════════════════════════════════════════════════════════════════════════ */

async function seed() {
  await dbConnect();

  const emailAdmin = process.env.SEED_ADMIN_EMAIL;
  const passwordAdmin = process.env.SEED_ADMIN_PASSWORD;
  if (!emailAdmin || !passwordAdmin) {
    throw new Error(
      "SEED_ADMIN_EMAIL et SEED_ADMIN_PASSWORD doivent être définis dans .env.local",
    );
  }

  /* ── Utilisateurs ── */
  await creerUtilisateur("Admin", "BHP", emailAdmin, passwordAdmin, ROLES.ADMIN);
  await creerUtilisateur("Manager", "Team", "manager@bhp-bois.com", "ChangezMoi123!", ROLES.GERANT);
  await creerUtilisateur("Client", "Test", "kunde@bhp-bois.com", "ChangezMoi123!", ROLES.CLIENT);

  /* ── Données ── */
  const surVercel = process.env.VERCEL === "1";
  const cataloguePresent = (await Product.countDocuments()) > 0;
  const force = process.env.SEED_FORCE === "true";

  if (surVercel && cataloguePresent && !force) {
    console.log(
      "\n[seed] Catalogue déjà présent, données conservées (déploiement répété).",
    );
    console.log("      Pour forcer la ré-écriture : SEED_FORCE=true");
  } else {
    await seedCatalogue();
    await seedContenu();
    await seedDepots();

    const client = await User.findOne({ email: "kunde@bhp-bois.com" }).lean();
    await seedAvis();
    if (client) {
      await seedCommandes(String(client._id));
    }

    console.log("\n✅ [seed] Terminé avec succès !");
    console.log("   → 5 catégories");
    console.log("   → 36 produits (18 granulés · 5 poêles à bois · 6 bois · 3 accessoires · 4 appareils)");
    console.log("   → 12 avis clients");
    console.log("   → 4 FAQs");
    console.log("   → 4 bannières");
    console.log("   → 2 entrepôts (France)");
    console.log("   → 2 coupons");
    console.log("   → 11 commandes de démonstration\n");
  }

  await mongoose.disconnect();
}

seed().catch((erreur) => {
  console.error("[seed] Erreur :", erreur);
  process.exit(1);
});