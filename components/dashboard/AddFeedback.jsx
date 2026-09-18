"use client";

import React from "react";
import { useEveryWhere } from "@/context/UseEverywhere";
import { Button } from "../ui/button";
import CreateFeedbackForm from "./CreateFeedbackForm";

const AddFeedbackPage = () => {
  const { openSidebar, setOpenSidebar } = useEveryWhere();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111827] border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-semibold text-white">Add Feedback</h1>
          <p className="text-gray-400 text-sm">Collect and analyze user customer feedback to improve your product.</p>
        </div>
        <Button
        size="lg"
          className="text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600"
          onClick={() => setOpenSidebar(!openSidebar)}>
          {openSidebar ? "Close Sidebar" : "Open Sidebar"}
        </Button>
      </div>
      <div className="p-4 flex flex-col items-center justify-center mt-50">
            <CreateFeedbackForm />
      </div>
    </div>
  );
};

export default AddFeedbackPage;
