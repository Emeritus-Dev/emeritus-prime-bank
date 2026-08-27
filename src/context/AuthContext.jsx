import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isDuress, setIsDuress] = useState(false);
    const [customerName, setCustomerName] = useState('Tshegofatso Hlabela');
    const [initials, setInitials] = useState('TH');

    const [accounts, setAccounts] = useState([
        {
            id: 'acc-1',
            name: 'SOVEREIGN TREASURY',
            accountNumber: '••• 8842',
            balance: 482950.0,
            limit: 150000,
            type: 'Primary Cheque',
            isFrozen: false,
        },
        {
            id: 'acc-2',
            name: 'TACTICAL RESERVE LIQUIDITY',
            accountNumber: '••• 3109',
            balance: 125400.0,
            limit: 50000,
            type: '7-Day Notice Vault',
            isFrozen: false,
        },
        {
            id: 'acc-3',
            name: 'SOVEREIGN BLACK CARD',
            accountNumber: '••• 9921',
            balance: -18500.0,
            limit: 75000,
            type: 'Credit Facility',
            isCredit: true,
            isFrozen: false,
        },
    ]);

    const [transactions, setTransactions] = useState([
        {
            id: 'tx-1',
            title: 'Bullion Vault Allocation',
            date: 'Today, 08:30',
            category: 'Asset Transfer',
            amount: -45000.0,
            isPositive: false,
            tag: 'Business',
        },
        {
            id: 'tx-2',
            title: 'Offshore Dividend Inflow',
            date: 'Yesterday, 14:15',
            category: 'Yield Distribution',
            amount: 128500.0,
            isPositive: true,
            tag: 'Tax Deductible',
        },
        {
            id: 'tx-3',
            title: 'Private Aviation Charter',
            date: '24 Aug, 11:20',
            category: 'Executive Logistics',
            amount: -32000.0,
            isPositive: false,
            tag: 'Personal',
        },
    ]);

    const toggleCardFreeze = (id) => {
        setAccounts((prev) =>
            prev.map((acc) => (acc.id === id ? { ...acc, isFrozen: !acc.isFrozen } : acc))
        );
    };

    const updateAccountLimit = (id, newLimit) => {
        setAccounts((prev) =>
            prev.map((acc) => (acc.id === id ? { ...acc, limit: newLimit } : acc))
        );
    };

    const login = (pin) => {
        if (pin === '9999') {
            setIsDuress(true);
            setIsAuthenticated(true);
        } else if (pin === '1234') {
            setIsDuress(false);
            setIsAuthenticated(true);
        } else {
            alert('Invalid Security PIN');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isDuress,
                customerName,
                initials,
                accounts,
                transactions,
                toggleCardFreeze,
                updateAccountLimit,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);