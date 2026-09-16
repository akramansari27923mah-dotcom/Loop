import { NextResponse as res } from "next/server";
import { getUser } from "@/lib/auth-utils";
import { CONNECT_DB } from "@/lib/mongodb";
import memberModel from "@/schemas/memberSchema";

export const GET = async (req) => {
  try {
    await CONNECT_DB();

    const session = await getUser();

    if (!session.user) {
      return res.json(
        {
          message: "Unauthorized.",
          success: false,
        },
        { status: 401 },
      );
    }

    if (!session.user.workspaceId) {
      return res.json(
        {
          message: "Workspace not found",
          success: false,
        },
        { status: 404 },
      );
    }

    const member = await memberModel
      .find({
        workspaceId: session.user.workspaceId,
      })
      .sort({ createdAt: -1 });

    return res.json(
      {
        message: "Member fetched successfully.",
        success: true,
        member,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
