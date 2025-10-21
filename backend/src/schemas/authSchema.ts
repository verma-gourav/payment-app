import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    firstName: z
      .string()
      .trim()
      .max(30, "First name cannot exceed 30 characters"),
    lastName: z
      .string()
      .trim()
      .max(30, "Last name cannot exceed 30 characters"),
  }),
});

export const signinSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
  }),
});
