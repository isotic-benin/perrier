import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Faq from "@/models/Faq";
import { faqSchema } from "@/lib/zod-schemas/faq";
import { journaliser } from "@/lib/activity";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tous = url.searchParams.get("tous") === "1";

  if (tous) {
    const user = await getCurrentUser();
    if (!user) return apiErreur("Non authentifié", 401);
    if (user.role !== ROLES.ADMIN) {
      return apiErreur("Action réservée à l'administrateur", 403);
    }

    await dbConnect();
    const faqs = await Faq.find().sort({ categorie: 1, ordre: 1 }).lean();
    const donnees = faqs.map((f) => ({
      _id: String(f._id),
      question: f.question,
      reponse: f.reponse,
      categorie: f.categorie,
      ordre: f.ordre,
      actif: f.actif,
    }));
    return apiSuccess({ faqs: donnees });
  }

  await dbConnect();

  const faqs = await Faq.find({ actif: true })
    .sort({ categorie: 1, ordre: 1 })
    .lean();

  const groupes = new Map<string, Array<{ _id: string; question: string; reponse: string }>>();
  for (const f of faqs) {
    const categorie = f.categorie || "Général";
    if (!groupes.has(categorie)) groupes.set(categorie, []);
    groupes.get(categorie)!.push({
      _id: String(f._id),
      question: f.question,
      reponse: f.reponse,
    });
  }

  return apiSuccess({
    categories: [...groupes.entries()].map(([categorie, items]) => ({
      categorie,
      items,
    })),
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Action réservée à l'équipe boutique", 403);
  }

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
  const faq = await Faq.create(validation.data);
  await journaliser(user.id, "faq.creer", String(faq._id), {
    question: faq.question,
  });
  return apiSuccess(faq, { status: 201 });
}