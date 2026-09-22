import { z } from "zod";
import { METHODES_PAIEMENT } from "@/lib/constants";

export const adresseSchema = z.object({
  rue: z.string().trim().min(3, "Adresse requise"),
  ville: z.string().trim().min(2, "Ville requise"),
  codePostal: z.string().trim().default(""),
  pays: z.string().trim().min(2, "Pays requis"),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide"),
});

export const articleCommandeSchema = z.object({
  produitId: z.string().regex(/^[0-9a-f]{24}$/, "Produit invalide"),
  variante: z.string().default(""),
  quantite: z.coerce.number().int().min(1),
});

export const creerCommandeSchema = z.object({
  articles: z.array(articleCommandeSchema).min(1, "Votre panier est vide"),
  adresseLivraison: adresseSchema,
  adresseFacturation: adresseSchema.optional(),
  email: z.string().email("Adresse email invalide"),
  methodePaiement: z.enum(METHODES_PAIEMENT),
  modeLivraison: z.enum(["standard", "express"]),
  reduction: z.coerce.number().min(0).default(0),
  couponApplique: z.string().default(""),
});

export const changerStatutSchema = z.object({
  statut: z.enum([
    "en_attente",
    "confirmee",
    "en_preparation",
    "expediee",
    "livree",
    "annulee",
  ]),
  commentaire: z.string().trim().max(300).default(""),
});

export type CreerCommandeInput = z.infer<typeof creerCommandeSchema>;
export type AdresseInput = z.infer<typeof adresseSchema>;