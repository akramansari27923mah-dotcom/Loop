import React from "react";

import { BiError } from "react-icons/bi";

const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="w-full flex items-center gap-x-2 p-3 my-4 rounded-lg text-red-500 bg-red-100">
      <BiError size={20} />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
