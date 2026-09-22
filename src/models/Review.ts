import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { STATUTS_AVIS } from "@/lib/constants";

const reviewSchema = new Schema(
  {
    produitId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    note: { type: Number, required: true, min: 1, max: 5 },
    commentaire: { type: String, required: true, trim: true, maxlength: 1000 },
    images: { type: [String], default: [] },
    achatVerifie: { type: Boolean, default: false },
    statut: { type: String, enum: STATUTS_AVIS, default: "en_attente" },
    reponseAdmin: { type: String, default: "" },
    dateCreation: { type: Date, default: Date.now },
  },
  { collection: "reviews", versionKey: false },
);

reviewSchema.index({ produitId: 1, statut: 1 });

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;

const Review: Model<ReviewDocument> =
  (mongoose.models.Review as Model<ReviewDocument>) ||
  mongoose.model<ReviewDocument>("Review", reviewSchema);

export default Review;