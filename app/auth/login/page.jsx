import LoginForm from "@/components/auth/login-form";
import { authIsNotRequired } from "@/lib/auth-utils";
import React from "react";

export const dynamic = "force-dynamic";

const Login = async() => {

  await authIsNotRequired()

  return (
    <div className="min-h-screen bg-linear-to-br flex justify-center items-center from-[#020617] via-[#0f172a] to-[#312e81]">
      <LoginForm />
    </div>
  );
};

export default Login;
