import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Faq from "@/models/Faq";
import { estObjectId } from "@/lib/slugify";
import { faqSchema } from "@/lib/zod-schemas/faq";
import { journaliser } from "@/lib/activity";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Action réservée à l'équipe boutique", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Identifiant invalide", 400);

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = faqSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();
  const faq = await Faq.findByIdAndUpdate(id, validation.data, { new: true });
  if (!faq) return apiErreur("Question introuvable", 404);

  await journaliser(user.id, "faq.modifier", id, { question: faq.question });

  return apiSuccess(faq);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Suppression réservée à l'administrateur", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Identifiant invalide", 400);

  await dbConnect();
  const resultat = await Faq.findByIdAndDelete(id);
  if (!resultat) return apiErreur("Question introuvable", 404);

  await journaliser(user.id, "faq.supprimer", id, { question: resultat.question });

  return apiSuccess({ id });
}