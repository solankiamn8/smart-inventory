import { createContext, useContext, useEffect, useState } from "react";
import FullPageLoader from "../components/ui/spinner/FullPageLoader.jsx";

// Create context (The "Store")
const AuthContext = createContext();

// Create Provider (The "Wrapper" Component)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // We don't want to show the "Login page while we are still checking"
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking Auth Status")
        const response = await fetch(
          "http://localhost:8000/api/users/profile",
          {
            method: "GET",
            credentials: "include", // Sends the cookie automatically!
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          console.log('User Restored', data.user)
        } else {
          console.log('Auth Check Failed')
          setUser(null);

        }
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Action : Set the User (after Login/Signup)
  const login = (userData) => {
    setUser(userData);
  };

  // Action : Logout by replacing with expired cookie (async network req)
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {isLoading ? <FullPageLoader /> : children}
    </AuthContext.Provider>
  );
};

// Create Custom Hook (The "Easy" way to use this context)
export const useAuth = () => {
  return useContext(AuthContext);
};
