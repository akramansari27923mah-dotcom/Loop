import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

import Header from "./Header";
import Social from "./Social";
import BackButton from "./BackButton";

const CardWraper = ({
  children,
  headerLabel,
  backButtonLable,
  backButtonHref,
  showSocial,
}) => {
  return (
    <div>
      <Card className={"w-100 shadow"}>
        <CardHeader>
          <Header lable={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>

        <CardFooter className={'flex flex-col gap-y-3'}>
          {showSocial && <Social />}
          <BackButton
            lable={backButtonLable}
            href={backButtonHref}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWraper;
