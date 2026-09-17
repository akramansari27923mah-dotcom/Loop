/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import CreateMemberForm from "./CreateMemberForm";
import {
  LoaderCircle,
  Menu,
  RefreshCw,
  RotateCcw,
  UsersRound,
} from "lucide-react";
import { useEveryWhere } from "@/context/UseEverywhere";
import InfoAboutAdmin from "../InfoAboutAdmin";
import { api } from "@/lib/axios";
import { dateFormater } from "@/lib/formateDate";
import { Button } from "../ui/button";
import DeleteMember from "../DeleteMember";
import { showError, showSuccess } from "@/lib/toaster";
import EditMember from "../EditMember";

const MembersPage = ({ session }) => {
  const { openSidebar, setOpenSidebar, editRole, setEditRole } =
    useEveryWhere();
  const [members, setMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editLoader, seteEditLoader] = useState(false);

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827] ">
        <InfoAboutAdmin
          icon={"http://www.w3.org/2000/svg"}
          heading={"Admin Access Required"}
          content={
            "This section is restricted to workspace administrators. Please contact your workspace administrator if you need access to this page."
          }
        />
      </div>
    );
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoader(true);
        const { data } = await api.get("/getMembers");
        if (data.success) {
          setMembers(data.member);
        }
      } catch (err) {
        console.error("Get member error: ", err.message);
      } finally {
        setLoader(false);
      }
    };

    getUser();
  }, [update]);

  const deleteMember = async (id) => {
    try {
      setLoader(true);
      const { data } = await api.delete(`/deleteMember/${id}`);

      if (data.success) {
        showSuccess(data.message);
      }
    } catch (err) {
      console.error("DELETE MEMBER ERROR", err.message);
    } finally {
      setUpdate(!update);
      setLoader(false);
    }
  };

  const editMember = async (id) => {
    try {
      seteEditLoader(true);
      const { data } = await api.patch(`/member/editMember/${id}`, {
        role: editRole,
      });

      if (data?.success) return showSuccess("Member updated successfully.");
    } catch (err) {
      console.error(err?.message || "Somthing went wrong!");
      showError(err?.response?.data?.message);
    } finally {
      seteEditLoader(false);
      setUpdate(!update);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f2c] to-[#111827]">
      <nav className="flex px-5 sticky top-0 justify-between items-center h-20 border-b border-gray-800">
        <div className="flex justify-center items-center gap-2">
          {!openSidebar && (
            <div
              onClick={() => setOpenSidebar(!openSidebar)}
              className="text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Menu />
            </div>
          )}
          <div className="">
            <h1 className="text-white text-2xl">Members</h1>
            <p className="text-gray-400 text-sm hidden md:block">
              Manage your team members and invitations.
            </p>
            <p className="text-gray-400 text-sm  md:hidden">Manage your team</p>
          </div>
        </div>

        <div>
          <CreateMemberForm update={update} setUpdate={setUpdate} />
        </div>
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

      {loader ? (
        <div className="flex min-h-75 items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-10 py-8 shadow-2xl shadow-indigo-500/5 backdrop-blur-xl">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl" />
              <LoaderCircle className="relative h-8 w-8 animate-spin text-indigo-400" />
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-white">
                Loading members
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Please wait while we fetch your workspace members...
              </p>
            </div>
          </div>
        </div>
      ) : members.length > 0 ? (
        <div className="w-full max-w-5xl mx-auto mt-20 overflow-hidden rounded-2xl border border-white/10 bg-white/3] shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl min-w-187.5 text-center">
              {/* Header */}
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Member
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Body */}
              {members.map((items, ind) => (
                <tbody
                  key={items.workspaceId}
                  className="divide-y divide-white/5">
                  {/* Example Row */}
                  <tr className="group transition-all duration-200 hover:bg-white/4">
                    {/* Member */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 capitalize">
                          {ind + 1}
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 capitalize">
                          {items?.email[0]}
                        </div>

                        {/* <div>
                        <p className="font-medium text-white">Akram Ansari</p>
                      </div> */}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-300">
                        {items?.email}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium capitalize text-indigo-400">
                        {items?.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-lg border  px-3 py-1 text-xs font-medium ${items.status === "pending" ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"}`}>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${items.status === "pending" ? "bg-yellow-400" : "bg-emerald-400"}`}
                        />
                        {items?.status}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {dateFormater(items.createdAt)}
                    </td>

                    <div className="flex py-5 justify-center items-center">
                      <td className=" text-sm text-slate-400 ">
                        <DeleteMember
                          deleteMember={() => deleteMember(items._id)}
                          loader={loader}
                        />
                      </td>

                      <td className=" text-sm text-slate-400 ">
                        <EditMember
                          editMember={() => editMember(items._id)}
                          editLoader={loader}
                          member={items}
                          editRole={editRole}
                          setEditRole={setEditRole}
                        />
                      </td>
                    </div>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div className="flex min-h-87.4 mt-30 items-center justify-center">
          <div className="flex max-w-md flex-col items-center text-center">
            {/* Icon */}
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" />

              <UsersRound className="relative h-7 w-7 text-indigo-400" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white">No members yet</h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your workspace doesn&apos;t have any members yet. Invite your team
              members to start collaborating on LOOP.
            </p>

            <div className="mt-6">
              <CreateMemberForm update={update} setUpdate={setUpdate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
