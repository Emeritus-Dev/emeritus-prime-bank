import React, { createContext, useContext, useState } from "react";
import { DEMO_CUSTOMER, ACCOUNTS } from "../data/mockData.js";

const AuthContext = createContext(null);

// Fallback decoy accounts presented when Duress Mode is active
const DECOY_ACCOUNTS = [
    {
        id: "acc-decoy-1",
        name: "Standard Cheque Account",
        accountNumber: "4209 •••• 1092",
        type: "Cheque",
        balance: 1450.00,
        frozen: false
    },
    {
        id: "acc-decoy-2",
        name: "Emergency Savings",
        accountNumber: "8821 •••• 5501",
        type: "Savings",
        balance: 320.00,
        frozen: false
    }
];

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDuressMode, setIsDuressMode] = useState(false);
    const [activeAccounts, setActiveAccounts] = useState(ACCOUNTS);

    const STANDARD_PIN = DEMO_CUSTOMER.passcode || "1234";
    const DURESS_PIN = "9999"; // Secondary coercion trigger PIN

    const signIn = (enteredPin = STANDARD_PIN) => {
        if (enteredPin === DURESS_PIN) {
            // 1. Activate Duress Mode silently
            setIsDuressMode(true);
            setActiveAccounts(DECOY_ACCOUNTS);

            // 2. Dispatch silent security log (simulates emergency fraud desk dispatch)
            console.warn(
                "%c[SECURITY ALERT] DURESS MODE ACTIVATED. Silent emergency panic signal dispatched to Emeritus Fraud Desk.",
                "background: #8b0000; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
            );

            setIsAuthenticated(true);
            return { success: true, duress: true };
        }

        if (enteredPin === STANDARD_PIN) {
            setIsDuressMode(false);
            setActiveAccounts(ACCOUNTS);
            setIsAuthenticated(true);
            return { success: true, duress: false };
        }

        return { success: false, error: "Passcode incorrect. Try 1234 or 9999 for demo." };
    };

    const signOut = () => {
        setIsAuthenticated(false);
        setIsDuressMode(false);
        setActiveAccounts(ACCOUNTS);
    };

    const value = {
        isAuthenticated,
        isDuressMode,
        customerName: isDuressMode ? "T. Hlabela (Restricted)" : DEMO_CUSTOMER.firstName,
        initials: DEMO_CUSTOMER.initials,
        accounts: activeAccounts,
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