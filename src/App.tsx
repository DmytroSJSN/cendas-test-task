import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RxDatabaseProvider } from "rxdb/plugins/react";
import { useDatabase } from "./db/useDatabase";

const App = () => {
  const { database, error } = useDatabase();

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
          <Route path="/" element={<div>HOME</div>} />
        </Routes>
      </BrowserRouter>
    </RxDatabaseProvider>
  );
};

export default App;
