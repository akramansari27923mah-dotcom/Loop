"use client";

import React, { useState } from "react";
import CardWraper from "./CardWraper";

import { LoginSchema } from "@/schemas";

import {
  Field,
  FieldError,
  FieldLabel,
} from "../ui/field";
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

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const route = useRouter();

  const formSubmit = async (value) => {
    
    const { email, password } = value || {};
    setError("");
    setLoader(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    setLoader(false);

    if (error) {
      setError(error?.message || "Something went wrong!");
    } else {
      showSuccess("Logged in successully");
      route.push("/dashboard");
    }
  };

  return (
    <CardWraper
      headerLabel={"Welcome Back"}
      backButtonLable={"Don't have an account ?"}
      backButtonHref={"/auth/register"}
      showSocial>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <div className="space-y-4 mb-4">
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

        <Button className={`w-full ${loader && 'opacity-70'}`} size="lg" type="submit">
          {loader ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span>Logging...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </CardWraper>
  );
};

export default LoginForm;
