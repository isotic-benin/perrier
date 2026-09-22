import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const settingsSchema = new Schema(
  {
    cle: { type: String, required: true, unique: true, index: true },
    valeur: { type: Schema.Types.Mixed, required: true },
  },
  { collection: "settings", versionKey: false, timestamps: true },
);

export type SettingsDocument = InferSchemaType<typeof settingsSchema>;

const Settings: Model<SettingsDocument> =
  (mongoose.models.Settings as Model<SettingsDocument>) ||
  mongoose.model<SettingsDocument>("Settings", settingsSchema);

export default Settings;
