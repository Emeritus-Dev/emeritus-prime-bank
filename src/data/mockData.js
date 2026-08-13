export const DEMO_CUSTOMER = {
    firstName: "Tshegofatso",
    initials: "TH",
    passcode: "1234",
};

export const ACCOUNTS = [
    {
        id: "chk-001",
        name: "Prime Checking",
        number: "**** 4471",
        balance: 4218.62,
        frozen: false,
        history: [3120, 3640, 3300, 3890, 4510, 3960, 4218.62],
    },
    {
        id: "sav-001",
        name: "Vault Savings",
        number: "**** 9903",
        balance: 18230.00,
        frozen: false,
        history: [15200, 15700, 16100, 16600, 17300, 17800, 18230.00],
    },
    {
        id: "inv-001",
        name: "Global Equity Fund",
        number: "**** 1124",
        balance: 145200.50,
        frozen: false,
        history: [135000, 138000, 134500, 139000, 142000, 144000, 145200.50],
    },
    {
        id: "bnd-001",
        name: "Fixed-Term Bond",
        number: "**** 2201",
        balance: 50000.00,
        frozen: false,
        history: [50000, 50000, 50000, 50000, 50000, 50000, 50000.00],
    },
    {
        id: "lon-001",
        name: "Flexi Personal Loan",
        number: "**** 8832",
        balance: -12500.00,
        frozen: false,
        history: [-15000, -14500, -14000, -13500, -13000, -12500, -12500.00],
    },
    {
        id: "hom-001",
        name: "Prime Home Loan",
        number: "**** 5519",
        balance: -840500.00,
        frozen: false,
        history: [-850000, -848000, -846000, -844000, -842000, -840500, -840500.00],
    },
];

export const TRANSACTIONS = [
    { id: "t1", name: "Pay — Northside Studio", date: "Jun 17", amount: 1450.00 },
    { id: "t2", name: "Coffee Roasters Co.", date: "Jun 17", amount: -6.40 },
    { id: "t3", name: "Transfer to Vault Savings", date: "Jun 15", amount: -500.00 },
    { id: "t4", name: "Greenline Market", date: "Jun 14", amount: -84.12 },
    { id: "t5", name: "Refund — Atlas Travel", date: "Jun 11", amount: 212.50 },
];

export function formatCurrency(amount) {
    const sign = amount < 0 ? "-" : "+";
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
}