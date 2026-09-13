import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import Image from "next/image";

const Main = () => {
  return (
    <main className="relative overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-5 py-10 sm:px-8 lg:flex-row lg:gap-16 lg:px-10">
        {/* Left Content */}
        <section className="relative flex w-full flex-col py-10 lg:w-1/2 ">
          {/* Badge */}
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs text-blue-400 sm:px-4 sm:text-sm">
            <Sparkles size={16} />
            AI-Powered Customer Feedback Intelligence
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Turn Customer Feedback
            <span className="block bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Into Real Insights
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base">
            LOOP helps businesses collect, analyze, and understand customer
            feedback using AI. Discover problems, feature requests, and valuable
            insights in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/auth/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-7 py-4 font-semibold transition-all duration-300 hover:scale-105 sm:w-auto">
              Get Started Free
              <ArrowRight size={18} />
            </Link>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 font-medium text-gray-300 transition hover:bg-white/5 sm:w-auto">
              <Play size={18} />
              Watch Demo
            </button>
          </div>

          {/* Trust Points */}
          <div className="mt-10 flex flex-col gap-4 text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:gap-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-blue-400" />
              AI-Powered Analysis
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-blue-400" />
              Actionable Insights
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-blue-400" />
              Real-Time Analytics
            </div>
          </div>
        </section>

        {/* Right Image */}
        <div
          className=" w-full max-w-md overflow-hidden rounded-2xl border  border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5),0_0_40px_rgba(99,102,241,0.3),0_0_60px_rgba(99,102,241,0.2)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.7),0_0_60px_rgba(99,102,241,0.5)] sm:max-w-lg lg:w-2/3 lg:max-w-xl
    ">
          <Image
            src="/main.png"
            alt="LOOP Dashboard Preview"
            width={700}
            height={700}
            className="h-auto w-full transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
