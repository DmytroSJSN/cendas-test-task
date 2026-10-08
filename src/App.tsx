import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RxDatabaseProvider } from "rxdb/plugins/react";
import { useDatabase } from "./db/useDatabase";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./features/auth/pages/LoginPage";

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
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RxDatabaseProvider>
  );
};

export default App;
