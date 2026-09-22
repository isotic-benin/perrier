import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/zod-schemas/category";
import { genererSlugUnique } from "@/lib/slug-unique";
import { estObjectId } from "@/lib/slugify";
import Product from "@/models/Product";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Action réservée à l'administrateur", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Identifiant invalide", 400);

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = categorySchema.partial().safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();

  const categorie = await Category.findById(id);
  if (!categorie) return apiErreur("Catégorie introuvable", 404);

  const donnees = { ...validation.data };
  if (donnees.slug) {
    donnees.slug = await genererSlugUnique(Category, donnees.slug, id);
  } else if (donnees.nom && !donnees.slug) {
    donnees.slug = await genererSlugUnique(Category, donnees.nom, id);
  }

  Object.assign(categorie, donnees);
  await categorie.save();

  return apiSuccess(categorie);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Action réservée à l'administrateur", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Identifiant invalide", 400);

  await dbConnect();

  const categorie = await Category.findById(id);
  if (!categorie) return apiErreur("Catégorie introuvable", 404);

  const aDesProduits = await Product.exists({ categorieId: id });
  if (aDesProduits) {
    return apiErreur(
      "Impossible de supprimer : des produits sont rattachés à cette catégorie",
      409,
    );
  }

  const aDesEnfants = await Category.exists({ parentId: id });
  if (aDesEnfants) {
    return apiErreur(
      "Impossible de supprimer : cette catégorie contient des sous-catégories",
      409,
    );
  }

  await Category.findByIdAndDelete(id);
  return apiSuccess({ id });
}