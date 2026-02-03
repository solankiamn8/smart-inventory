import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar.jsx";
import Login from "./features/auth/pages/Login/Login.jsx";
import Signup from "./features/auth/pages/Signup/Signup.jsx";
import Dashboard from "./features/inventory/pages/Dashboard.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";

// Placeholder Componenets
const Home = () => <h2>Home Page</h2>;

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ padding: "2rem" }}>
        <Routes>
          {/* PUBLIC Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* PROTECTED Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
