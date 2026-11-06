// import { useState } from "react";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   return loggedIn
//     ? <Dashboard onLogout={() => {
//         localStorage.removeItem("school_token");
//         localStorage.removeItem("school_user");
//         setLoggedIn(false);
//       }} />
//     : <Login onLogin={() => setLoggedIn(true)} />;
// }

import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { apiFetch } from "./api/formApi";

/* Token is saved in localStorage by Login.jsx.
   On refresh we read it back, so the admin stays logged in. */

function hasValidToken() {
  const token = localStorage.getItem("school_token");
  if (!token) return false;

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    // exp is in seconds; no exp means the server decides
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function clearSession() {
  localStorage.removeItem("school_token");
  localStorage.removeItem("school_user");
  sessionStorage.removeItem("school_module");
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const valid = hasValidToken();
    if (!valid) clearSession();
    return valid;
  });

  // confirm the saved token with the server (only logs out if the server rejects it)
  useEffect(() => {
    if (!loggedIn) return;

    apiFetch("/auth/me").catch((err) => {
      if (err.status === 401 || err.status === 403) {
        clearSession();
        setLoggedIn(false);
      }
    });
  }, [loggedIn]);

  // any API call that gets 401 (expired token) sends the user to login
  useEffect(() => {
    const onUnauthorized = () => {
      clearSession();
      setLoggedIn(false);
    };

    window.addEventListener("school:unauthorized", onUnauthorized);
    return () =>
      window.removeEventListener("school:unauthorized", onUnauthorized);
  }, []);

  return loggedIn ? (
    <Dashboard
      onLogout={() => {
        clearSession();
        setLoggedIn(false);
      }}
    />
  ) : (
        <Login
      onLogin={() => {
        sessionStorage.setItem("school_just_logged_in", "1");
        setLoggedIn(true);
      }}
    />
  );
}