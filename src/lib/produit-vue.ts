import { estEnPromotion } from "@/lib/format";

export interface ProduitVue {
  _id: string;
  nom: string;
  slug: string;
  descriptionCourte: string;
  images: string[];
  prix: number;
  prixPromo: number | null;
  enPromotion: boolean;
  typeLivraison: "retrait" | "livraison_portail" | "livraison_garage";
  noteMoyenne: number;
  nombreAvis: number;
  stock: number;
  tags: string[];
}

export interface ProduitBrut {
  _id: unknown;
  nom: string;
  slug: string;
  descriptionCourte?: string;
  images?: string[];
  prix: number;
  prixPromo?: number | null;
  enPromotion?: boolean;
  typeLivraison?: "retrait" | "livraison_portail" | "livraison_garage";
  noteMoyenne?: number;
  nombreAvis?: number;
  stock?: number;
  tags?: string[];
}

export function produireProduitVue(produit: ProduitBrut): ProduitVue {
  return {
    _id: String(produit._id),
    nom: produit.nom,
    slug: produit.slug,
    descriptionCourte: produit.descriptionCourte ?? "",
    images: produit.images ?? [],
    prix: produit.prix,
    prixPromo: produit.prixPromo ?? null,
    enPromotion: estEnPromotion(produit),
    typeLivraison: produit.typeLivraison ?? "retrait",
    noteMoyenne: produit.noteMoyenne ?? 0,
    nombreAvis: produit.nombreAvis ?? 0,
    stock: produit.stock ?? 0,
    tags: produit.tags ?? [],
  };
}