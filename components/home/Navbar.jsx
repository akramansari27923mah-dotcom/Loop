"use client";

import Link from "next/link";
import { ArrowRight, Menu, Plus, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/links";
import { authClient } from "@/lib/auth-client";
import { showError, showSuccess } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Navbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const logout = async () => {
    const { error } = await authClient.signOut();
    if (error) return showError("Logout failed!");

    showSuccess("Logged out successfully.");
    route.push("/auth/login");
  };

  return (
    <header className="w-full border-b border-white/10 bg-[#050816] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-wide">
            L<span className="text-blue-500">∞∞</span>P
          </h1>

          <div className="hidden h-10 w-px bg-white/20 sm:block" />

          <p className="hidden text-sm leading-5 text-gray-400 lg:block">
            AI Customer-Feedback
            <br />
            Intelligence Platform
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm transition ${
                index === 0 ? "text-blue-400" : "text-gray-300 hover:text-white"
              }`}>
              {link.name}

              {index === 0 && (
                <span className="absolute -bottom-5 left-0 h-0.5 w-full bg-blue-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {session ? (
            <Button
              variant="destructive"
              className={
                "cursor-pointer hover:scale-105 transition-all duration-300"
              }
              size="lg"
              onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link
              href={`/auth/login`}
              className="rounded-xl border border-blue-500/50 px-6 py-3 text-sm font-medium transition hover:bg-blue-500/10">
              Login
            </Link>
          )}

          {session?.user?.role === "admin" && (
            <Link
              href={`${session ? "/create-workspace" : "/auth/register"}`}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold transition hover:scale-105">
              <Plus size={18} />
              Create Workspace
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 transition hover:text-blue-400">
                {link.name}
              </Link>
            ))}

            <Link href="/auth/login" className="text-gray-300">
              Login
            </Link>

            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold">
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
