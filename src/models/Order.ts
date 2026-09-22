import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { STATUTS_COMMANDE, STATUTS_PAIEMENT, METHODES_PAIEMENT } from "@/lib/constants";

const articleCommandeSchema = new Schema(
  {
    produitId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    nom: { type: String, required: true },
    image: { type: String, default: "" },
    variante: { type: String, default: "" },
    prixUnitaire: { type: Number, required: true, min: 0 },
    quantite: { type: Number, required: true, min: 1 },
    sousTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const adresseSchema = new Schema(
  {
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, default: "" },
    pays: { type: String, required: true },
    telephone: { type: String, default: "" },
  },
  { _id: false },
);

const historiqueStatutSchema = new Schema(
  {
    statut: { type: String, enum: STATUTS_COMMANDE, required: true },
    date: { type: Date, default: Date.now },
    commentaire: { type: String, default: "" },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    numeroCommande: { type: String, required: true, unique: true, index: true },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
      index: true,
    },
    email: { type: String, required: true, index: true },
    articles: { type: [articleCommandeSchema], required: true },
    adresseLivraison: { type: adresseSchema, required: true },
    adresseFacturation: { type: adresseSchema, required: true },
    sousTotal: { type: Number, required: true, min: 0 },
    fraisLivraison: { type: Number, default: 0, min: 0 },
    reduction: { type: Number, default: 0, min: 0 },
    couponApplique: { type: String, default: "" },
    total: { type: Number, required: true, min: 0 },
    statutPaiement: { type: String, enum: STATUTS_PAIEMENT, default: "en_attente" },
    methodePaiement: { type: String, enum: METHODES_PAIEMENT, required: true },
    statutCommande: { type: String, enum: STATUTS_COMMANDE, default: "en_attente" },
    historiqueStatuts: { type: [historiqueStatutSchema], default: [] },
    transporteur: { type: String, default: "" },
    numeroSuivi: { type: String, default: "" },
    dateCommande: { type: Date, default: Date.now },
    dateLivraisonEstimee: { type: Date, default: null },
  },
  { collection: "orders", versionKey: false },
);

orderSchema.index({ statutCommande: 1, dateCommande: -1 });

export type OrderDocument = InferSchemaType<typeof orderSchema>;

const Order: Model<OrderDocument> =
  (mongoose.models.Order as Model<OrderDocument>) ||
  mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;