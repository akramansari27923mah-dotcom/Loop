import { NextResponse as res } from "next/server";
import workspaceModel from "@/schemas/workspaceSchema";
import { getUser } from "@/lib/auth-utils";
import { CONNECT_DB } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const POST = async (req) => {
  try {
    // Connection database
    await CONNECT_DB();

    // Get data form frontend
    const body = await req?.json();

    // Get logged-in-user
    const session = await getUser();

    if (!session?.user) {
      return res?.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 },
      );
    }

    if (session?.user?.workspaceId) {
      return res?.json(
        {
          message: "You already have a workspace.",
          success: false,
        },
        { status: 400 },
      );
    }

    const { name, description } = body;

    if (!name) {
      return res?.json({
        message: "Name is required.",
        success: false,
      });
    }

    // Create workspace
    const workspace = await workspaceModel.create({
      name,
      description,
      ownerId: session?.user?.id,
    });

    // Update workspaceId and role
    await auth.api.updateUser({ 
      body: {
        workspaceId: workspace?._id.toString(),
        role: "admin",
      },
      headers: await headers(),
    });

    return res?.json(
      {
        message: "Workspace created successfully.",
        success: true,
        workspace,
      },
      { status: 200 },
    );
  } catch (err) {
    return res?.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
