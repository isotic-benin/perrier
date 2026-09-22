export const OPTIONS_LIVRAISON = [
  {
    id: "standard",
    libelle: "Standard",
    frais: 6.9,
    delai: "2 à 4 jours ouvrés",
  },
  {
    id: "express",
    libelle: "Express",
    frais: 12.9,
    delai: "24 à 48 heures",
  },
] as const;

export const SEUIL_LIVRAISON_GRATUITE = 75;

export function calculerFraisLivraison(
  sousTotal: number,
  mode: string,
): number {
  if (sousTotal >= SEUIL_LIVRAISON_GRATUITE) return 0;
  const option = OPTIONS_LIVRAISON.find((o) => o.id === mode);
  return option?.frais ?? OPTIONS_LIVRAISON[0].frais;
}