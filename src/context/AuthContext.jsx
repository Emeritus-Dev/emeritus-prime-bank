import React, { createContext, useContext, useState } from "react";
import { DEMO_CUSTOMER } from "../data/mockData.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Clean, standard arrow functions. No need for over-engineered useCallbacks here!
    const signIn = () => setIsAuthenticated(true);
    const signOut = () => setIsAuthenticated(false);

    const value = {
        isAuthenticated,
        customerName: DEMO_CUSTOMER.firstName,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to make grabbing auth state easier in the components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}