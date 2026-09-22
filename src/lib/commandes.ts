import "server-only";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { calculerFraisLivraison } from "@/lib/livraison";

export async function genererNumeroCommande(): Promise<string> {
  const annee = new Date().getFullYear();
  const prefixe = `CMD-${annee}-`;
  const compte = await Order.countDocuments({
    numeroCommande: { $regex: `^${prefixe}` },
  });
  return `${prefixe}${String(compte + 1).padStart(6, "0")}`;
}

export interface ArticleCommande {
  produitId: string;
  nom: string;
  image: string;
  variante: string;
  prixUnitaire: number;
  quantite: number;
}

export interface AdresseCommande {
  rue: string;
  ville: string;
  codePostal?: string;
  pays: string;
  telephone: string;
}

export interface DonneesCreationCommande {
  clientId?: string | null;
  email: string;
  articles: ArticleCommande[];
  adresseLivraison: AdresseCommande;
  adresseFacturation: AdresseCommande;
  methodePaiement: "virement";
  modeLivraison: "standard" | "express";
  reduction?: number;
  couponApplique?: string;
}

export async function creerCommande(donnees: DonneesCreationCommande) {
  await dbConnect();

  const articles = donnees.articles;
  const sousTotal = articles.reduce(
    (somme, a) => somme + a.prixUnitaire * a.quantite,
    0,
  );
  const reduction = Math.min(donnees.reduction ?? 0, sousTotal);
  const fraisLivraison = calculerFraisLivraison(
    sousTotal - reduction,
    donnees.modeLivraison,
  );
  const total = Math.max(0, sousTotal - reduction + fraisLivraison);

  const numeroCommande = await genererNumeroCommande();

  const commande = await Order.create({
    numeroCommande,
    clientId: donnees.clientId ?? null,
    email: donnees.email,
    articles: articles.map((a) => ({
      produitId: a.produitId,
      nom: a.nom,
      image: a.image,
      variante: a.variante,
      prixUnitaire: a.prixUnitaire,
      quantite: a.quantite,
      sousTotal: a.prixUnitaire * a.quantite,
    })),
    adresseLivraison: donnees.adresseLivraison,
    adresseFacturation: donnees.adresseFacturation,
    sousTotal,
    fraisLivraison,
    reduction,
    couponApplique: donnees.couponApplique ?? "",
    total,
    methodePaiement: donnees.methodePaiement,
    statutCommande: "en_attente",
    statutPaiement: "en_attente",
    historiqueStatuts: [
      {
        statut: "en_attente",
        date: new Date(),
        commentaire: "Commande créée",
      },
    ],
  });

  await decrementerStock(articles);

  return commande;
}

export async function decrementerStock(articles: ArticleCommande[]) {
  await dbConnect();
  await Promise.all(
    articles.map((a) =>
      Product.updateOne(
        { _id: a.produitId },
        { $inc: { stock: -a.quantite, nombreVentes: a.quantite } },
      ),
    ),
  );
}