import AddFeedbackPage from "@/components/dashboard/AddFeedback";
import InfoAboutAdmin from "@/components/InfoAboutAdmin";
import { getUser } from "@/lib/auth-utils";
import React from "react";

const FeedbackAdd = async () => {
  const session = await getUser();

  if (session.user.role !== "admin" && session.user.role !== "analyst") {
    return (
      <InfoAboutAdmin
        heading={"Admin or Analyst Access Required"}
        content={
          "You can view feedback from your workspace, but only workspace administrators and analysts can add, edit, or delete feedback."
        }
      />
    );
  }

  return (
    <div>
      <AddFeedbackPage />
    </div>
  );
};

export default FeedbackAdd;
