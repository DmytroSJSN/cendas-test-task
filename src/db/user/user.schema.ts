import type { RxJsonSchema } from "rxdb";
import type { User } from "./user.types";
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from "../../features/user/user.constants";

export const userSchema: RxJsonSchema<User> = {
  version: 0,
  primaryKey: "name",
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: USER_NAME_MIN_LENGTH,
      maxLength: USER_NAME_MAX_LENGTH,
    },
  },
  required: ["name"],
};
