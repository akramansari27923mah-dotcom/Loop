import React from "react";
import { Button } from "./ui/button";
import Navbar from "./home/Navbar";
import Main from "./home/Main";
import { getUser } from "@/lib/get-session";

const HomePage = async() => {

  const session = await getUser()

  return (
    <div>
      <Navbar session={session} />
      <Main />
    </div>
  );
};

export default HomePage;
