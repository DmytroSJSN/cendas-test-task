import type { RxCollection } from "rxdb";

export type User = {
  id: string;
  name: string;
};

export type UserCollection = RxCollection<User>;
