import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RxDatabaseProvider } from "rxdb/plugins/react";
import { useDatabase } from "./db/useDatabase";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ErrorPage from "./components/pages/ErrorPage";
import LoadingPage from "./components/pages/LoadingPage";
import RequireAuth from "./features/auth/guards/RequireAuth";
import RequireGuest from "./features/auth/guards/RequireGuest";
import LoginPage from "./features/auth/pages/LoginPage";
import PlanPage from "./features/plan/pages/PlanPage";

const App = () => {
  const { database, error } = useDatabase();

  if (error) {
    return (
      <ErrorPage title="Failed to open database" message={error.message} />
    );
  }

  if (database === null) {
    return <LoadingPage message="Loading database…" />;
  }

  return (
    <RxDatabaseProvider database={database}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<RequireGuest />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<PlanPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RxDatabaseProvider>
  );
};

export default App;
