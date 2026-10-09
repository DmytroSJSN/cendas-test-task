import { z } from "zod";
import { userInputSchema } from "../../user/schema/user-input.schema";

export const loginSchema = userInputSchema.pick({ name: true });

export type LoginInput = z.infer<typeof loginSchema>;
