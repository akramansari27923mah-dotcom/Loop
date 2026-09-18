import { getUser } from "@/lib/auth-utils";
import { feedbackModel } from "@/schemas/feedbackSchema";
import { NextResponse as res } from "next/server";

export const DELETE = async (_, { params }) => {
  try {
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
          message: "Only admin or analyst can delete feedback.",
          success: false,
        },
        { status: 400 },
      );
    }

    const { id } = await params;
    const feedback = await feedbackModel.findByIdAndDelete({
      _id: id,
      workspaceId: session.user.workspaceId,
    });

    if (!feedback) {
      return res.json(
        {
          message: "Feedback not found.",
          success: false,
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "Feedback deleted successfully.",
        success: true,
        feedback,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err.message);
    return res.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const body = await req.json();
    const session = await getUser();

    console.log("BODY:", body);

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
          message: "Only admin or analyst can update feedback.",
          success: false,
        },
        { status: 403 },
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

    const { id } = await params;

    const { title, source, customerName, feedbackMessage, rating, status } =
      body.editFeedbackData;

    const updateData = {};

    if (title !== undefined && title !== "") {
      updateData.title = title;
    }

    if (source !== undefined && source !== "") {
      updateData.source = source;
    }

    if (customerName !== undefined && customerName !== "") {
      updateData.customerName = customerName;
    }

    if (feedbackMessage !== undefined && feedbackMessage !== "") {
      updateData.feedbackMessage = feedbackMessage;
    }

    if (rating !== undefined && rating !== "") {
      updateData.rating = rating;
    }

    if (status !== undefined && status !== "") {
      updateData.status = status;
    }

    console.log("UPDATE DATA:", updateData);

    const editFeedback = await feedbackModel.findOneAndUpdate(
      {
        _id: id,
        workspaceId: session.user.workspaceId,
      },
      {
        $set: updateData,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!editFeedback) {
      return res.json(
        {
          message: "Feedback not found.",
          success: false,
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "Feedback updated successfully.",
        success: true,
        editFeedback,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("UPDATE FEEDBACK ERROR:", err);

    return res.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
