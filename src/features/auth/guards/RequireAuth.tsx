import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const RequireAuth = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
