import Button from "../../../components/ui/Button";
import { useAuthStore } from "../../auth/store/auth.store";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <section className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-800 p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-zinc-100">
          Hello, {user?.name}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">You are signed in.</p>
        <Button variant="secondary" className="mt-4 w-full" onClick={logout}>
          Log out
        </Button>
      </section>
    </main>
  );
};

export default HomePage;
