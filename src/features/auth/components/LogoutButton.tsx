import Button from "../../../components/ui/Button";
import { useAuthStore } from "../store/auth.store";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Button variant="ghost" onClick={logout}>
      Log out
    </Button>
  );
};

export default LogoutButton;
