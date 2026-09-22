import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import Newsletter from "@/models/Newsletter";
import { newsletterSchema } from "@/lib/zod-schemas/newsletter";
import { apiSuccess, apiErreur } from "@/lib/api-response";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Action réservée à l'administrateur", 403);
  }

  await dbConnect();
  const abonnes = await Newsletter.find().sort({ dateInscription: -1 }).lean();

  const donnees = abonnes.map((a) => ({
    _id: String(a._id),
    email: a.email,
    actif: a.actif,
    dateInscription: a.dateInscription,
  }));

  return apiSuccess({ abonnes: donnees, total: donnees.length });
}

export async function POST(req: Request) {
  const corps = await req.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = newsletterSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Adresse email invalide",
      400,
    );
  }

  const email = validation.data.email.toLowerCase();

  await dbConnect();

  const existant = await Newsletter.findOne({ email });
  if (existant) {
    if (!existant.actif) {
      await Newsletter.updateOne(
        { _id: existant._id },
        { $set: { actif: true } },
      );
    }
    return apiSuccess({ message: "Vous êtes déjà inscrit à la newsletter." });
  }

  await Newsletter.create({ email });
  return apiSuccess(
    { message: "Merci ! Votre inscription est confirmée." },
    { status: 201 },
  );
}