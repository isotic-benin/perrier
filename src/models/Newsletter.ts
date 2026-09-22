import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    dateInscription: { type: Date, default: Date.now },
    actif: { type: Boolean, default: true },
  },
  { collection: "newsletters", versionKey: false },
);

newsletterSchema.index({ email: 1 });

export type NewsletterDocument = InferSchemaType<typeof newsletterSchema>;

const Newsletter: Model<NewsletterDocument> =
  (mongoose.models.Newsletter as Model<NewsletterDocument>) ||
  mongoose.model<NewsletterDocument>("Newsletter", newsletterSchema);

export default Newsletter;