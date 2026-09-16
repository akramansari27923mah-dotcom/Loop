import React from "react";
import { CONNECT_DB } from "@/lib/mongodb";
import memberModel from "@/schemas/memberSchema";
import InvitationCard from "@/components/InvitationPage";


export const metadata = {
  title: "You're Invited | LOOP",
  description:
    "You've been invited to join a LOOP workspace — an AI-powered customer feedback intelligence platform for teams and businesses.",
  keywords: [
    "LOOP",
    "customer feedback",
    "customer feedback management",
    "feedback intelligence",
    "AI customer feedback",
    "customer insights",
    "feedback analytics",
    "team collaboration",
    "workspace invitation",
    "AI analytics",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

const Invitaion = async ({ params }) => {
  await CONNECT_DB();
  const { token } = await params;

  const member = await memberModel.findOne({
    invitationToken: token,
  });

  if (!member) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050816] px-6">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/4 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.1 12.25A1.875 1.875 0 004.815 19h14.37a1.875 1.875 0 001.625-2.89l-7.1-12.25a1.875 1.875 0 00-3.25 0z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Invalid Invitation
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-slate-400">
            This invitation link is no longer valid or may have already been
            used. Please ask your workspace administrator for a new invitation.
          </p>

          {/* Divider */}
          <div className="my-7 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Brand */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
              ↻
            </div>
            <span>
              Powered by{" "}
              <span className="font-medium text-slate-300">LOOP</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <InvitationCard member={member} token={token} />
    </div>
  );
};

export default Invitaion;
