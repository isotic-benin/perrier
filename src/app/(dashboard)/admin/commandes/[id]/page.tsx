import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/dal";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { estObjectId } from "@/lib/slugify";
import {
  CommandeDetail,
  type CommandeDetailData,
} from "@/components/dashboard/commande-detail";

export const metadata: Metadata = {
  title: "Détails de la commande",
};

export default async function AdminDetailCommandePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!estObjectId(id)) notFound();

  await requireAdmin();

  await dbConnect();
  const commande = await Order.findById(id)
    .populate<{ clientId: { prenom: string; nom: string; email: string } }>(
      "clientId",
      "prenom nom email",
    )
    .lean();
  if (!commande) notFound();

  const donnees: CommandeDetailData = {
    _id: String(commande._id),
    numeroCommande: commande.numeroCommande,
    dateCommande: commande.dateCommande.toISOString(),
    statutCommande: commande.statutCommande,
    statutPaiement: commande.statutPaiement,
    methodePaiement: commande.methodePaiement,
    articles: commande.articles.map((a) => ({
      produitId: String(a.produitId),
      nom: a.nom,
      variante: a.variante,
      quantite: a.quantite,
      sousTotal: a.sousTotal,
    })),
    adresseLivraison: {
      rue: commande.adresseLivraison.rue,
      ville: commande.adresseLivraison.ville,
      codePostal: commande.adresseLivraison.codePostal ?? "",
      pays: commande.adresseLivraison.pays,
      telephone: commande.adresseLivraison.telephone ?? "",
    },
    sousTotal: commande.sousTotal,
    fraisLivraison: commande.fraisLivraison,
    reduction: commande.reduction,
    total: commande.total,
    transporteur: commande.transporteur ?? "",
    numeroSuivi: commande.numeroSuivi ?? "",
    historiqueStatuts: commande.historiqueStatuts.map((h) => ({
      statut: h.statut,
      date: h.date.toISOString(),
      commentaire: h.commentaire ?? "",
    })),
    client:
      commande.clientId && typeof commande.clientId === "object"
        ? {
            prenom: commande.clientId.prenom,
            nom: commande.clientId.nom,
            email: commande.clientId.email,
          }
        : null,
  };

  return (
    <CommandeDetail
      commande={donnees}
      baseHref="/admin/commandes"
      retourLabel="Retour aux commandes"
    />
  );
}