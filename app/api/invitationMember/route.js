import { NextResponse as res } from "next/server";
import { getUser } from "@/lib/get-session";
import memberModel from "@/schemas/memberSchema";
import { CONNECT_DB } from "@/lib/mongodb";
import { generateToken } from "@/lib/tokenGenerate";
import { config } from "@/lib/config";
import { sendInvitationEmail } from "@/lib/nodemailer";

export const POST = async (req) => {
  try {
    await CONNECT_DB();
    const body = await req.json();
    const session = await getUser();

    if (!session?.user) {
      return res?.json(
        {
          message: "Unauthorized.",
          success: false,
        },
        { status: 401 },
      );
    }

    if (session.user.role !== "admin") {
      return res?.json(
        {
          message: "Only admin can invite to members.",
          success: false,
        },
        { status: 400 },
      );
    }

    const { email, role } = body;

    if (!email || !role) {
      return res?.json(
        {
          message: "Each fields are required.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (!session.user.workspaceId) {
      return res.json(
        {
          message: "Admin does not belong to a workspace.",
          success: false,
        },
        { status: 400 },
      );
    }

    const members = await memberModel.findOne({
      workspaceId: session.user.workspaceId,
      email: email,
    });


    if (members) {
      return res.json(
        {
          message: "A member with this email already exists.",
          success: false,
        },
        { status: 409 },
      );
    }

    const token = generateToken();

    const member = await memberModel.create({
      email: email,
      role,
      userId: null,
      workspaceId: session.user.workspaceId,
      status: "pending",
      invitationToken: token,
      invitationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const invitationUrl = `${config.NEXT_PUBLIC_APP_URL}/invite/${token}`;

    await sendInvitationEmail(invitationUrl, email);

    return res.json(
      {
        message: "Member Invited successfully.",
        success: true,
        member,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("INVITE MEMBER ERROR:", err);
    return res?.json(
      {
        message: "Internal server error.",
        success: false,
      },
      { status: 500 },
    );
  }
};
