import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: {
      type: String,
      enum: ["pourcentage", "montant_fixe"],
      required: true,
    },
    valeur: { type: Number, required: true, min: 0 },
    montantMinimum: { type: Number, default: 0, min: 0 },
    dateDebut: { type: Date, default: null },
    dateFin: { type: Date, default: null },
    usageMax: { type: Number, default: 1, min: 0 },
    usageActuel: { type: Number, default: 0, min: 0 },
    categoriesApplicables: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    actif: { type: Boolean, default: true },
  },
  { collection: "coupons", versionKey: false },
);

couponSchema.index({ code: 1 });
couponSchema.index({ actif: 1, dateFin: 1 });

export type CouponDocument = InferSchemaType<typeof couponSchema>;

const Coupon: Model<CouponDocument> =
  (mongoose.models.Coupon as Model<CouponDocument>) ||
  mongoose.model<CouponDocument>("Coupon", couponSchema);

export default Coupon;