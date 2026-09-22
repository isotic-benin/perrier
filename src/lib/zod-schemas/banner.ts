import { z } from "zod";

export const bannerSchema = z.object({
  titre: z.string().trim().max(120).default(""),
  sousTitre: z.string().trim().max(200).default(""),
  image: z.string().trim().default(""),
  lienBouton: z.string().trim().default(""),
  texteBouton: z.string().trim().max(40).default("Découvrir"),
  ordre: z.coerce.number().int().min(0).default(0),
  actif: z.boolean().default(true),
  dateDebut: z.string().trim().nullable().default(null),
  dateFin: z.string().trim().nullable().default(null),
});

export type BannerInput = z.infer<typeof bannerSchema>;

export function preparerDates(donnees: BannerInput) {
  return {
    ...donnees,
    dateDebut: donnees.dateDebut ? new Date(donnees.dateDebut) : null,
    dateFin: donnees.dateFin ? new Date(donnees.dateFin) : null,
  };
}