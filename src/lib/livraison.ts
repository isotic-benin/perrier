/**
 * Livraison : Perrier Bois livre gratuitement sur toute la France
 * métropolitaine. Il n'existe qu'un seul mode de livraison.
 */

export const OPTIONS_LIVRAISON = [
  {
    id: "standard",
    libelle: "Livraison standard",
    frais: 0,
    delai: "2 à 4 jours ouvrés",
  },
] as const;

/**
 * Les frais de livraison sont toujours nuls.
 * Conservé comme point d'entrée unique de la règle de facturation.
 */
export function calculerFraisLivraison(): number {
  return 0;
}
