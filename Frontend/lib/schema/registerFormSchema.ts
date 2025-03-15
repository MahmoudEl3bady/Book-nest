import { z } from "zod";

export const registerFormData = z.object({
  name: z.string(),
  email: z.string().email("Enter a valid email!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    ),
});

export const loginFormData = z.object({
  email: z.string().email("Enter a valid email!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    ),
});

export type RegisterFormSchema = z.infer<typeof registerFormData>;
export type LoginFormSchema = z.infer<typeof loginFormData>;
