import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Adresse email invalide"),
});