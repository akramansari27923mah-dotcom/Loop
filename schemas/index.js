import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, {
    error: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, {
    error: "Password is required",
  }),
  name: z.string().min(6, {
    error: "Username must be at least 6 characters",
  }),
});
