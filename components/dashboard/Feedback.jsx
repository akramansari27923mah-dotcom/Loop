"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Menu,
  MessageCircleQuestion,
  Plus,
  RefreshCw,
  RotateCcw,
  UsersRound,
} from "lucide-react";
import { api } from "@/lib/axios";
import DeleteFeedback from "./feedback/DeleteFeedback";
import { showSuccess } from "@/lib/toaster";
import { useEveryWhere } from "@/context/UseEverywhere";
import EditFeedback from "./feedback/EditFeedback";

const FeedbackPage = ({ session }) => {
  const [feedback, setFeedback] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const { openSidebar, setOpenSidebar, editFeedbackData, setEditFeedbackData } =
    useEveryWhere();

  useEffect(() => {
    const getFeedback = async () => {
      try {
        setLoader(true);
        const { data } = await api.get("/feedback");
        if (!data.success) {
          throw new Error(data.message);
        }
        setFeedback(data.feedback);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoader(false);
      }
    };

    getFeedback();
  }, [update]);

  const deleteFeedback = async (feedbackId) => {
    try {
      setEditLoader(true);
      const { data } = await api.delete(`/feedback/${feedbackId}`);
      console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item._id !== feedbackId),
      );

      showSuccess(data.message);
    } catch (err) {
      console.error(err.message);
    } finally {
      setEditLoader(false);
    }
  };

  const editFromData = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setEditFeedbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editFeedback = async (feedbackId) => {
    try {
      setLoader(true);
      const { data } = await api.patch(`/feedback/${feedbackId}`, {
        editFeedbackData,
      });
      console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      showSuccess(data.message);
    } catch (err) {
      console.error(err.message);
      console.log(err.response);
    } finally {
      setLoader(false);
      setUpdate(!update);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827]">
      <nav className="flex px-5 sticky top-0 justify-between items-center h-20 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {!openSidebar && (
            <div
              onClick={() => setOpenSidebar(!openSidebar)}
              className="text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Menu />
            </div>
          )}

          <div className="text-white text-2xl">
            <h1 className="font-semibold">Feedback</h1>
            <p className="text-sm text-gray-400">
              View and manage all feedback from your workspace.
            </p>
          </div>
        </div>

        <Link href={"/dashboard/feedback/add"}>
          <Button
            className={
              "bg-indigo-500 text-white hover:bg-indigo-400 transition-all duration-300 cursor-pointer"
            }
            size="lg">
            <Plus />
            Create Feedback
          </Button>
        </Link>
      </nav>

      <Button
        onClick={() => setUpdate(!update)}
        size="lg"
        className={
          "fixed top-23 bg-indigo-600 hover:bg-indigo-500 right-4 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-500/20"
        }>
        {loader ? (
          <RefreshCw className="h-5 w-5 animate-spin text-white" />
        ) : (
          <RotateCcw />
        )}
        {loader ? "Refreshing..." : "Refresh"}
      </Button>

      <div className="p-4 mt-5">
        {loader ? (
          <div className="flex min-h-75 items-center justify-center">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-10 py-8 shadow-2xl shadow-indigo-500/5 backdrop-blur-xl">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl" />
                <RefreshCw className="relative h-8 w-8 animate-spin text-indigo-400" />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-white">
                  Loading feedback...
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Please wait while we fetch your workspace members...
                </p>
              </div>
            </div>
          </div>
        ) : feedback.length === 0 ? (
          <div className="flex min-h-87.4 mt-30 items-center justify-center">
            <div className="flex max-w-md flex-col items-center text-center">
              {/* Icon */}
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" />

                <MessageCircleQuestion className="relative h-7 w-7 text-indigo-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white">
                No feedback yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Your workspace doesn&apos;t have any feedback yet. Add feedback
                to start turning customer insights into actionable results with
                LOOP.
              </p>

              <Link href={"/dashboard/feedback/add"}>
                <Button
                  className={
                    "bg-indigo-500 text-white mt-5 hover:bg-indigo-400 transition-all duration-300 cursor-pointer"
                  }
                  size="lg">
                  <Plus />
                  Create Feedback
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {feedback.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-blue-950/30">
                {/* Top gradient glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl transition-all duration-300 group-hover:bg-blue-600/20" />

                {/* Header */}
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-semibold shadow-lg shadow-indigo-500/20">
                      {feedback?.length}
                    </div>

                    <div>
                      <h2 className="truncate text-lg font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Customer feedback
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "New"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : item.status === "Reviewed"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : item.status === "Resolved"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                    }`}>
                    {item.status}
                  </span>
                </div>

                {/* Feedback message */}
                <div className="relative mt-5 rounded-xl border border-white/5 bg-white/2 p-4">
                  <p className="line-clamp-3 text-sm leading-6 text-gray-300">
                    {item.feedbackMessage}
                  </p>
                </div>

                {/* Customer + Source */}
                <div className="relative mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Customer</span>
                    <span className="max-w-[60%] truncate text-sm font-medium text-gray-200">
                      {item.customerName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Source</span>

                    <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
                      {item.source}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/10" />

                {/* Rating */}
                <div className="relative flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>

                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= Number(item.rating)
                              ? "opacity-100"
                              : "opacity-20"
                          }>
                          ★
                        </span>
                      ))}
                    </div>

                    <span className="ml-1 text-sm font-semibold text-white">
                      {item.rating}/5
                    </span>
                  </div>
                </div>

                {/* Hover action */}
                {(session.user.role === "admin" ||
                  session.user?.role === "analyst") && (
                  <div className="relative mt-5 gap-2 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <EditFeedback
                      editFeedback={() => editFeedback(item?._id)}
                      editFromData={editFromData}
                      feedback={item}
                      editFeedbackData={editFeedbackData}
                      editLoader={editLoader}
                    />

                    <DeleteFeedback
                      deleteFeedback={() => deleteFeedback(item._id)}
                      loader={loader}
                    />
                  </div>
                )       }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
