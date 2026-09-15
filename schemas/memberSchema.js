import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
      default: null,
    },

    workspaceId: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "analyst", "viewer"],
      default: "viewer",
    },

    email: {
      type: String,
      unique: true,
      required: true,
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

const memberModel =
  mongoose.models.Member || mongoose.model("Member", memberSchema);

export default memberModel;
