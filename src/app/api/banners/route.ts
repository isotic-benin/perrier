import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Banner from "@/models/Banner";
import { bannerSchema, preparerDates } from "@/lib/zod-schemas/banner";
import { journaliser } from "@/lib/activity";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Action réservée à l'administrateur", 403);
  }

  await dbConnect();
  const bannieres = await Banner.find().sort({ ordre: 1 }).lean();

  const donnees = bannieres.map((b) => ({
    _id: String(b._id),
    titre: b.titre,
    sousTitre: b.sousTitre,
    image: b.image,
    lienBouton: b.lienBouton,
    texteBouton: b.texteBouton,
    ordre: b.ordre,
    actif: b.actif,
    dateDebut: b.dateDebut ? b.dateDebut.toISOString() : null,
    dateFin: b.dateFin ? b.dateFin.toISOString() : null,
  }));

  return apiSuccess({ bannieres: donnees });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Action réservée à l'administrateur", 403);
  }

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = bannerSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données invalides",
      400,
    );
  }

  await dbConnect();
  const banniere = await Banner.create(preparerDates(validation.data));
  await journaliser(user.id, "banniere.creer", String(banniere._id), {
    titre: banniere.titre,
  });
  return apiSuccess(banniere, { status: 201 });
}