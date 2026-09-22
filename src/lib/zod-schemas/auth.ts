import { z } from "zod";

export const inscriptionSchema = z.object({
  prenom: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long"),
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  email: z.email("Adresse email invalide").trim().toLowerCase(),
  telephone: z.string().trim().max(20).optional(),
  motDePasse: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(72, "Le mot de passe est trop long"),
});

export const connexionSchema = z.object({
  email: z.email("Adresse email invalide").trim().toLowerCase(),
  motDePasse: z.string().min(1, "Le mot de passe est requis"),
});

export const motDePasseOublieSchema = z.object({
  email: z.email("Adresse email invalide").trim().toLowerCase(),
});

export const reinitialiserSchema = z
  .object({
    motDePasse: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(72, "Le mot de passe est trop long"),
    confirmation: z.string(),
  })
  .refine((donnees) => donnees.motDePasse === donnees.confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmation"],
  });

export type InscriptionInput = z.infer<typeof inscriptionSchema>;
export type ConnexionInput = z.infer<typeof connexionSchema>;
export type MotDePasseOublieInput = z.infer<typeof motDePasseOublieSchema>;
export type ReinitialiserInput = z.infer<typeof reinitialiserSchema>;