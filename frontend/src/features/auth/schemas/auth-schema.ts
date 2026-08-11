import { z } from "zod";

export const signupSchema = z
  .object({

    name: z.string().min(2),

    email: z.email(),

    phone: z.string().min(10),

    password: z.string().min(8),

    confirmPassword: z.string(),

  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({

  email: z.email().optional(),

  phone: z.string().optional(),

  password: z.string().min(8),

});