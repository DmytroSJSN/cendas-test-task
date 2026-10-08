import type { RxJsonSchema } from "rxdb";
import type { UserDocType } from "./user.types";

export const userSchema: RxJsonSchema<UserDocType> = {
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
    },
  },
  required: ["id", "name"],
};
