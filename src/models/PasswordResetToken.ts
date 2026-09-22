import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const passwordResetTokenSchema = new Schema(
  {
    utilisateurId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    utilise: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "passwordresettokens", versionKey: false },
);

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type PasswordResetTokenDocument = InferSchemaType<
  typeof passwordResetTokenSchema
>;

const PasswordResetToken: Model<PasswordResetTokenDocument> =
  (mongoose.models.PasswordResetToken as Model<PasswordResetTokenDocument>) ||
  mongoose.model<PasswordResetTokenDocument>(
    "PasswordResetToken",
    passwordResetTokenSchema,
  );

export default PasswordResetToken;