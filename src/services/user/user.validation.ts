import { z } from "zod";
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from "./user.constants";

export const userInputSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(USER_NAME_MIN_LENGTH, `Enter at least ${USER_NAME_MIN_LENGTH} characters`)
    .max(
      USER_NAME_MAX_LENGTH,
      `Name must be at most ${USER_NAME_MAX_LENGTH} characters`,
    ),
});

export type UserInput = z.infer<typeof userInputSchema>;
