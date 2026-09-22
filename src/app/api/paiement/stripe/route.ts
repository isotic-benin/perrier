import type { NextRequest } from "next/server";
import Stripe from "stripe";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { estObjectId } from "@/lib/slugify";

const cleSecrete = process.env.STRIPE_SECRET_KEY ?? "";
const devise = (process.env.NEXT_PUBLIC_STRIPE_CURRENCY ?? "xof").toLowerCase();
const urlApp = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Non authentifié", 401);

  const corps = await request.json().catch(() => null);
  const commandeId = corps?.commandeId;
  if (!commandeId || !estObjectId(commandeId)) {
    return apiErreur("Identifiant de commande invalide", 400);
  }

  if (!cleSecrete) {
    return apiErreur(
      "Paiement en ligne non configuré (STRIPE_SECRET_KEY manquante)",
      501,
    );
  }

  await dbConnect();
  const commande = await Order.findById(commandeId).lean();
  if (!commande) return apiErreur("Commande introuvable", 404);

  const autorise =
    user.role === ROLES.ADMIN ||
    user.role === ROLES.GERANT ||
    String(commande.clientId) === user.id;
  if (!autorise) return apiErreur("Accès refusé", 403);

  if (commande.methodePaiement !== "virement") {
    return apiErreur("Cette commande n'utilise pas le paiement par virement", 400);
  }

  const stripe = new Stripe(cleSecrete);

  const profil = await User.findById(user.id).lean();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: commande.articles.map((article) => ({
      price_data: {
        currency: devise,
        product_data: { name: article.nom },
        unit_amount: Math.round(article.prixUnitaire * 100),
      },
      quantity: article.quantite,
    })),
    customer_email: profil?.email ?? undefined,
    client_reference_id: String(commande._id),
    metadata: { commandeId: String(commande._id) },
    success_url: `${urlApp}/commande/confirmation/${String(commande._id)}?statut=reussi`,
    cancel_url: `${urlApp}/commande/confirmation/${String(commande._id)}?statut=annule`,
  });

  return apiSuccess({ url: session.url });
}