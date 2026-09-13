import { Lock } from "lucide-react";
import React from "react";

const Header = ({ lable }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-3 group cursor-pointer">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <p className="text-3xl font-bold tracking-tight text-black">LOOP</p>
      </div>
      <div className="text-center">{lable}</div>
    </div>
  );
};

export default Header;
