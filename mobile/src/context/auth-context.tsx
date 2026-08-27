import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Account {
    id: string;
    name: string;
    accountNumber: string;
    balance: number;
    currency: string;
    isCredit?: boolean;
    creditLimit?: number;
    isFrozen?: boolean;
}

export interface Transaction {
    id: string;
    title: string;
    category: string;
    date: string;
    amount: number;
    isPositive: boolean;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isDuress: boolean;
    customerName: string;
    initials: string;
    accounts: Account[];
    transactions: Transaction[];
    loginWithPin: (pin: string) => boolean;
    authenticateWithBiometrics: () => Promise<boolean>;
    logout: () => void;
    toggleCardFreeze: (accountId: string) => void;
}

const PRIMARY_ACCOUNTS: Account[] = [
    {
        id: 'acc-1',
        name: 'Sovereign Treasury',
        accountNumber: '••• 8842',
        balance: 482950.0,
        currency: 'ZAR',
        isFrozen: false,
    },
    {
        id: 'acc-2',
        name: 'Tactical Reserve Liquidity',
        accountNumber: '••• 3109',
        balance: 125400.0,
        currency: 'ZAR',
        isFrozen: false,
    },
    {
        id: 'acc-3',
        name: 'Sovereign Black Card',
        accountNumber: '••• 9921',
        balance: -18500.0,
        creditLimit: 250000.0,
        currency: 'ZAR',
        isCredit: true,
        isFrozen: false,
    },
];

const DECOY_ACCOUNTS: Account[] = [
    {
        id: 'acc-decoy-1',
        name: 'Everyday Current Account',
        accountNumber: '••• 1044',
        balance: 1420.5,
        currency: 'ZAR',
        isFrozen: false,
    },
    {
        id: 'acc-decoy-2',
        name: 'Pocket Savings',
        accountNumber: '••• 5590',
        balance: 350.0,
        currency: 'ZAR',
        isFrozen: false,
    },
];

const PRIMARY_TRANSACTIONS: Transaction[] = [
    { id: 'tx-1', title: 'Bullion Vault Allocation', category: 'Asset Transfer', date: 'Today, 08:30', amount: -45000, isPositive: false },
    { id: 'tx-2', title: 'Offshore Dividend Inflow', category: 'Yield Distribution', date: 'Yesterday, 14:15', amount: 128500, isPositive: true },
    { id: 'tx-3', title: 'Private Aviation Charter', category: 'Executive Logistics', date: '24 Aug, 11:00', amount: -32000, isPositive: false },
];

const DECOY_TRANSACTIONS: Transaction[] = [
    { id: 'tx-d1', title: 'Corner Grocer Store', category: 'Groceries', date: 'Today, 09:12', amount: -245.5, isPositive: false },
    { id: 'tx-d2', title: 'Fuel Station Express', category: 'Transport', date: 'Yesterday, 17:40', amount: -400.0, isPositive: false },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDuress, setIsDuress] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>(PRIMARY_ACCOUNTS);
    const [transactions, setTransactions] = useState<Transaction[]>(PRIMARY_TRANSACTIONS);

    const loginWithPin = (pin: string): boolean => {
        if (pin === '1234') {
            setIsDuress(false);
            setAccounts(PRIMARY_ACCOUNTS);
            setTransactions(PRIMARY_TRANSACTIONS);
            setIsAuthenticated(true);
            return true;
        }
        if (pin === '9999') {
            setIsDuress(true);
            setAccounts(DECOY_ACCOUNTS);
            setTransactions(DECOY_TRANSACTIONS);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const authenticateWithBiometrics = async (): Promise<boolean> => {
        setIsDuress(false);
        setAccounts(PRIMARY_ACCOUNTS);
        setTransactions(PRIMARY_TRANSACTIONS);
        setIsAuthenticated(true);
        return true;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsDuress(false);
    };

    const toggleCardFreeze = (accountId: string) => {
        setAccounts((prev) =>
            prev.map((acc) =>
                acc.id === accountId ? { ...acc, isFrozen: !acc.isFrozen } : acc
            )
        );
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isDuress,
                customerName: isDuress ? 'John Doe' : 'Tshegofatso Hlabela',
                initials: isDuress ? 'JD' : 'TH',
                accounts,
                transactions,
                loginWithPin,
                authenticateWithBiometrics,
                logout,
                toggleCardFreeze,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}