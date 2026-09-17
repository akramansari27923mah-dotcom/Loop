import { NextResponse as res } from "next/server";
import { getUser } from "@/lib/auth-utils";
import memberModel from "@/schemas/memberSchema";

export const PATCH = async (req, { params }) => {
  try {
    const body = await req.json();
    const { id } = await params;
    const { role } = body;

    const session = await getUser();

    if (!session?.user) {
      return res.json(
        {
          message: "Unauthorized.",
          success: false,
        },
        { status: 401 },
      );
    }

    if (session?.user?.role !== "admin") {
      return res.json(
        {
          message: "Only admin can edit.",
          success: false,
        },
        { status: 400 },
      );
    }

    const editMember = await memberModel.findByIdAndUpdate(
      {
        _id: id,
        workspaceId: session?.user?.workspaceId,
      },
      {
        $set: {
          role: role,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!editMember) {
      return res.json(
        {
          message: "Member not found.",
          success: false,
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "Member updated Successfully.",
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: "Internal server error.",
        success: false,
      },
      { status: 500 },
    );
  }
};
