import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    reponse: { type: String, required: true },
    categorie: { type: String, default: "Général" },
    ordre: { type: Number, default: 0 },
    actif: { type: Boolean, default: true },
  },
  { collection: "faqs", versionKey: false },
);

faqSchema.index({ actif: 1, ordre: 1, categorie: 1 });

export type FaqDocument = InferSchemaType<typeof faqSchema>;

const Faq: Model<FaqDocument> =
  (mongoose.models.Faq as Model<FaqDocument>) ||
  mongoose.model<FaqDocument>("Faq", faqSchema);

export default Faq;