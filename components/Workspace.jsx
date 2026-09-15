"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { workspaceSchema } from "@/schemas";
import { Building2, LoaderCircle } from "lucide-react";
import { api } from "@/lib/axios";
import { useState } from "react";
import FormSuccess from "./Form-success";
import FormError from "./Form-error";
import { useRouter } from "next/navigation";

const WorkspacePage = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const route = useRouter();
  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (value) => {
    try {
      setLoader(true);
      setSuccess("");
      const { data } = await api.post("/workspace", value);
      console.log(data);

      if (data?.success) {
        setSuccess("Workspace created successfully");
        setTimeout(() => {
          setSuccess("Redirecting to dashboard...");
        }, 1000);

        setTimeout(() => {
          route.push("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error(err?.message);
      setError(err?.response?.data?.message);
    } finally {
      setLoader(false);
      form.reset();
    }
  };

  return (
    <Card className="w-full sm:max-w-md rounded-2xl border border-indigo-500/20 bg-linear-to-br from-[#111827] via-[#0f172a] to-[#1e1b4b]  shadow-xl shadow-indigo-950/40">
      <CardHeader className={"flex justify-center items-center gap-3 mb-5"}>
        <div className="flex items-center justify-center rounded-xl bg-indigo-500/10 p-3">
          <Building2 className="h-8 w-8 text-indigo-400" />
        </div>
        <div>
          <CardTitle className={"text-white text-2xl"}>
            Create Workspace
          </CardTitle>
          <CardDescription className={"text-gray-400 text-sm"}>
            Set up your Workspace and start collecting valuable customer
            feedback.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className={"text-white"}>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className={"space-y-4"}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Workspace Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g Acme Corp"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description (Optional)
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Tell us a little about your workspace..."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/200 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <FormSuccess message={success && success} />
        <FormError message={error && error} />
      </CardContent>
      <CardFooter>
        <Field
          orientation="horizontal"
          className={"flex justify-between items-center"}>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            disabled={loader}
            form="form-rhf-demo"
            className={"cursor-pointer disabled:cursor-not-allowed"}>
            {loader ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default WorkspacePage;
