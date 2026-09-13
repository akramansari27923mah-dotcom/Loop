import RegisterForm from "@/components/auth/Register-form";
import { authIsNotRequired } from "@/lib/auth-utils";
import React from "react";

const Register = async () => {
  await authIsNotRequired();

  return (
    <div className="min-h-screen bg-linear-to-br flex justify-center items-center from-[#050816] via-[#0a0f2c] to-[#111827]">
      <RegisterForm />
    </div>
  );
};

export default Register;
