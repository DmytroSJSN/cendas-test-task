import { getDatabase } from "../database";
import type { UserCollection, User } from "./user.types";

const getUsersCollection = async (): Promise<UserCollection> => {
  const db = await getDatabase();

  return db.users;
};

export const findUserByName = async (name: string): Promise<User | null> => {
  const users = await getUsersCollection();

  const user = await users.findOne({ selector: { name } }).exec();

  return user?.toJSON() ?? null;
};

export const insertUser = async (name: string): Promise<User> => {
  const users = await getUsersCollection();

  const user = await users.insert({ id: crypto.randomUUID(), name });

  return user.toJSON();
};
