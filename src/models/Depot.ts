import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDepot extends Document {
    nom: string;
    slug: string;
    codePostal: string;
    ville: string;
    adresse: string;
    telephone: string;
    horaires: string;
    actif: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const depotSchema = new Schema<IDepot>(
    {
        nom: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        codePostal: { type: String, required: true },
        ville: { type: String, required: true },
        adresse: { type: String, required: true },
        telephone: { type: String, required: true },
        horaires: { type: String, default: "Lun-Ven: 09:00 - 18:00" },
        actif: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.Depot as Model<IDepot>) ||
    mongoose.model<IDepot>("Depot", depotSchema);
