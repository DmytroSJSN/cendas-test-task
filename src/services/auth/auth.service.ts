import { createUser, getUserByName } from "../user/user.service";
import type { User } from "../../db/user/user.types";
import type { UserInput } from "../user/user.validation";

export async function loginOrCreate(input: UserInput): Promise<User> {
  const existingUser = await getUserByName(input);

  if (existingUser) {
    return existingUser;
  }

  return createUser(input);
}
