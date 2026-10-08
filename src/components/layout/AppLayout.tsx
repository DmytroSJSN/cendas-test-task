import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex min-h-dvh flex-col bg-zinc-900 text-zinc-100">
    <Outlet />
  </div>
);

export default AppLayout;
