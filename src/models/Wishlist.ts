import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const wishlistSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    produits: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
  },
  { collection: "wishlists", versionKey: false },
);

export type WishlistDocument = InferSchemaType<typeof wishlistSchema>;

const Wishlist: Model<WishlistDocument> =
  (mongoose.models.Wishlist as Model<WishlistDocument>) ||
  mongoose.model<WishlistDocument>("Wishlist", wishlistSchema);

export default Wishlist;