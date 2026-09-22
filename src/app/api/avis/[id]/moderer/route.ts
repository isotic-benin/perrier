import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Review from "@/models/Review";
import { estObjectId } from "@/lib/slugify";
import { modererAvisSchema } from "@/lib/zod-schemas/compte";
import { recalculerNoteProduit } from "@/lib/avis";
import { journaliser } from "@/lib/activity";

export async function PATCH(
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

  const validation = modererAvisSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();

  const avis = await Review.findById(id);
  if (!avis) return apiErreur("Avis introuvable", 404);

  avis.statut = validation.data.statut;
  if (validation.data.reponseAdmin) {
    avis.reponseAdmin = validation.data.reponseAdmin;
  }
  await avis.save();

  if (validation.data.statut !== "en_attente") {
    await recalculerNoteProduit(String(avis.produitId));
  }

  await journaliser(user.id, "avis.moderer", id, {
    statut: validation.data.statut,
    produitId: String(avis.produitId),
  });

  return apiSuccess(avis);
}