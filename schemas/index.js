import * as z from "zod";

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

export const workspaceSchema = z.object({
  name: z.string().min(6, "Workspace name must be at least 6 characters"),
  description: z.string(),
});

export const memberSchema = z.object({
  email: z.string().email("Email is required"),
  role: z.enum(["admin", "analyst", "viewer"], {
    error: "Please select a role"
  }),
});
