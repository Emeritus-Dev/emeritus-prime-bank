import React, { createContext, useContext, useState } from "react";
import { DEMO_CUSTOMER } from "../data/mockData.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = () => setIsAuthenticated(true);
    const signOut = () => setIsAuthenticated(false);

    const value = {
        isAuthenticated,
        customerName: DEMO_CUSTOMER.firstName,
        initials: DEMO_CUSTOMER.initials,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}