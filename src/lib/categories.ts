import "server-only";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";

export interface CategorieArbre {
  _id: string;
  nom: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  ordre: number;
  active: boolean;
  metaTitle: string;
  metaDescription: string;
  sousCategories: CategorieArbre[];
}

export async function getArbreCategories(): Promise<CategorieArbre[]> {
  await dbConnect();

  const categories = await Category.find({ active: true })
    .sort({ ordre: 1, nom: 1 })
    .lean();

  const noeuds = new Map<string, CategorieArbre>();
  categories.forEach((cat) => {
    noeuds.set(cat._id.toString(), {
      _id: cat._id.toString(),
      nom: cat.nom,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      parentId: cat.parentId ? cat.parentId.toString() : null,
      ordre: cat.ordre,
      active: cat.active,
      metaTitle: cat.metaTitle,
      metaDescription: cat.metaDescription,
      sousCategories: [],
    });
  });

  const racines: CategorieArbre[] = [];
  noeuds.forEach((noeud) => {
    const parent = noeud.parentId ? noeuds.get(noeud.parentId) : undefined;
    if (parent) {
      parent.sousCategories.push(noeud);
    } else {
      racines.push(noeud);
    }
  });

  return racines;
}

export async function getCategorieParSlug(slug: string) {
  await dbConnect();
  return Category.findOne({ slug, active: true }).lean();
}

export async function getCategorieParId(id: string) {
  await dbConnect();
  return Category.findOne({ _id: id, active: true }).lean();
}

export async function getSousCategorieParSlugs(slug: string, sousSlug: string) {
  await dbConnect();
  const parent = await Category.findOne({ slug, active: true }).lean();
  if (!parent) return null;

  const sousCategorie = await Category.findOne({
    slug: sousSlug,
    parentId: parent._id,
    active: true,
  }).lean();

  return sousCategorie ? { parent, sousCategorie } : null;
}