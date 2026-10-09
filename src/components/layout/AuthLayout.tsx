import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AuthLayout;
