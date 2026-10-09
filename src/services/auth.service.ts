import { createUser, getUserByName } from "./user.service";
import type { User } from "../db/user/user.types";

export async function loginOrCreate(name: string): Promise<User> {
  const existingUser = await getUserByName(name);

  if (existingUser) {
    return existingUser;
  }

  return createUser(name);
}
