import { getDatabase } from "../database";
import type { UserCollection, UserDocument } from "./user.types";

const getUsersCollection = async (): Promise<UserCollection> => {
  const db = await getDatabase();

  return db.users;
};

export const getUserByName = async (
  name: string,
): Promise<UserDocument | null> => {
  const normalizedName = normalizeName(name);
  const users = await getUsersCollection();

  return users.findOne({ selector: { name: normalizedName } }).exec();
};

export const createUser = async (name: string): Promise<UserDocument> => {
  const normalizedName = normalizeName(name);
  const users = await getUsersCollection();

  return users.insert({ id: crypto.randomUUID(), name: normalizedName });
};

function normalizeName(name: string): string {
  const normalizedName = name.trim().toLowerCase();

  if (normalizedName.length === 0) {
    throw new Error("User name must not be empty");
  }

  return normalizedName;
}
