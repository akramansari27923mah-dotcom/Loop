import { CircleCheck } from "lucide-react";
import React from "react";

const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div className="w-full flex items-center gap-x-2 p-3 my-4 rounded-lg text-green-500 bg-green-100">
      <CircleCheck size={20} />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
