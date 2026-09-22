import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const articlePanierSchema = new Schema(
  {
    produitId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    nom: { type: String, required: true },
    slug: { type: String, default: "" },
    image: { type: String, default: "" },
    variante: { type: String, default: "" },
    prixUnitaire: { type: Number, required: true, min: 0 },
    quantite: { type: Number, required: true, min: 1 },
    stock: { type: Number, default: 0 },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    sessionId: { type: String, default: "", index: true },
    articles: { type: [articlePanierSchema], default: [] },
    dateMiseAJour: { type: Date, default: Date.now },
  },
  { collection: "carts", versionKey: false },
);

export type CartDocument = InferSchemaType<typeof cartSchema>;

const Cart: Model<CartDocument> =
  (mongoose.models.Cart as Model<CartDocument>) ||
  mongoose.model<CartDocument>("Cart", cartSchema);

export default Cart;