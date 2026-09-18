import { getUser } from "@/lib/auth-utils";
import { CONNECT_DB } from "@/lib/mongodb";
import { NextResponse as res } from "next/server";
import { feedbackModel } from "@/schemas/feedbackSchema";

export const POST = async (req) => {
  try {
    await CONNECT_DB();
    const body = await req.json();
    const session = await getUser();

    if (!session?.user) {
      return res.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 },
      );
    }

    if (session.user.role !== "admin" && session.user.role !== "analyst") {
      return res.json(
        {
          message: "Only admin or analyst can create feedback.",
          success: false,
        },
        { status: 400 },
      );
    }

    const { title, source, customerName, feedbackMessage, rating, status } =
      body;

    if (
      !title ||
      !source ||
      !customerName ||
      !feedbackMessage ||
      rating === undefined ||
      rating === null ||
      !status
    ) {
      return res.json(
        {
          message: "All fields are required.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (!session?.user?.workspaceId) {
      return res.json(
        {
          message: "You are not associated with a workspace.",
          success: false,
        },
        { status: 400 },
      );
    }

    const isAllowedStatus = ["New", "Reviewed", "Resolved", "Closed"];

    if (!isAllowedStatus.includes(status)) {
      return res.json(
        {
          message: "Invalid feedback status.",
          success: false,
        },
        { status: 400 },
      );
    }

    const feedback = await feedbackModel.create({
      title,
      source,
      customerName,
      feedbackMessage,
      rating,
      status,
      workspaceId: session.user.workspaceId,
    });

    return res.json(
      {
        message: "Feedback created successfully.",
        success: true,
        feedback,
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

export const GET = async (req) => {
  try {
    await CONNECT_DB()
    const session = await getUser();

    if (!session?.user) {
      return res.json(
        {
          message: "Unauthorized",
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

    const feedback = await feedbackModel
      .find({
        workspaceId: session.user.workspaceId,
      })
      .sort({ createdAt: -1 });


    return res.json(
      {
        message: "Feedback fetched successfully",
        success: true,
        feedback
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
