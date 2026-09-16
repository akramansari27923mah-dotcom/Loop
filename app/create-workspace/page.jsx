import { Button } from "@/components/ui/button";
import WorkspacePage from "@/components/Workspace";
import { authIsRequired, onlyAdmitCanAccess } from "@/lib/auth-utils";
import Link from "next/link";
import React from "react";
import { BiHome } from "react-icons/bi";

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
      <Link href={"/"}>
        <Button
          size="lg"
          className={
            "fixed top-4 left-4 hover:scale-105 transition-all duration-300 cursor-pointer"
          }>
          <BiHome />
          Home
        </Button>
      </Link>
      <WorkspacePage />
    </div>
  );
};

export default WordSpace;
