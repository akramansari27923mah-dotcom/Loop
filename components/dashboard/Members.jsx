"use client";

import React from "react";
import CreateMemberForm from "./CreateMemberForm";
import { Menu } from "lucide-react";
import { useEveryWhere } from "@/context/UseEverywhere";

const MembersPage = () => {
  const { openSidebar, setOpenSidebar } = useEveryWhere();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827]">
      <nav className="flex px-5 justify-between items-center h-20 border-b border-gray-800">
        <div className="flex justify-center items-center gap-2">
          {!openSidebar && (
            <div
              onClick={() => setOpenSidebar(!openSidebar)}
              className="text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Menu />
            </div>
          )}
          <div className="">
            <h1 className="text-white text-2xl">Members</h1>
            <p className="text-gray-400 text-sm hidden md:block">
              Manage your team members and invitations.
            </p>
            <p className="text-gray-400 text-sm  md:hidden">Manage your team</p>
          </div>
        </div>

        <div>
          <CreateMemberForm />
        </div>
      </nav>
    </div>
  );
};

export default MembersPage;
