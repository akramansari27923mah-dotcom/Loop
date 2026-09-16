import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },

    role: {
      type: String,
      enum: ["admin", "analyst", "viewer"],
      default: "viewer",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },

    invitationToken: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },

    invitationExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

memberSchema.index({ email: 1, workspaceId: 1 }, { unique: true });

const memberModel =
  mongoose.models.Member || mongoose.model("Member", memberSchema);

export default memberModel;
