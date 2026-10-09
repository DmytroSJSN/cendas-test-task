import LogoutButton from "../../features/auth/components/LogoutButton";
import { useAuthStore } from "../../features/auth/store/auth.store";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex items-center justify-end gap-3 border-b border-border px-4 py-3">
      <span className="text-sm font-medium capitalize">{user?.name}</span>
      <LogoutButton />
    </header>
  );
};

export default Header;
