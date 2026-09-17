"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import FormSuccess from "./Form-success";
import FormError from "./Form-error";

const InvitationCard = ({ member, token }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const route = useRouter();
  const handleAccept = async () => {
    try {
      setLoader(true);
      setSuccess("");
      const { data } = await api.post("/invitationAccept", { token });
      if (data?.success) {
        setSuccess(data?.message);

        setTimeout(() => {
          setSuccess("Redirecting to dashboard...");
        }, 1000);

        setTimeout(() => {
          route.push("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error(err?.message);
      setError(err?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[90vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-blue-500 shadow-lg shadow-indigo-500/30">
                <span className="text-xl font-bold">L</span>
              </div>

              <span className="text-2xl font-bold tracking-tight">LOOP</span>
            </div>
          </div>

          {/* Invitation Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">
            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative">
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <div className="flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                  <Sparkles size={16} />
                  Workspace Invitation
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  You&apos;re invited to{" "}
                  <span className="bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                    LOOP
                  </span>
                </h1>

                <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                  You&apos;ve been invited to collaborate with your team on
                  LOOP, an AI-powered customer feedback intelligence platform.
                </p>
              </div>

              {/* Member Information */}
              <div className="mt-8 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Invited email</p>

                    <p className="truncate text-sm font-medium text-slate-200">
                      {member.email}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Workspace role</p>

                    <p className="text-sm font-medium capitalize text-slate-200">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Expiry */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Invitation status</p>

                    <p className="text-sm font-medium capitalize text-amber-300">
                      {member.status}
                    </p>
                  </div>
                </div>
              </div>

              <FormSuccess message={success && success} />
              <FormError message={error && error} />

              {/* Accept Button */}
              <button
                onClick={handleAccept}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-indigo-500/30 active:scale-[0.99] cursor-pointer">
                {loader ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    <span>Accepting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Accept Invitation</span>
                  </>
                )}
              </button>

              {/* Footer */}
              <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                By accepting this invitation, you&apos;ll join the workspace
                associated with this invitation.
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <p className="mt-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} LOOP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
