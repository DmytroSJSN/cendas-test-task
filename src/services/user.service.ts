import { findUserByName, insertUser } from "../db/user/user.repository";
import type { User } from "../db/user/user.types";

export const getUserByName = async (
  name: string,
): Promise<User | null> => {
  const normalizedName = normalizeName(name);

  return findUserByName(normalizedName);
};

export const createUser = async (name: string): Promise<User> => {
  const normalizedName = normalizeName(name);

  return insertUser(normalizedName);
};

function normalizeName(name: string): string {
  const normalizedName = name.trim().toLowerCase();

  if (normalizedName.length === 0) {
    throw new Error("User name must not be empty");
  }

  return normalizedName;
}
