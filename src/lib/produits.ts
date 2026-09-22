import "server-only";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import type { ListeProduitsInput, TriProduits } from "@/lib/zod-schemas/product";
import type { ProduitBrut } from "@/lib/produit-vue";

export interface ResultatProduits {
  produits: ProduitBrut[];
  total: number;
  page: number;
  limite: number;
  pagesTotales: number;
}

export function filtreEnPromotion(): Record<string, unknown> {
  return {
    $or: [
      { enPromotion: true },
      {
        $expr: {
          $and: [
            { $ne: ["$prixPromo", null] },
            { $gt: ["$prixPromo", 0] },
            { $lt: ["$prixPromo", "$prix"] },
          ],
        },
      },
    ],
  };
}

const TRIS: Record<TriProduits, Record<string, 1 | -1> | undefined> = {
  pertinence: undefined,
  prix_asc: { prix: 1 },
  prix_desc: { prix: -1 },
  popularite: { nombreVentes: -1 },
  nouveaute: { dateCreation: -1 },
};

export async function getProduits(
  query: ListeProduitsInput & { categorieIds?: string[] },
): Promise<ResultatProduits> {
  await dbConnect();

  const page = query.page ?? 1;
  const limite = query.limite ?? 24;

  const filtre: Record<string, unknown> = { actif: true };

  if (query.categorieIds && query.categorieIds.length > 0) {
    filtre.categorieId = { $in: query.categorieIds };
  } else if (query.categorie) {
    filtre.categorieId = query.categorie;
  } else if (query.sousCategorie) {
    filtre.categorieId = query.sousCategorie;
  }

  if (query.recherche) {
    filtre.$text = { $search: query.recherche };
  }

  if (query.typeLivraison) {
    filtre.typeLivraison = query.typeLivraison;
  }

  if (query.prixMin !== undefined || query.prixMax !== undefined) {
    const fourchette: Record<string, number> = {};
    if (query.prixMin !== undefined) fourchette.$gte = query.prixMin;
    if (query.prixMax !== undefined) fourchette.$lte = query.prixMax;
    filtre.$or = [{ prix: fourchette }, { prixPromo: fourchette }];
  }

  if (query.noteMin !== undefined) {
    filtre.noteMoyenne = { $gte: query.noteMin };
  }

  if (query.enPromotion === "true") {
    const promo = filtreEnPromotion();
    filtre.$or = [
      ...(Array.isArray(filtre.$or) ? (filtre.$or as unknown[]) : []),
      ...(promo.$or as unknown[]),
    ];
  }

  if (query.enStock === "true") {
    filtre.stock = { $gt: 0 };
  }

  let sort: Record<string, 1 | -1 | { $meta: string }> | undefined =
    TRIS[query.tri ?? "pertinence"];
  const projection: Record<string, unknown> = {};

  if (query.recherche) {
    sort = { score: { $meta: "textScore" } };
    projection.score = { $meta: "textScore" };
  }

  if (!sort || Object.keys(sort).length === 0) {
    sort = { dateCreation: -1 };
  }

  const [produits, total] = await Promise.all([
    Product.find(filtre, projection)
      .sort(sort)
      .skip((page - 1) * limite)
      .limit(limite)
      .lean(),
    Product.countDocuments(filtre),
  ]);

  return {
    produits: produits as ProduitBrut[],
    total,
    page,
    limite,
    pagesTotales: Math.ceil(total / limite),
  };
}

export async function getProduitParSlug(slug: string) {
  await dbConnect();
  return Product.findOne({ slug, actif: true }).lean();
}

export async function getProduitsSimilaires(
  produitId: string,
  categorieId: string,
  limite = 4,
) {
  await dbConnect();
  return Product.find({
    categorieId,
    _id: { $ne: produitId },
    actif: true,
  })
    .sort({ nombreVentes: -1 })
    .limit(limite)
    .lean();
}

export async function getTypesLivraison(): Promise<
  Array<{ typeLivraison: string; nombre: number }>
> {
  await dbConnect();
  return Product.aggregate([
    { $match: { actif: true, typeLivraison: { $ne: null } } },
    { $group: { _id: "$typeLivraison", nombre: { $sum: 1 } } },
    { $project: { _id: 0, typeLivraison: "$_id", nombre: 1 } },
    { $sort: { nombre: -1, typeLivraison: 1 } },
  ]);
}