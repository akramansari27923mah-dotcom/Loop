import React from "react";

import { Home, LogOutIcon, UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { showError, showSuccess } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfileDilog = ({ name, image }) => {
  const route = useRouter();

  const logout = async () => {
    const { error } = await authClient.signOut();
    if (error) return showError("Logout failed!");

    showSuccess("Logged out successfully.");
    route.push("/auth/login");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <div className="w-12 h-12 text-white text-xl cursor-pointer rounded-full bg-blue-600 flex justify-center items-center overflow-hidden">
              {image ? (
                <Image src={image} alt="autar" width={100} height={100} />
              ) : (
                name[0]
              )}
            </div>
          }
        />

        <DropdownMenuContent>
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => route.push("/")}>
            <Home />
            Home
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className={
              "cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-200"
            }>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDilog;
