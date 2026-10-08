import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Enter at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
