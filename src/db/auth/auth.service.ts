import { createUser, getUserByName } from "../user/user.service";
import type { UserDocument } from "../user/user.types";

export async function login(name: string): Promise<UserDocument> {
  const existingUser = await getUserByName(name);

  if (existingUser) {
    return existingUser;
  }

  return createUser(name);
}
