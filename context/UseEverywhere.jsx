"use client";

import React from "react";
import { useContext, createContext, useState } from "react";

const EveryWhere = createContext();

const model = {
  title: "",
  customerName: "",
  source: "",
  feedbackMessage: "",
  rating: "",
  status: "",
};

export const EveryProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [editRole, setEditRole] = useState("");
  const [editFeedbackData, setEditFeedbackData] = useState(model);

  return (
    <EveryWhere.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        editRole,
        setEditRole,
        editFeedbackData,
        setEditFeedbackData,
      }}>
      {children}
    </EveryWhere.Provider>
  );
};

export const useEveryWhere = () => useContext(EveryWhere);
