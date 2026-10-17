import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn
    ? <Dashboard onLogout={() => {
        localStorage.removeItem("school_token");
        localStorage.removeItem("school_user");
        setLoggedIn(false);
      }} />
    : <Login onLogin={() => setLoggedIn(true)} />;
}