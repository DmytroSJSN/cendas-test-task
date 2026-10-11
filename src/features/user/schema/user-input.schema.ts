import { z } from "zod";
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from "../../../db/user/user.constants";
import {
  maxMessage,
  minMessage,
} from "../../../utils/validationMessages";

export const userInputSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(USER_NAME_MIN_LENGTH, minMessage("Name", USER_NAME_MIN_LENGTH))
    .max(USER_NAME_MAX_LENGTH, maxMessage("Name", USER_NAME_MAX_LENGTH))
    .regex(/^[^"]+$/, "Name cannot contain double quotes"),
});
