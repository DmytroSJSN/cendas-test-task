import { useCallback } from "react";
import type { LoginInput } from "../schema/login.schema";
import { loginOrCreate } from "../service/auth.service";
import { useAuthStore } from "../store/auth.store";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useCallback(
    async (input: LoginInput) => {
      const user = await loginOrCreate(input);
      setUser(user);
    },
    [setUser],
  );
}
