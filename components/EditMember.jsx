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
import { Pencil } from "lucide-react";

const EditMember = ({ editMember, editLoader, member, editRole, setEditRole }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            className="text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <AlertDialogContent className="border border-white/10 bg-[#0b1020] text-white shadow-2xl shadow-black/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-white">
            Edit Member
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400">
            Update this member&apos;s role and workspace permissions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-5 py-4">
          {/* Member Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>

            <input
              type="email"
              value={member?.email || ""}
              disabled
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-400 outline-none"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Role</label>

            <select
              onChange={(e) => setEditRole(e.target.value)}
              defaultValue={member?.role || editRole}
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500">
              <option value="admin">Admin</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={editMember}
            className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            disabled={editLoader}>
            {editLoader ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                <span>Updating...</span>
              </div>
            ) : (
              <span>Save Changes</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditMember;
