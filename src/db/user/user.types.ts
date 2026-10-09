import type { RxCollection } from "rxdb";

export type User = {
  name: string;
};

export type UserCollection = RxCollection<User>;
