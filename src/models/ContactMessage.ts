import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactSchema = new Schema(
  {
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    sujet: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    statut: { type: String, enum: ["nouveau", "traite"], default: "nouveau" },
    dateCreation: { type: Date, default: Date.now },
  },
  { collection: "contacts", versionKey: false },
);

contactSchema.index({ statut: 1, dateCreation: -1 });

export type ContactDocument = InferSchemaType<typeof contactSchema>;

const Contact: Model<ContactDocument> =
  (mongoose.models.Contact as Model<ContactDocument>) ||
  mongoose.model<ContactDocument>("Contact", contactSchema);

export default Contact;