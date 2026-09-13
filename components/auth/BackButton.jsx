import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const BackButton = ({ lable, href }) => {
  return (
    <Button
    variant="link"
    size="sm"
    className="w-full font-normal">
      <Link href={href}>{lable}</Link>
    </Button>
  );
};

export default BackButton;
