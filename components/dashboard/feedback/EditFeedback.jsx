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

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const sources = [
  { value: "Website", label: "Website" },
  { value: "Mobile App", label: "Mobile App" },
  { value: "Support", label: "Support" },
  { value: "Survey", label: "Survey" },
  { value: "App Review", label: "App Review" },
  { value: "Social Media", label: "Social Media" },
  { value: "Other", label: "Other" },
];

const ratings = [
  { value: 1, label: "1 - Very Dissatisfied" },
  { value: 2, label: "2 - Dissatisfied" },
  { value: 3, label: "3 - Neutral" },
  { value: 4, label: "4 - Satisfied" },
  { value: 5, label: "5 - Very Satisfied" },
];

const status = [
  { value: "New", label: "New" },
  { value: "Reviewed", label: "Reviewed" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
];

const EditFeedback = ({
  editFeedback,
  editFromData,
  feedback,
  editFeedbackData,
  editLoader,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            className="text-blue-400 cursor-pointer hover:bg-blue-500/10 hover:text-blue-300">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <AlertDialogContent className="border border-white/10 bg-[#0b1020] text-white shadow-2xl shadow-black/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-white">
            Edit feedback
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400">
            Update this feedback&apos;s role and workspace permissions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className=" py-4 grid md:grid-cols-2 gap-3">
          {/* Member Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Customer Name
            </label>

            <input
              type="text"
              name="customerName"
              onChange={editFromData}
              value={editFeedbackData?.customerName}
              placeholder="Update customer name"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-400 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Title</label>

            <input
              type="text"
              name="title"
              onChange={editFromData}
              placeholder="update title"
              value={editFeedbackData.title}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-400 outline-none"
            />
          </div>

          {/* ratings */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Rating</label>

            <select
              name="rating"
              onChange={editFromData}
              value={editFeedbackData.rating}
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500">
              {ratings.map((rating) => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Source</label>

            <select
              name="source"
              onChange={editFromData}
              value={editFeedbackData.source}
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500">
              {sources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-slate-300">Status</label>

            <select
              name="status"
              onChange={editFromData}
              value={editFeedbackData.status}
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500">
              {status.map((statuses) => (
                <option key={statuses.value} value={statuses.value}>
                  {statuses.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-slate-300">
              Customer message
            </label>

            <textarea
              name="feedbackMessage"
              type="text"
              onChange={editFromData}
              rows={4}
              value={
                editFeedbackData.feedbackMessage
              }
              placeholder="Update customer message"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-400 outline-none"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={editFeedback}
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

export default EditFeedback;
