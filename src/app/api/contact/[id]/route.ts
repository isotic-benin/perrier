import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Contact from "@/models/ContactMessage";
import { estObjectId } from "@/lib/slugify";
import { journaliser } from "@/lib/activity";

export async function PATCH(
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
  if (!corps || (corps.statut !== "nouveau" && corps.statut !== "traite")) {
    return apiErreur("Champ 'statut' invalide", 400);
  }

  await dbConnect();
  const message = await Contact.findByIdAndUpdate(
    id,
    { $set: { statut: corps.statut } },
    { new: true },
  );
  if (!message) return apiErreur("Message introuvable", 404);

  await journaliser(user.id, "contact.statut", id, {
    sujet: message.sujet,
    statut: message.statut,
  });

  return apiSuccess({ id, statut: message.statut });
}