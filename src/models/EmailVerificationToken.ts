import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const emailVerificationTokenSchema = new Schema(
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
    { collection: "emailverificationtokens", versionKey: false },
);

emailVerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type EmailVerificationTokenDocument = InferSchemaType<
    typeof emailVerificationTokenSchema
>;

const EmailVerificationToken: Model<EmailVerificationTokenDocument> =
    (mongoose.models.EmailVerificationToken as Model<EmailVerificationTokenDocument>) ||
    mongoose.model<EmailVerificationTokenDocument>(
        "EmailVerificationToken",
        emailVerificationTokenSchema,
    );

export default EmailVerificationToken;
