import { findUserByName, insertUser } from "../db/user/user.repository";
import type { User } from "../db/user/user.types";
import { userInputSchema, type UserInput } from "../db/user/user.validation";

export const getUserByName = async (input: UserInput): Promise<User | null> => {
  const { name } = userInputSchema.parse(input);

  return findUserByName(name);
};

export const createUser = async (input: UserInput): Promise<User> => {
  const { name } = userInputSchema.parse(input);

  return insertUser(name);
};
