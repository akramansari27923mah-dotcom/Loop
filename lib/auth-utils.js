import { Resend } from "resend";
import { config } from "./config";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const resend = new Resend(config.RESEND_API_KEY);




export const getUser = async () => {
  try {
    const session = await auth?.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized: No valid session found");
    }

    return session;
  } catch (err) {
    console.error("Get use error", err.message);
    return null;
  }
};

export const isWorkspaceIdNull = async () => {
  const session = await getUser();

  if (!session?.user?.workspaceId) {
    redirect("/create-workspace");
  }
};

export const authIsRequired = async () => {
  const session = await getUser();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
};

export const authIsNotRequired = async () => {
  const session = await getUser();

  if (session) {
    redirect("/deshboard");
  }
};

export const onlyAdmitCanAccess = async () => {
  const session = await getUser();

  if (session?.user?.role !== "admin") {
    redirect("/");
  }
};
