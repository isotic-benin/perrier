import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Votre nom est requis").max(80),
  email: z.email("Adresse email invalide"),
  sujet: z.string().trim().min(3, "Sujet trop court").max(120),
  message: z.string().trim().min(10, "Message trop court").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;