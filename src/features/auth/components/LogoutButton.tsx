import Button from "../../../components/ui/Button";
import { useTaskUiStore } from "../../task/store/task-ui.store";
import { useAuthStore } from "../store/auth.store";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const resetTaskUi = useTaskUiStore((state) => state.reset);

  const handleLogout = () => {
    resetTaskUi();
    logout();
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default LogoutButton;
