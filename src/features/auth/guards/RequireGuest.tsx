import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const RequireGuest = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default RequireGuest;
