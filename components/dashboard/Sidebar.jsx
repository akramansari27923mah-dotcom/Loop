"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarRoutes } from "@/lib/slider-routes";
import { X } from "lucide-react";
import { useEveryWhere } from "@/context/UseEverywhere";

export default function Sidebar({ session }) {
  const pathname = usePathname();

  const { name, role, image } = session?.user || {};
  const { openSidebar, setOpenSidebar } = useEveryWhere();

  return (
    <>
      <aside
        className={`flex h-screen z-100 md:relative fixed top-0 left-0  flex-col ${openSidebar && "border-r"} border-white/10 bg-linear-to-b from-[#050816] via-[#0a0f2c] to-[#111827]  shadow-2xl shadow-blue-950/30 overflow-hidden transition-all duration-300`}
        style={{
          width: openSidebar ? "300px" : "0px",
          padding: openSidebar ? "16px" : "0px",
        }}>
        <div
          onClick={() => setOpenSidebar(false)}
          className="absolute top-3 right-3 text-white hover:bg-gray-800 transition-all duration-300 p-1 rounded-md cursor-pointer">
          <X />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-lg shadow-blue-500/20">
            <Image
              src="/logo.png"
              alt="LOOP Logo"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              LOOP
            </h1>

            <p className="text-xs text-blue-300/70">AI Feedback Intelligence</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-1 flex-col gap-2">
          <p className="mb-2 px-3 text-xs font-semibold tracking-widest text-gray-500">
            MAIN MENU
          </p>

          {sidebarRoutes?.map((item) => {
            const Icon = item.icon;
            
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                href={item.href}
                key={item.name}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}>
                <Icon
                  size={20}
                  className={`transition-transform duration-300 group-hover:scale-110  ${
                    isActive ? "text-white" : "text-blue-400"
                  }`}
                />

                <span className="text-nowrap">{item.name}</span>

                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white shadow-lg shadow-white/70" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition hover:bg-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 font-semibold text-white overflow-hidden">
              {image ? (
                <Image src={image} width={100} height={100} alt="Autar" />
              ) : (
                name[0]
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-white">
                {name || "Akram"}
              </p>

              <p className="text-xs text-gray-400 uppercase">{role || "N"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
