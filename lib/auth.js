import { betterAuth } from "better-auth";
import clientPromise from "./mongodb";
import { config } from "./config";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { sendVerificationEmailToUser } from "./auth-utils";

const client = await clientPromise;

const db = client.db(config.MONGODB_DB);
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmailToUser({
        to: "akramansari27923mah@gmail.com",
        verificationUrl: url,
        userName: user?.name,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    },
    github: {
      clientId: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      prompt: "select_account",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      workspaceId: {
        type: "string",
        required: false,
      },
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
});
