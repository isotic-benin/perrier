import type { NextRequest } from "next/server";
import Stripe from "stripe";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { envoyerConfirmationCommande } from "@/lib/email";

const cleSecrete = process.env.STRIPE_SECRET_KEY ?? "";
const secretWebhook = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!cleSecrete || !secretWebhook) {
    return apiErreur("Stripe non configuré", 501);
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return apiErreur("Signature manquante", 400);

  const corps = await request.text();

  const stripe = new Stripe(cleSecrete);
  let evenement: Stripe.Event;
  try {
    evenement = stripe.webhooks.constructEvent(
      corps,
      signature,
      secretWebhook,
    );
  } catch (erreur) {
    return apiErreur(
      erreur instanceof Error ? erreur.message : "Signature invalide",
      400,
    );
  }

  if (evenement.type === "checkout.session.completed") {
    const session = evenement.data.object as Stripe.Checkout.Session;
    const commandeId = session.metadata?.commandeId;

    if (commandeId) {
      await dbConnect();
      const commande = await Order.findById(commandeId);
      if (commande && commande.statutPaiement === "en_attente") {
        commande.statutPaiement = "paye";
        commande.statutCommande = "confirmee";
        commande.historiqueStatuts.push({
          statut: "confirmee",
          date: new Date(),
          commentaire: "Paiement reçu",
        });
        await commande.save();

        const client = await User.findById(commande.clientId).lean();
        if (client) {
          await envoyerConfirmationCommande({
            email: client.email,
            prenom: client.prenom,
            numeroCommande: commande.numeroCommande,
            total: commande.total,
          });
        }
      }
    }
  }

  return apiSuccess({ recu: true });
}