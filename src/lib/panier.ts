import "server-only";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { prixEffectif } from "@/lib/format";

export interface ArticlePanierValide {
  produitId: string;
  nom: string;
  slug: string;
  image: string;
  variante: string;
  prixUnitaire: number;
  quantite: number;
  stock: number;
}

export async function validerArticles(
  articles: Array<{
    produitId: string;
    variante?: string;
    quantite: number;
  }>,
): Promise<ArticlePanierValide[]> {
  if (articles.length === 0) return [];

  await dbConnect();
  const ids = [...new Set(articles.map((a) => a.produitId))];
  const produits = await Product.find({
    _id: { $in: ids },
    actif: true,
  }).lean();

  const parId = new Map(produits.map((p) => [String(p._id), p]));

  const valides: ArticlePanierValide[] = [];
  for (const article of articles) {
    const produit = parId.get(article.produitId);
    if (!produit) continue;

    const stock = produit.stock;
    if (stock <= 0) continue;

    const quantite = Math.min(
      Math.max(1, Math.floor(article.quantite || 1)),
      stock,
    );

    valides.push({
      produitId: String(produit._id),
      nom: produit.nom,
      slug: produit.slug,
      image: produit.images?.[0] ?? "",
      variante: article.variante ?? "",
      prixUnitaire: prixEffectif(produit),
      quantite,
      stock,
    });
  }

  return valides;
}