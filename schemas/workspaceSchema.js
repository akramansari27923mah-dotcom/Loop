import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const workspaceModel =
  mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

export default workspaceModel;
