export function slugify(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const estObjectId = (valeur: string): boolean =>
  /^[0-9a-fA-F]{24}$/.test(valeur);