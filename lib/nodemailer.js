import nodemailer from "nodemailer";
import { config } from "./config";
import {
  SEND_INVITATION_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendInvitationEmail = async (invitationUrl, email) => {
  await transporter.sendMail({
    from: `LOOP <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You're invited to LOOP",
    html: SEND_INVITATION_TEMPLATE.replace("{{invitationUrl}}", invitationUrl),
  });
};

export const sendVerificationEmailToUser = async ({
  to,
  verificationUrl,
  userName,
}) => {

  await transporter.sendMail({
    from: `LOOP <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Verify your email of Loop",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{userName}", userName).replace(
      "{verificationUrl}",
      verificationUrl,
    ),
  });
};
