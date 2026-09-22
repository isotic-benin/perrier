import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { creerCommandeSchema } from "@/lib/zod-schemas/commande";
import { validerArticles } from "@/lib/panier";
import { creerCommande } from "@/lib/commandes";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import Settings from "@/models/Settings";
import { envoyerEmailPaiement } from "@/lib/email";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = creerCommandeSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Données de commande invalides",
      400,
    );
  }

  const valides = await validerArticles(validation.data.articles);
  if (valides.length === 0) {
    return apiErreur(
      "Aucun article valide dans le panier (stock ou prix modifié)",
      400,
    );
  }

  const commande = await creerCommande({
    clientId: user?.id ?? null,
    email: validation.data.email,
    articles: valides.map((a) => ({
      produitId: a.produitId,
      nom: a.nom,
      image: a.image,
      variante: a.variante,
      prixUnitaire: a.prixUnitaire,
      quantite: a.quantite,
    })),
    adresseLivraison: validation.data.adresseLivraison,
    adresseFacturation:
      validation.data.adresseFacturation ?? validation.data.adresseLivraison,
    methodePaiement: validation.data.methodePaiement,
    modeLivraison: validation.data.modeLivraison,
    reduction: validation.data.reduction,
    couponApplique: validation.data.couponApplique,
  });

  await dbConnect();
  const ribSetting = await Settings.findOne({ cle: "rib_bancaire" }).lean();
  const rib = ribSetting?.valeur as {
    titulaire: string;
    banque: string;
    iban: string;
    bic: string;
    siege: string;
  } | null;

  await envoyerEmailPaiement({
    email: validation.data.email,
    numeroCommande: commande.numeroCommande,
    total: commande.total,
    rib,
  });

  return apiSuccess({ commande }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);

  const page = Math.max(
    1,
    Number(request.nextUrl.searchParams.get("page")) || 1,
  );
  const limite = Math.min(
    50,
    Math.max(1, Number(request.nextUrl.searchParams.get("limite")) || 20),
  );

  await dbConnect();
  const [commandes, total] = await Promise.all([
    Order.find({})
      .sort({ dateCommande: -1 })
      .skip((page - 1) * limite)
      .limit(limite)
      .lean(),
    Order.countDocuments({}),
  ]);

  return apiSuccess({ commandes, total, page, limite });
}