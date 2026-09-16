import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/axios";

const DeleteMember = ({ deleteMember, loader }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
            <Trash2 className=" h-4 w-4" />
          </Button>
        }
      />

      <AlertDialogContent className="border border-white/10 bg-[#0b1020] text-white shadow-2xl shadow-black/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-white">
            Delete this member?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400">
            This action will permanently remove the member from your workspace.
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={deleteMember}
            className=" bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            disabled={loader}>
            {loader ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Deleting...</span>
              </div>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMember;
