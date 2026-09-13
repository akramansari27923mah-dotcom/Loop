"use client";

import React, { useState } from "react";
import CardWraper from "./CardWraper";

import { RegisterSchema } from "@/schemas";

import { Field, FieldError, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../Form-error";
import FormSuccess from "../Form-success";
import { authClient } from "@/lib/auth-client";
import { showSuccess } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const route = useRouter();

  const formSubmit = async (value) => {
    const { email, password, name } = value || {};

    setError("");
    setLoader(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    });

    setLoader(false);

    if (error) {
      setError(error.message || "Somthing went wrong!");
      return;
    } else {
      showSuccess("Signed in successfully.");
      route.push("/dashboard");
    }
  };

  return (
    <CardWraper
      headerLabel={"Create an account"}
      backButtonLable={"Already have an account ?"}
      backButtonHref={"/auth/login"}
      showSocial>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <div className="space-y-4 mb-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>name</FieldLabel>
                <Input
                  {...field}
                  placeholder="@username"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="example@gmail.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  placeholder="******"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <FormError message={error && error} />
        <FormSuccess message={""} />

        <Button className={`w-full cursor-pointer ${loader && 'opacity-80'}`} size="lg" type="submit">
          {loader ? (
            <>
            <LoaderCircle className="animate-spin" />
            <span>Creating...</span>
            </>
          ) : "Create"}
        </Button>
      </form>
    </CardWraper>
  );
};

export default RegisterForm;
