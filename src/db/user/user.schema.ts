import type { RxJsonSchema } from "rxdb";
import type { User } from "./user.types";

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
      minLength: 3,
      maxLength: 50,
    },
  },
  required: ["id", "name"],
};
