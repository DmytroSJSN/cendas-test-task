import type { RxJsonSchema } from "rxdb";
import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
} from "../user/user.constants";
import { ID_LENGTH } from "../db.constants";
import {
  CHECKLIST_MAX_STEPS,
  CHECKLIST_MIN_STEPS,
  MARKER_COORDINATE_MAX,
  MARKER_COORDINATE_MIN,
  STEP_STATUSES,
  STEP_TITLE_MAX_LENGTH,
  STEP_TITLE_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "./task.constants";
import type { Task } from "./task.types";

const idProperty = {
  type: "string",
  minLength: ID_LENGTH,
  maxLength: ID_LENGTH,
} as const;

const coordinateProperty = {
  type: "number",
  minimum: MARKER_COORDINATE_MIN,
  maximum: MARKER_COORDINATE_MAX,
} as const;

export const taskSchema: RxJsonSchema<Task> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: idProperty,
    ownerName: {
      type: "string",
      minLength: USER_NAME_MIN_LENGTH,
      maxLength: USER_NAME_MAX_LENGTH,
      ref: "users",
    },
    title: {
      type: "string",
      minLength: TASK_TITLE_MIN_LENGTH,
      maxLength: TASK_TITLE_MAX_LENGTH,
    },
    createdAt: {
      type: "integer",
    },
    updatedAt: {
      type: "integer",
    },
    marker: {
      type: "object",
      properties: {
        x: coordinateProperty,
        y: coordinateProperty,
      },
      required: ["x", "y"],
    },
    checklist: {
      type: "array",
      minItems: CHECKLIST_MIN_STEPS,
      maxItems: CHECKLIST_MAX_STEPS,
      items: {
        type: "object",
        properties: {
          id: idProperty,
          title: {
            type: "string",
            minLength: STEP_TITLE_MIN_LENGTH,
            maxLength: STEP_TITLE_MAX_LENGTH,
          },
          status: {
            type: "string",
            enum: [...STEP_STATUSES],
          },
        },
        required: ["id", "title", "status"],
      },
    },
  },
  required: [
    "id",
    "ownerName",
    "title",
    "createdAt",
    "updatedAt",
    "marker",
    "checklist",
  ],
  indexes: ["ownerName"],
};
