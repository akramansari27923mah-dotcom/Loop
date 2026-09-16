import React from "react";

const InfoAboutAdmin = ({icon, heading, content,}) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050816] px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/4 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
          <svg
            xmlns={icon}
            className="h-10 w-10 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V7.875a4.5 4.5 0 00-9 0V10.5m-1.125 0h11.25A1.875 1.875 0 0119.5 12.375v6.75A1.875 1.875 0 0117.625 21h-11.25A1.875 1.875 0 014.5 19.125v-6.75A1.875 1.875 0 016.375 10.5z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {heading}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
         {content}
        </p>

        {/* Divider */}
        <div className="my-7 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
            ↻
          </div>
          <span>
            Powered by <span className="font-medium text-slate-300">LOOP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoAboutAdmin;
