import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const varianteSchema = new Schema(
  {
    nom: { type: String, required: true },
    valeur: { type: String, required: true },
    stockVariante: { type: Number, default: 0 },
    prixSupplement: { type: Number, default: 0 },
    sku: { type: String, default: "" },
  },
  { _id: true },
);

const attributSchema = new Schema(
  {
    cle: { type: String, required: true },
    valeur: { type: String, required: true },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    nom: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, default: "" },
    descriptionCourte: { type: String, default: "" },
    categorieId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    typeLivraison: {
      type: String,
      enum: ["retrait", "livraison_portail", "livraison_garage"],
      default: "retrait",
    },
    sku: { type: String, required: true, unique: true, trim: true },
    images: { type: [String], default: [] },
    prix: { type: Number, required: true, min: 0 },
    prixPromo: { type: Number, default: null, min: 0 },
    enPromotion: { type: Boolean, default: false, index: true },
    pourcentageRemise: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, default: 0, min: 0 },
    seuilAlerteStock: { type: Number, default: 5 },
    variantes: { type: [varianteSchema], default: [] },
    attributs: { type: [attributSchema], default: [] },
    poids: { type: Number, default: 0 },
    noteMoyenne: { type: Number, default: 0, min: 0, max: 5 },
    nombreAvis: { type: Number, default: 0 },
    nombreVentes: { type: Number, default: 0, index: true },
    vues: { type: Number, default: 0 },
    actif: { type: Boolean, default: true },
    vedette: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    dateCreation: { type: Date, default: Date.now },
    dateMiseAJour: { type: Date, default: Date.now },
  },
  { collection: "products", versionKey: false },
);

productSchema.index({ nom: "text", description: "text", tags: "text" });
productSchema.index({ categorieId: 1, actif: 1 });
productSchema.index({ enPromotion: 1, actif: 1 });

export type ProductDocument = InferSchemaType<typeof productSchema>;

const Product: Model<ProductDocument> =
  (mongoose.models.Product as Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;