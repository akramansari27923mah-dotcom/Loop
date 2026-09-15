import Sidebar from "@/components/dashboard/Sidebar";
import { getUser } from "@/lib/get-session";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const layoutDashboard = async ({ children }) => {
  const session = await getUser();

  if (!session) {
    redirect("/auth/login");
    return 
  }

  return (
    <div className={`flex ${poppins.className}`}>
      <Sidebar session={session} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layoutDashboard;
