import "server-only";
import type { Model } from "mongoose";
import { slugify } from "@/lib/slugify";

/**
 * Génère un slug unique à partir d'un libellé, en ajoutant un suffixe
 * numérique si le slug existe déjà dans la collection cible.
 */
export async function genererSlugUnique<T>(
  model: Model<T>,
  libelle: string,
  ignoreId?: string,
): Promise<string> {
  const base = slugify(libelle) || "element";
  let candidat = base;
  let suffixe = 1;

  const existe = async (slug: string): Promise<boolean> => {
    const filtre: Record<string, unknown> = { slug };
    if (ignoreId) filtre._id = { $ne: ignoreId };
    const resultat = await (
      model as unknown as Model<Record<string, unknown>>
    )
      .findOne(filtre)
      .select("_id")
      .lean();
    return Boolean(resultat);
  };

  while (await existe(candidat)) {
    suffixe += 1;
    candidat = `${base}-${suffixe}`;
  }

  return candidat;
}