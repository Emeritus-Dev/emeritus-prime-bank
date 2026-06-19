import React, { useState } from "react";
import { ACCOUNTS, TRANSACTIONS } from "../data/mockData.js";
import { useAuth } from "../context/AuthContext.jsx";
import FoxMark from "./FoxMark.jsx";
import AccountCard from "./AccountCard.jsx";
import TransactionList from "./TransactionList.jsx";
import TransferModal from "./TransferModal.jsx";

export default function Dashboard() {
    const { customerName, signOut } = useAuth();
    const [accounts, setAccounts] = useState(ACCOUNTS);
    const [transactions, setTransactions] = useState(TRANSACTIONS);
    const [isTransferOpen, setIsTransferOpen] = useState(false);

    const handleTransfer = ({ fromId, toId, amount }) => {
        // Update account balances
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) => {
                if (account.id === fromId) {
                    return { ...account, balance: account.balance - amount };
                }
                if (account.id === toId) {
                    return { ...account, balance: account.balance + amount };
                }
                return account;
            })
        );

        // Create a record for the transaction list
        const fromAccount = accounts.find((acc) => acc.id === fromId);
        const toAccount = accounts.find((acc) => acc.id === toId);

        const newTransaction = {
            id: `tx-${Date.now()}`,
            name: `Transfer to ${toAccount?.name || "Account"}`,
            date: "Just now",
            amount: -amount,
        };

        setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    };

    return (
        <div className="shell">
            <header className="topbar">
                <div className="topbar-left">
                    <FoxMark state="verified" />
                    <div className="topbar-brand">Emeritus Prime</div>
                </div>
                <div className="topbar-right">
                    <button className="logout-link" onClick={signOut}>
                        Sign out
                    </button>
                </div>
            </header>

            <main className="dashboard">
                <div className="welcome-line">Welcome back, {customerName}.</div>

                <section>
                    <div className="section-head">
                        <div className="section-title">Your Accounts</div>
                        <button className="btn-ghost" onClick={() => setIsTransferOpen(true)}>
                            Transfer Funds
                        </button>
                    </div>
                    <div className="accounts-row" style={{ marginTop: "1rem" }}>
                        {accounts.map((account) => (
                            <AccountCard account={account} key={account.id} />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="section-head">
                        <div className="section-title">Recent Activity</div>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                        <TransactionList transactions={transactions} />
                    </div>
                </section>
            </main>

            {isTransferOpen && (
                <TransferModal
                    accounts={accounts}
                    onClose={() => setIsTransferOpen(false)}
                    onSubmit={handleTransfer}
                />
            )}
        </div>
    );
}