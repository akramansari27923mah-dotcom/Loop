"use client";

import React from "react";
import NavebarDashoard from "./Navebar";

const DashboardPage = ({ session }) => {
  return (
    <div>
      <NavebarDashoard session={session} />
    </div>
  );
};

export default DashboardPage;
