import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import { createDatabase } from "../../../db/create-database";
import type { AppDatabase } from "../../../db/types";
import { loginOrCreate } from "./auth.service";

let database: AppDatabase;

vi.mock("../../../db/database", () => ({
  getDatabase: async () => database,
}));

beforeEach(async () => {
  database = await createDatabase("cendas-test", getRxStorageMemory());
});

afterEach(async () => {
  await database.remove();
});

const readUsers = async () => {
  const docs = await database.users.find({ sort: [{ name: "asc" }] }).exec();

  return docs.map((doc) => doc.toJSON());
};

describe("loginOrCreate", () => {
  it("creates a single record for concurrent logins with the same name", async () => {
    const [first, second] = await Promise.all([
      loginOrCreate({ name: "Alice" }),
      loginOrCreate({ name: "Alice" }),
    ]);

    expect(first).toEqual({ name: "alice" });
    expect(second).toEqual({ name: "alice" });

    const users = await readUsers();
    expect(users).toEqual([{ name: "alice" }]);
  });

  it("treats names case-insensitively and returns the existing record", async () => {
    const created = await loginOrCreate({ name: "Alice" });
    const again = await loginOrCreate({ name: "alice" });

    expect(again).toEqual(created);

    const users = await readUsers();
    expect(users).toEqual([{ name: "alice" }]);
  });

  it("keeps a separate record per distinct name", async () => {
    await loginOrCreate({ name: "Alice" });
    await loginOrCreate({ name: "Bob" });

    const users = await readUsers();
    expect(users).toEqual([{ name: "alice" }, { name: "bob" }]);
  });
});
