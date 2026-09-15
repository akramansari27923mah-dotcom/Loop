import React from "react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProfileDilog from "./ProfileDilog";
import { Menu } from "lucide-react";
import { useEveryWhere } from "@/context/UseEverywhere";

const NavebarDashoard = ({ session }) => {
  const { name, image } = session?.user || {};

  const { openSidebar, setOpenSidebar } = useEveryWhere();

  return (
    <div>
      <nav className="flex justify-between items-center gap-3 h-18 px-5 bg-linear-to-b from-[#050816] via-[#0a0f2c] to-[#111827] p-4 shadow-2xl shadow-blue-950/30">
        {!openSidebar && (
          <div
            onClick={() => setOpenSidebar(!openSidebar)}
            className="text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer">
            <Menu />
          </div>
        )}
        <Field orientation="horizontal">
          <Input
            type={"search"}
            className={"md:w-100 bg-gray-800 border border-gray-900 text-white"}
            placeholder="Search customer, feedback"
          />
          <Button className={"bg-blue-600 hover:bg-blue-500 cursor-pointer"}>
            Search
          </Button>
        </Field>
        <div>
          <ProfileDilog name={name} image={image} />
        </div>
      </nav>
    </div>
  );
};

export default NavebarDashoard;
