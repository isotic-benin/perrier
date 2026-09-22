import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Coupon from "@/models/Coupon";
import { couponSchema, preparerDates } from "@/lib/zod-schemas/coupon";
import { journaliser } from "@/lib/activity";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Action réservée à l'équipe boutique", 403);
  }

  await dbConnect();
  const coupons = await Coupon.find().sort({ _id: -1 }).lean();

  const donnees = coupons.map((c) => ({
    _id: String(c._id),
    code: c.code,
    type: c.type,
    valeur: c.valeur,
    montantMinimum: c.montantMinimum,
    dateDebut: c.dateDebut ? c.dateDebut.toISOString() : null,
    dateFin: c.dateFin ? c.dateFin.toISOString() : null,
    usageMax: c.usageMax,
    usageActuel: c.usageActuel,
    categoriesApplicables: c.categoriesApplicables.map(String),
    actif: c.actif,
  }));

  return apiSuccess({ coupons: donnees });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Action réservée à l'équipe boutique", 403);
  }

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = couponSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();

  try {
    const coupon = await Coupon.create(preparerDates(validation.data));
    await journaliser(user.id, "coupon.creer", String(coupon._id), {
      code: coupon.code,
    });
    return apiSuccess(coupon, { status: 201 });
  } catch (erreur) {
    if (
      erreur &&
      typeof erreur === "object" &&
      "code" in erreur &&
      erreur.code === 11000
    ) {
      return apiErreur("Ce code existe déjà", 409);
    }
    throw erreur;
  }
}