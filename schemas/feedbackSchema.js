import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    feedbackMessage: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    status: {
      type: String,
      enum: ["New", "Reviewed", "Resolved", "Closed"],
      default: "New",
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const feedbackModel =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
