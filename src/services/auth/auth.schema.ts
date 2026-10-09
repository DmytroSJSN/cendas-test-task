import { z } from "zod";
import { userInputSchema } from "../user/user.validation";

export const loginSchema = userInputSchema.pick({ name: true });

export type LoginFormValues = z.infer<typeof loginSchema>;
