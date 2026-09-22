import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const bannerSchema = new Schema(
  {
    titre: { type: String, default: "" },
    sousTitre: { type: String, default: "" },
    image: { type: String, default: "" },
    lienBouton: { type: String, default: "" },
    texteBouton: { type: String, default: "Découvrir" },
    ordre: { type: Number, default: 0 },
    actif: { type: Boolean, default: true },
    dateDebut: { type: Date, default: null },
    dateFin: { type: Date, default: null },
  },
  { collection: "banners", versionKey: false },
);

bannerSchema.index({ actif: 1, ordre: 1 });

export type BannerDocument = InferSchemaType<typeof bannerSchema>;

const Banner: Model<BannerDocument> =
  (mongoose.models.Banner as Model<BannerDocument>) ||
  mongoose.model<BannerDocument>("Banner", bannerSchema);

export default Banner;