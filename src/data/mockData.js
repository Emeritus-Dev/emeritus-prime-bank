export const DEMO_CUSTOMER = {
    firstName: "Jordan",
    passcode: "1234",
};

export const ACCOUNTS = [
    {
        id: "chk-001",
        name: "Everyday Checking",
        number: "**** 4471",
        balance: 4218.62,
    },
    {
        id: "sav-001",
        name: "Vault Savings",
        number: "**** 9903",
        balance: 18230.00,
    },
];

export const TRANSACTIONS = [
    { id: "t1", name: "Pay — Northside Studio", date: "Jun 17", amount: 1450.00 },
    { id: "t2", name: "Coffee Roasters Co.", date: "Jun 17", amount: -6.40 },
    { id: "t3", name: "Transfer to Vault Savings", date: "Jun 15", amount: -500.00 },
    { id: "t4", name: "Greenline Market", date: "Jun 14", amount: -84.12 },
    { id: "t5", name: "Refund — Atlas Travel", date: "Jun 11", amount: 212.50 },
];

// Simple helper to format numbers into a nice currency display
export function formatCurrency(amount) {
    const sign = amount < 0 ? "-" : "+";
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
}