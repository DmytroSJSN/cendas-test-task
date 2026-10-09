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

export const insertUserIfNotExists = async (user: User): Promise<User> => {
  const users = await getUsersCollection();

  const userDocument = await users.insertIfNotExists(user);

  return userDocument.toJSON();
};
