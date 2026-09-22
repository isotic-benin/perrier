import "server-only";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Review from "@/models/Review";
import User from "@/models/User";

export interface LigneCommande {
  _id: string;
  numeroCommande: string;
  client: string;
  total: number;
  statutCommande: string;
  statutPaiement: string;
  dateCommande: Date;
}

export interface StatsDashboard {
  chiffreAffaires: number;
  nombreCommandes: number;
  commandesEnAttente: number;
  nombreClients: number;
  nombreProduits: number;
  stockFaible: number;
  avisEnAttente: number;
  commandesParStatut: Array<{ statut: string; nombre: number }>;
  revenusParMois: Array<{ mois: string; total: number }>;
  derniersCommandes: LigneCommande[];
  meilleuresVentes: Array<{
    _id: string;
    nom: string;
    nombreVentes: number;
    prix: number;
    prixPromo: number | null;
    images: string[];
  }>;
}

export async function getLignesCommandes(
  limite = 100,
): Promise<LigneCommande[]> {
  await dbConnect();
  const commandes = await Order.find()
    .populate<{ clientId: { prenom: string; nom: string } }>(
      "clientId",
      "prenom nom",
    )
    .sort({ dateCommande: -1 })
    .limit(limite)
    .lean();

  return commandes.map((commande) => ({
    _id: String(commande._id),
    numeroCommande: commande.numeroCommande,
    client:
      commande.clientId && typeof commande.clientId === "object"
        ? `${commande.clientId.prenom} ${commande.clientId.nom}`.trim()
        : "Client",
    total: commande.total,
    statutCommande: commande.statutCommande,
    statutPaiement: commande.statutPaiement,
    dateCommande: commande.dateCommande,
  }));
}

export async function getStatsDashboard(): Promise<StatsDashboard | null> {
  try {
    await dbConnect();
  } catch {
    return null;
  }

  const debutPeriode = new Date();
  debutPeriode.setMonth(debutPeriode.getMonth() - 5);
  debutPeriode.setDate(1);
  debutPeriode.setHours(0, 0, 0, 0);

  const [
    ca,
    commandesParStatut,
    revenusParMois,
    derniersCommandes,
    meilleuresVentes,
    nombreCommandes,
    commandesEnAttente,
    nombreClients,
    nombreProduits,
    stockFaible,
    avisEnAttente,
  ] = await Promise.all([
    Order.aggregate([
      { $match: { statutCommande: { $ne: "annulee" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    Order.aggregate([
      { $group: { _id: "$statutCommande", nombre: { $sum: 1 } } },
    ]),
    Order.aggregate([
      {
        $match: {
          statutCommande: { $ne: "annulee" },
          dateCommande: { $gte: debutPeriode },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$dateCommande" } },
          total: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Order.find()
      .populate<{ clientId: { prenom: string; nom: string } }>(
        "clientId",
        "prenom nom",
      )
      .sort({ dateCommande: -1 })
      .limit(6)
      .lean(),
    Product.find({ actif: true })
      .sort({ nombreVentes: -1 })
      .limit(5)
      .lean(),
    Order.countDocuments(),
    Order.countDocuments({ statutCommande: "en_attente" }),
    User.countDocuments({ role: "client" }),
    Product.countDocuments(),
    Product.countDocuments({ $expr: { $lte: ["$stock", "$seuilAlerteStock"] } }),
    Review.countDocuments({ statut: "en_attente" }),
  ]);

  return {
    chiffreAffaires: ca[0]?.total ?? 0,
    nombreCommandes,
    commandesEnAttente,
    nombreClients,
    nombreProduits,
    stockFaible,
    avisEnAttente,
    commandesParStatut: commandesParStatut.map((c) => ({
      statut: String(c._id),
      nombre: c.nombre,
    })),
    revenusParMois: revenusParMois.map((m) => ({
      mois: String(m._id),
      total: m.total,
    })),
    derniersCommandes: derniersCommandes.map((commande) => ({
      _id: String(commande._id),
      numeroCommande: commande.numeroCommande,
      client:
        commande.clientId && typeof commande.clientId === "object"
          ? `${commande.clientId.prenom} ${commande.clientId.nom}`.trim()
          : "Client",
      total: commande.total,
      statutCommande: commande.statutCommande,
      statutPaiement: commande.statutPaiement,
      dateCommande: commande.dateCommande,
    })),
    meilleuresVentes: meilleuresVentes.map((p) => ({
      _id: String(p._id),
      nom: p.nom,
      nombreVentes: p.nombreVentes,
      prix: p.prix,
      prixPromo: p.prixPromo ?? null,
      images: p.images ?? [],
    })),
  };
}