import { z } from "zod";
import { slugSchema } from "./category";

export const varianteSchema = z.object({
  nom: z.string().trim().min(1, "Nom de variante requis"),
  valeur: z.string().trim().min(1, "Valeur de variante requise"),
  stockVariante: z.coerce.number().int().min(0).default(0),
  prixSupplement: z.coerce.number().min(0).default(0),
  sku: z.string().trim().default(""),
});

export const attributSchema = z.object({
  cle: z.string().trim().min(1, "Clé d'attribut requise"),
  valeur: z.string().trim().min(1, "Valeur d'attribut requise"),
});

const imageUrlSchema = z.string().trim().refine(
  (val) => val.startsWith("/") || val.startsWith("http"),
  "URL d'image invalide (doit commencer par / ou http)"
);

export const productSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(120, "Le nom est trop long"),
  slug: slugSchema,
  description: z.string().trim().default(""),
  descriptionCourte: z.string().trim().max(300).default(""),
  categorieId: z.string().regex(/^[0-9a-f]{24}$/, "Catégorie invalide"),
  typeLivraison: z.enum(["retrait", "livraison_portail", "livraison_garage"]).default("retrait"),
  sku: z.string().trim().min(1, "Le SKU est requis").max(60),
  images: z.array(imageUrlSchema).default([]),
  prix: z.coerce.number().min(0, "Prix invalide"),
  prixPromo: z.coerce.number().min(0).nullable().default(null),
  enPromotion: z.boolean().default(false),
  pourcentageRemise: z.coerce.number().min(0).max(100).default(0),
  stock: z.coerce.number().int().min(0).default(0),
  seuilAlerteStock: z.coerce.number().int().min(0).default(5),
  variantes: z.array(varianteSchema).default([]),
  attributs: z.array(attributSchema).default([]),
  poids: z.coerce.number().min(0).default(0),
  actif: z.boolean().default(true),
  vedette: z.boolean().default(false),
  tags: z.array(z.string().trim()).default([]),
  metaTitle: z.string().trim().max(160).default(""),
  metaDescription: z.string().trim().max(300).default(""),
});

export const triProduits = [
  "pertinence",
  "prix_asc",
  "prix_desc",
  "popularite",
  "nouveaute",
] as const;

export type TriProduits = (typeof triProduits)[number];

export const listeProduitsSchema = z.object({
  categorie: z.string().regex(/^[0-9a-f]{24}$/).optional(),
  sousCategorie: z.string().regex(/^[0-9a-f]{24}$/).optional(),
  recherche: z.string().trim().max(100).optional(),
  typeLivraison: z.enum(["retrait", "livraison_portail", "livraison_garage"]).optional(),
  prixMin: z.coerce.number().min(0).optional(),
  prixMax: z.coerce.number().min(0).optional(),
  noteMin: z.coerce.number().min(0).max(5).optional(),
  enPromotion: z.enum(["true", "false"]).optional(),
  enStock: z.enum(["true", "false"]).optional(),
  tri: z.enum(triProduits).default("pertinence"),
  page: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(48).default(12),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ListeProduitsInput = z.infer<typeof listeProduitsSchema>;