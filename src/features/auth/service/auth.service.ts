import { insertUserIfNotExists } from "../../../db/user/user.repository";
import type { User } from "../../../db/user/user.types";
import { loginSchema, type LoginInput } from "../schema/login.schema";

export async function loginOrCreate(input: LoginInput): Promise<User> {
  const user = loginSchema.parse(input);

  return insertUserIfNotExists(user);
}
