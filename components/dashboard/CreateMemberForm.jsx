"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle, Send, UserPlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema } from "@/schemas";
import { api } from "@/lib/axios";
import FormSuccess from "../Form-success";
import FormError from "../Form-error";

const roles = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Analyst",
    value: "analyst",
  },
  {
    label: "Viewer",
    value: "viewer",
  },
];

const CreateMemberForm = ({update, setUpdate}) => {
  const forms = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const inviteToMember = async (value) => {
    setLoader(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await api.post("/invitationMember", value);

      if (data?.success) {
        setSuccess("Invitation sent successfully.");
      }
    } catch (err) {
      console.error(err.message);
      console.log(err.response.data?.message);
      setError(err.response?.data?.message);
    } finally {
      setLoader(false);
      setUpdate(!update)
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger
          render={
            <Button
              size="lg"
              className={
                "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 cursor-pointer"
              }>
              <UserPlus size={17} />
              Invite Member
            </Button>
          }
        />
        <DialogContent
          className={
            "w-full max-w-sm rounded-2xl text-white border border-indigo-500/30 bg-linear-to-br from-[#172554] via-[#111827] to-[#0f172a]"
          }>
          <form onSubmit={forms.handleSubmit(inviteToMember)}>
            <DialogHeader>
              <div className="flex items-center gap-2 text-white">
                <UserPlus />
                <DialogTitle className={"text-lg"}>Invite Member</DialogTitle>
              </div>
              <DialogDescription className={"text-gray-400"}>
                Add a new member to your workspace. They will recive an
                invitation email.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className={"my-4"}>
              <Controller
                name="email"
                control={forms.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-name">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      type={"email"}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Example@gmail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="role"
                control={forms.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Role</FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      items={roles}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {roles.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FormSuccess message={success && success} />
            <FormError message={error && error} />

            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    size="lg"
                    type="button"
                    className={
                      "text-white bg-red-500 hover:bg-red-400 cursor-pointer hover:scale-105 transition-all duration-300"
                    }>
                    Cancel
                  </Button>
                }
              />

              <Button
                size="lg"
                type="submit"
                className={
                  "bg-indigo-600 hover:bg-indigo-400 cursor-pointer hover:scale-105 transition-all duration-300"
                }>
                {loader ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    <span>Send Invitation</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateMemberForm;
