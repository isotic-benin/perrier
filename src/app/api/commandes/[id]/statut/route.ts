import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { estObjectId } from "@/lib/slugify";
import { changerStatutSchema } from "@/lib/zod-schemas/commande";
import { envoyerStatutCommande } from "@/lib/email";
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
  if (!corps) return apiErreur("Corps de requête invalide", 400);

  const validation = changerStatutSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Statut invalide",
      400,
    );
  }

  await dbConnect();

  const commande = await Order.findById(id);
  if (!commande) return apiErreur("Commande introuvable", 404);

  const ancienStatut = commande.statutCommande;
  const nouveauStatut = validation.data.statut;

  commande.statutCommande = nouveauStatut;
  commande.historiqueStatuts.push({
    statut: nouveauStatut,
    date: new Date(),
    commentaire: validation.data.commentaire,
  });

  if (nouveauStatut === "annulee" && ancienStatut !== "annulee") {
    await Promise.all(
      commande.articles.map((article) =>
        Product.updateOne(
          { _id: article.produitId },
          { $inc: { stock: article.quantite, nombreVentes: -article.quantite } },
        ),
      ),
    );
  }

  await commande.save();

  const client = await User.findById(commande.clientId).lean();
  if (client) {
    await envoyerStatutCommande({
      email: client.email,
      prenom: client.prenom,
      numeroCommande: commande.numeroCommande,
      statut: nouveauStatut,
    });
  }

  await journaliser(user.id, "commande.statut", String(commande._id), {
    numero: commande.numeroCommande,
    ancien: ancienStatut,
    nouveau: nouveauStatut,
  });

  return apiSuccess(commande);
}