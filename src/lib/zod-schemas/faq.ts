import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().trim().min(3, "Question trop courte").max(300),
  reponse: z.string().trim().min(3, "Réponse trop courte").max(2000),
  categorie: z.string().trim().min(2, "Catégorie requise").max(60),
  ordre: z.coerce.number().int().min(0).default(0),
  actif: z.boolean().default(true),
});

export type FaqInput = z.infer<typeof faqSchema>;