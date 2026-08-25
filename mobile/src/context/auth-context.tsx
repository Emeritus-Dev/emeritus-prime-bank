import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserAccount {
    id: string;
    name: string;
    number: string;
    balance: number;
    frozen: boolean;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isDuress: boolean;
    user: { name: string; initials: string } | null;
    accounts: UserAccount[];
    signIn: (passcode: string) => boolean;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_ACCOUNTS: UserAccount[] = [
    { id: "acc-1", name: "Prime Cheque", number: "•••• 4471", balance: 4218.62, frozen: false },
    { id: "acc-2", name: "Vault Savings", number: "•••• 9903", balance: 18230.00, frozen: false },
];

const DECOY_ACCOUNTS: UserAccount[] = [
    { id: "decoy-1", name: "Standard Cheque", number: "•••• 1092", balance: 1450.00, frozen: false },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDuress, setIsDuress] = useState(false);

    const signIn = (passcode: string) => {
        if (passcode === "9999") {
            setIsDuress(true);
            setIsAuthenticated(true);
            return true;
        }
        if (passcode === "1234") {
            setIsDuress(false);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const signOut = () => {
        setIsAuthenticated(false);
        setIsDuress(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isDuress,
                user: { name: "Tshegofatso Hlabela", initials: "TH" },
                accounts: isDuress ? DECOY_ACCOUNTS : DEFAULT_ACCOUNTS,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useMobileAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useMobileAuth must be used within an AuthProvider");
    return ctx;
}