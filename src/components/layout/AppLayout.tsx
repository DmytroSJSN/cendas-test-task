import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex min-h-dvh flex-col bg-background text-foreground">
    <Outlet />
  </div>
);

export default AppLayout;
