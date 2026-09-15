import DashboardPage from "@/components/dashboard/Dashboard";
import { authIsRequired, isWorkspaceIdNull } from "@/lib/auth-utils";
import { getUser } from "@/lib/get-session";
import React from "react";

export const metadata = {
  title: {
    default: "Dashboard | LOOP",
    template: "%s | LOOP",
  },
  description:
    "Analyze customer feedback, discover trends, track sentiment, and gain AI-powered insights with LOOP.",
};

const DashBoard = async () => {
  const session = await getUser();
  
  await isWorkspaceIdNull();
  await authIsRequired();
  
  return (
    <div>
      <DashboardPage session={session} />
    </div>
  );
};

export default DashBoard;
