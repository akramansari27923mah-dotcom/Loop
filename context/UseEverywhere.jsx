"use client";

import React from "react";
import { useContext, createContext, useState } from "react";

const EveryWhere = createContext();

export const EveryProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [editRole, setEditRole] = useState("");

  return (
    <EveryWhere.Provider
      value={{ openSidebar, setOpenSidebar, editRole, setEditRole }}>
      {children}
    </EveryWhere.Provider>
  );
};

export const useEveryWhere = () => useContext(EveryWhere);
