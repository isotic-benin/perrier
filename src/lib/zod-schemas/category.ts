import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .min(2, "Le slug doit contenir au moins 2 caractères")
  .max(60, "Le slug est trop long")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Format invalide (minuscules, chiffres et tirets uniquement)",
  );

export const categorySchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(60, "Le nom est trop long"),
  slug: slugSchema,
  description: z.string().trim().max(500).default(""),
  image: z.string().trim().url("URL invalide").or(z.literal("")).default(""),
  parentId: z
    .string()
    .regex(/^[0-9a-f]{24}$/, "Catégorie parente invalide")
    .nullable()
    .default(null),
  ordre: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  metaTitle: z.string().trim().max(160).default(""),
  metaDescription: z.string().trim().max(300).default(""),
});

export type CategoryInput = z.infer<typeof categorySchema>;