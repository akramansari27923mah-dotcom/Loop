import { Resend } from "resend";
import { config } from "./config";
import { VerificationEmailTemplate } from "@/components/email-send-template";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const resend = new Resend(config.RESEND_API_KEY);

export const sendVerificationEmailToUser = async ({
  to,
  verificationUrl,
  userName,
}) => {
  await resend.emails.send({
    from: "Loop <onboarding@resend.dev>",
    to,
    subject: "Verifi you email",
    react: (
      <VerificationEmailTemplate
        userName={userName}
        verificationUrl={verificationUrl}
      />
    ),
  });
};

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
