import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema, listeProduitsSchema } from "@/lib/zod-schemas/product";
import { genererSlugUnique } from "@/lib/slug-unique";
import { getProduits } from "@/lib/produits";
import { journaliser } from "@/lib/activity";

export async function GET(request: NextRequest) {
  const entrees = Object.fromEntries(request.nextUrl.searchParams.entries());
  const validation = listeProduitsSchema.safeParse(entrees);

  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Paramètres invalides",
      400,
    );
  }

  const resultat = await getProduits(validation.data);
  return apiSuccess(resultat);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Action réservée à l'équipe boutique", 403);
  }

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = productSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();

  const donnees = { ...validation.data };
  if (!donnees.slug) donnees.slug = await genererSlugUnique(Product, donnees.nom);
  if (donnees.prixPromo != null && !donnees.enPromotion) {
    donnees.enPromotion = true;
  }

  try {
    const produit = await Product.create(donnees);
    await journaliser(user.id, "produit.creer", String(produit._id), {
      nom: produit.nom,
      slug: produit.slug,
    });
    return apiSuccess(produit, { status: 201 });
  } catch (erreur) {
    if (
      erreur &&
      typeof erreur === "object" &&
      "code" in erreur &&
      erreur.code === 11000
    ) {
      return apiErreur("Un produit avec ce slug ou ce SKU existe déjà", 409);
    }
    throw erreur;
  }
}