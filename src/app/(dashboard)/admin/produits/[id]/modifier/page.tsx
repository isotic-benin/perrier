import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { estObjectId } from "@/lib/slugify";
import {
  FormulaireProduit,
  type FormulaireProduitDonnees,
} from "@/components/dashboard/formulaire-produit";

export default async function ModifierProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!estObjectId(id)) notFound();

  await requireAdmin();

  await dbConnect();
  const produit = await Product.findById(id).lean();
  if (!produit) notFound();

  const donnees: FormulaireProduitDonnees = {
    _id: String(produit._id),
    nom: produit.nom,
    slug: produit.slug,
    description: produit.description ?? "",
    descriptionCourte: produit.descriptionCourte ?? "",
    categorieId: String(produit.categorieId),
    typeLivraison: produit.typeLivraison ?? "retrait",
    sku: produit.sku,
    images: produit.images ?? [],
    prix: produit.prix,
    prixPromo: produit.prixPromo ?? null,
    enPromotion: produit.enPromotion ?? false,
    pourcentageRemise: produit.pourcentageRemise ?? 0,
    stock: produit.stock ?? 0,
    seuilAlerteStock: produit.seuilAlerteStock ?? 5,
    variantes: (produit.variantes ?? []).map((v) => ({
      nom: v.nom,
      valeur: v.valeur,
      stockVariante: v.stockVariante ?? 0,
      prixSupplement: v.prixSupplement ?? 0,
      sku: v.sku ?? "",
    })),
    attributs: (produit.attributs ?? []).map((a) => ({
      cle: a.cle,
      valeur: a.valeur,
    })),
    poids: produit.poids ?? 0,
    actif: produit.actif ?? true,
    vedette: produit.vedette ?? false,
    tags: produit.tags ?? [],
    metaTitle: produit.metaTitle ?? "",
    metaDescription: produit.metaDescription ?? "",
  };

  return <FormulaireProduit produit={donnees} titre="Modifier le produit" />;
}