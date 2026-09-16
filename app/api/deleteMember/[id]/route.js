import { NextResponse as res } from "next/server";
import { getUser } from "@/lib/auth-utils";
import memberModel from "@/schemas/memberSchema";

export const DELETE = async (_, { params }) => {
  try {
    const { id } = await params;
    const session = await getUser();

    if (!session.user) {
      return res.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 },
      );
    }

    if (session.user.role !== "admin") {
      return res.json(
        {
          message: "Only admin can delete members.",
          success: false,
        },
        { status: 403 },
      );
    }

    const deleteMem = await memberModel.findByIdAndDelete({
      _id: id,
      workspaceId: session.user.workspaceId,
    });

    if (!deleteMem) {
      return res.json(
        {
          message: "Member not found.",
          success: false,
        },
        { status: 404 },
      );
    }

    return res.json({
      message: "Member deleted successfully.",
      success: true,
      deleteMem,
    });
  } catch (err) {
    console.error(err);

    return res.json(
      {
        message: "Internal server error.",
        success: false,
      },
      { status: 500 },
    );
  }
};
