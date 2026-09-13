'use client'

import React from "react";
import { Input } from "../ui/input";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import ProfileDilog from "./ProfileDilog";
;
const DashboardPage = ({ session }) => {

  const {name, image} = session?.user || {}
  return (
    <div>
      <nav className="flex justify-between items-center h-18 px-5 bg-linear-to-b from-[#050816] via-[#0a0f2c] to-[#111827] p-4 shadow-2xl shadow-blue-950/30">
        <Field orientation="horizontal">
          <Input
            type={"search"}
            className={"w-100 bg-gray-800 border border-gray-900 text-white"}
            placeholder="Search customer, feedback"
          />
          <Button className={"bg-blue-600 hover:bg-blue-500 cursor-pointer"}>
            Search
          </Button>
        </Field>
        <div >
          <ProfileDilog name={name} image={image} />
        </div>
      </nav>
    </div>
  );
};

export default DashboardPage;
