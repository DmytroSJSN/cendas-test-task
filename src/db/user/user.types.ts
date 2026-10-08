import type { RxCollection, RxDocument } from "rxdb";

export type UserDocType = {
  id: string;
  name: string;
};

export type UserDocument = RxDocument<UserDocType>;
export type UserCollection = RxCollection<UserDocType>;
