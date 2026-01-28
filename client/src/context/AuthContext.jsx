import { createContext, useContext, useState } from "react";

// Create context (The "Store")
const AuthContext = createContext();

// Create Provider (The "Wrapper" Component)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Action : Set the User (after Login/Signup)
    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        setUser(null);
        // TODO: will also call the backend logout API here later to clear the cookie
    };

    return (
        <AuthContext.Provider value={{user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

// Create Custom Hook (The "Easy" way to use this context)
export const useAuth = () => {
    return useContext(AuthContext);
}