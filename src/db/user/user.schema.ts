import type { RxJsonSchema } from "rxdb";
import type { User } from "./user.types";
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from "./user.constants";

export const userSchema: RxJsonSchema<User> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      minLength: USER_NAME_MIN_LENGTH,
      maxLength: USER_NAME_MAX_LENGTH,
    },
  },
  required: ["id", "name"],
};
