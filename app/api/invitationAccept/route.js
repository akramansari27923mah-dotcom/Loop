import { NextResponse as res } from "next/server";
import { getUser } from "@/lib/get-session";
import { CONNECT_DB } from "@/lib/mongodb";
import memberModel from "@/schemas/memberSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const POST = async (req) => {
  try {
    await CONNECT_DB();
    const body = await req.json();
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

    const { token } = body;

    if (!token) {
      return res.json(
        {
          message: "Invitation token is required",
          success: false,
        },
        { status: 400 },
      );
    }

    const member = await memberModel.findOne({
      invitationToken: token,
    });

    console.log("member", member);
    

    if (!member) {
      return res.json(
        {
          message: "Invalid invitation.",
          success: false,
        },
        { status: 404 },
      );
    }

    if (member.invitationToken !== token) {
      return res.json(
        {
          message: "Unmatched Token",
          success: false,
        },
        { status: 400 },
      );
    }

    if (member.status === "active") {
      return res.json(
        {
          message: "Invitation has already been accepted.",
          success: false,
        },
        { status: 409 },
      );
    }

    if (member.invitationExpires < new Date()) {
      return res.json(
        {
          message: "Invitation has expired.",
          success: false,
        },
        { status: 410 },
      );
    }

    await auth.api.updateUser({
      body: {
        workspaceId: member.workspaceId,
        role: member.role,
      },
      headers: await headers(),
    });

    // update user
    member.userId = session.user.id;
    member.status = "active";

    // Invalidate invitation token
    member.invitationToken = null;
    member.invitationExpires = null;

    await member.save();

    return res.json(
      {
        message: "Invitation accepted successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("ACCEPT INVITATION ERROR:", err);

    return res.json(
      {
        message: "Internal server error.",
        success: false,
      },
      { status: 500 },
    );
  }
};
