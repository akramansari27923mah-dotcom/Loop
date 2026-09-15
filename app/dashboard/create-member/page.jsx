import Members from "@/components/dashboard/Members";
import React from "react";

export const metadata = {
  title: "Team Members | LOOP - Workspace Management",
  description:
    "Manage your LOOP workspace team members, assign user roles, and control access to your customer feedback intelligence platform.",
  keywords: [
    "team members",
    "workspace management",
    "user roles",
    "team management",
    "access control",
    "LOOP",
  ],
};

const CreateMember = async () => {
  return (
    <div>
      <Members />
    </div>
  );
};

export default CreateMember;
