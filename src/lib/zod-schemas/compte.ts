import { z } from "zod";

export const adresseCompteSchema = z.object({
  label: z.string().trim().min(2, "Libellé requis"),
  rue: z.string().trim().min(3, "Adresse requise"),
  ville: z.string().trim().min(2, "Ville requise"),
  codePostal: z.string().trim().default(""),
  pays: z.string().trim().min(2, "Pays requis"),
  telephone: z.string().trim().default(""),
  parDefaut: z.boolean().default(false),
});

export const avisSchema = z.object({
  produitId: z.string().regex(/^[0-9a-f]{24}$/, "Produit invalide"),
  note: z.coerce.number().int().min(1, "Note minimale : 1").max(5, "Note maximale : 5"),
  commentaire: z
    .string()
    .trim()
    .min(3, "Commentaire trop court")
    .max(1000, "Commentaire trop long"),
  images: z.array(z.string()).max(4).default([]),
});

export const modererAvisSchema = z.object({
  statut: z.enum(["en_attente", "approuve", "rejete"]),
  reponseAdmin: z.string().trim().max(500).default(""),
});

export const profilSchema = z.object({
  nom: z.string().trim().min(2, "Nom requis"),
  prenom: z.string().trim().min(2, "Prénom requis"),
  telephone: z.string().trim().default(""),
});

export const motDePasseSchema = z
  .object({
    actuel: z.string().min(6, "Mot de passe actuel requis"),
    nouveau: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmation: z.string(),
  })
  .refine((data) => data.nouveau === data.confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmation"],
  });

export type AdresseCompteInput = z.infer<typeof adresseCompteSchema>;
export type AvisInput = z.infer<typeof avisSchema>;