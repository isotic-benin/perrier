export function formaterPrix(prix: number, devise = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise,
  }).format(prix);
}

export function prixEffectif(produit: {
  prix: number;
  prixPromo?: number | null;
}): number {
  return produit.prixPromo != null ? produit.prixPromo : produit.prix;
}

export function estEnPromotion(produit: {
  prix: number;
  prixPromo?: number | null;
  enPromotion?: boolean;
}): boolean {
  if (produit.enPromotion) return true;
  return (
    produit.prixPromo != null &&
    produit.prixPromo > 0 &&
    produit.prixPromo < produit.prix
  );
}

export function calculerRemise(produit: {
  prix: number;
  prixPromo?: number | null;
  enPromotion?: boolean;
}): number {
  if (!estEnPromotion(produit) || produit.prixPromo == null || produit.prix <= 0) {
    return 0;
  }
  return Math.round(((produit.prix - produit.prixPromo) / produit.prix) * 100);
}