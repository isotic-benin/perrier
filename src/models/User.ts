import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { ROLES } from "@/lib/constants";

const adresseSchema = new Schema(
  {
    label: { type: String, required: true },
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, default: "" },
    pays: { type: String, required: true },
    telephone: { type: String, default: "" },
    parDefaut: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    motDePasseHash: { type: String, required: true, select: false },
    telephone: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CLIENT,
    },
    avatar: { type: String, default: "" },
    adresses: { type: [adresseSchema], default: [] },
    emailVerifie: { type: Boolean, default: false },
    actif: { type: Boolean, default: true },
    dateCreation: { type: Date, default: Date.now },
    derniereConnexion: { type: Date, default: null },
  },
  { collection: "users", versionKey: false },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);

export default User;