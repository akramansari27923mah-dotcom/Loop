import WorkspacePage from "@/components/Workspace";
import { authIsRequired, onlyAdmitCanAccess } from "@/lib/auth-utils";
import React from "react";

export const metadata = {
  title: "Create Your Workspace | LOOP - AI Customer Feedback Intelligence",
  description:
    "Create your LOOP workspace and start turning customer feedback into actionable insights with AI-powered analytics, sentiment analysis, and feedback intelligence.",
  keywords: [
    "create workspace",
    "customer feedback",
    "feedback analytics",
    "AI feedback analysis",
    "customer insights",
    "LOOP",
  ],
};

const WordSpace = async () => {
  await authIsRequired();

  return (
    <div className="min-h-screen bg-linear-to-br flex justify-center items-center from-[#050816] via-[#0a0f2c] to-[#111827]">
      <WorkspacePage />
    </div>
  );
};

export default WordSpace;
