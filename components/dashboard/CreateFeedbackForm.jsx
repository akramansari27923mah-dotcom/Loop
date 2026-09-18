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
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackSchema } from "@/schemas/feedback";
import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { LoaderCircle, MessageSquarePlus, Plus } from "lucide-react";
import { error } from "better-auth/api";
import { api } from "@/lib/axios";
import FormSuccess from "../Form-success";
import FormError from "../Form-error";

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

const statuses = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

const CreateFeedbackForm = () => {
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      title: "",
      source: "",
      customerName: "",
      feedbackMessage: "",
      rating: 3,
      status: "New",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      setError("");
      setSuccess("");

      const { data } = await api.post("/feedback", formData);

      if (data?.success) {
        setSuccess(data?.message);
      }
    } catch (err) {
      console.error(err.message);
      setError(err?.response?.data?.message);
    } finally {
      setLoader(false);
      form.reset();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Create Feedback
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
          hiden-scrollbar w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-indigo-500/20 bg-linear-to-br from-[#172554] via-[#111827] to-[#0f172a]  text-white shadow-2xl shadow-indigo-950/40">
          <DialogHeader className="border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-400/20">
                <MessageSquarePlus className="h-5 w-5 text-indigo-400" />
              </div>

              <div>
                <DialogTitle className="text-xl font-semibold">
                  Create Feedback
                </DialogTitle>

                <DialogDescription className="mt-1 text-sm text-slate-400">
                  Capture customer feedback and keep your workspace informed.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("Form errors:", errors);
            })}
            className="mt-6 space-y-6">
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="title" className="text-slate-200">
                    Feedback Title
                  </FieldLabel>

                  <Input
                    id="title"
                    placeholder="e.g. Payment failed during checkout"
                    className="mt-2 bg-white/5 border-white/10 focus:border-indigo-500"
                    {...field}
                  />

                  {fieldState.error && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />

            {/* Two Column Section */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Customer Name */}
              <Controller
                name="customerName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel
                      htmlFor="customerName"
                      className="text-slate-200">
                      Customer Name
                    </FieldLabel>

                    <Input
                      id="customerName"
                      placeholder="e.g. Rahul Sharma"
                      className="mt-2 bg-white/5 border-white/10 focus:border-indigo-500"
                      {...field}
                    />

                    {fieldState.error && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Source */}
              <Controller
                name="source"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-slate-200">
                      Feedback Source
                    </FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2 w-full bg-white/5 border-white/10 focus:border-indigo-500">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>

                      <SelectContent>
                        {sources.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Rating + Status */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Rating */}
              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-slate-200">
                      Customer Rating
                    </FieldLabel>

                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger className="mt-2 w-full bg-white/5 border-white/10">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>

                      <SelectContent>
                        {ratings.map((rating) => (
                          <SelectItem
                            key={rating.value}
                            value={rating.value.toString()}>
                            {rating.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Status */}
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-slate-200">Status</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2 w-full bg-white/5 border-white/10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            {/* Message */}
            <Controller
              name="feedbackMessage"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="feedbackMessage"
                      className="text-slate-200">
                      Customer Message
                    </FieldLabel>

                    <span className="text-xs text-slate-500">Be specific</span>
                  </div>

                  <Textarea
                    id="feedbackMessage"
                    placeholder="Describe the customer's feedback, issue, or request..."
                    className=" mt-2 min-h-32.5 resize-none  bg-white/5  border-white/10  focus:border-indigo-500  focus:ring-indigo-500/20"
                    {...field}
                  />

                  {fieldState.error && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />

            <FormSuccess message={success && success} />
            <FormError message={error && error} />

            {/* Footer */}
            <DialogFooter className="border-t border-white/10 pt-5">
              <DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  className="  border-white/10  bg-white/5  text-slate-300  hover:bg-white/10  hover:text-white  focus:outline-none  focus:ring-2  focus:ring-indigo-500/20">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="  bg-indigo-600  hover:bg-indigo-500  text-white shadow-lg shadow-indigo-500/20 transition-all duration-300">
                {loader ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Feedback
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

export default CreateFeedbackForm;
