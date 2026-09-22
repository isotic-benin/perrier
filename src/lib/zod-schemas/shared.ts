import type { z } from "zod";

export interface ActionState {
  erreurs?: Record<string, string[] | undefined>;
  message?: string;
}

export const retourErreurs = (erreur: z.ZodError): ActionState => ({
  erreurs: erreur.flatten().fieldErrors,
});