import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RxDatabaseProvider } from "rxdb/plugins/react";
import { useDatabase } from "./db/useDatabase";
import AppLayout from "./components/layout/AppLayout";
import RequireAuth from "./features/auth/guards/RequireAuth";
import RequireGuest from "./features/auth/guards/RequireGuest";
import LoginPage from "./features/auth/pages/LoginPage";
import HomePage from "./features/home/pages/HomePage";

const App = () => {
  const { database, error } = useDatabase();

  // TODO: Prevent white flash while the database is loading.
  if (error) {
    return <div>Failed to open database: {error.message}</div>;
  }

  if (database === null) {
    return <div>Loading database...</div>;
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
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RxDatabaseProvider>
  );
};

export default App;
