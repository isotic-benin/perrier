import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const categorySchema = new Schema(
  {
    nom: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
    ordre: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { collection: "categories", versionKey: false },
);

categorySchema.index({ parentId: 1, ordre: 1 });

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

const Category: Model<CategoryDocument> =
  (mongoose.models.Category as Model<CategoryDocument>) ||
  mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;