import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const activityLogSchema = new Schema(
  {
    utilisateurId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: { type: String, required: true },
    cible: { type: String, required: true },
    details: { type: Object, default: {} },
    date: { type: Date, default: Date.now, index: true },
  },
  { collection: "activityLogs", versionKey: false },
);

export type ActivityLogDocument = InferSchemaType<typeof activityLogSchema>;

const ActivityLog: Model<ActivityLogDocument> =
  (mongoose.models.ActivityLog as Model<ActivityLogDocument>) ||
  mongoose.model<ActivityLogDocument>("ActivityLog", activityLogSchema);

export default ActivityLog;