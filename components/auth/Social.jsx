"use client";

import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

const signInWithGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2 justify-center">
      <Button
        size="lg"
        variant="outline"
        onClick={signInWithGoogle}
        className={"w-40 cursor-pointer"}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className={"w-40 cursor-pointer"}
        onClick={signInWithGithub}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
