import React, { useState } from "react";
import { ACCOUNTS, TRANSACTIONS } from "../data/mockData.js";
import { useAuth } from "../context/AuthContext.jsx";
import FoxMark from "./FoxMark.jsx";
import TabNav from "./TabNav.jsx";
import TransferModal from "./TransferModal.jsx";
import ProfileScreen from "./ProfileScreen.jsx";
import {
    AccountsPanel, NetWorthPanel, InsightsPanel,
    GoalsPanel, CardsPanel, FamilyPanel,
    CarbonPanel, CoachPanel
} from "./DashboardPanels.jsx";

export default function Dashboard() {
    const { customerName, initials, signOut } = useAuth();

    const [view, setView] = useState("dashboard");
    const [activeTab, setActiveTab] = useState("accounts");
    const [accounts, setAccounts] = useState(ACCOUNTS);
    const [transactions, setTransactions] = useState(TRANSACTIONS);
    const [isTransferOpen, setIsTransferOpen] = useState(false);

    const handleTransfer = ({ fromId, toId, amount }) => {
        setAccounts((prev) => prev.map((a) => {
            if (a.id === fromId) return { ...a, balance: a.balance - amount };
            if (a.id === toId) return { ...a, balance: a.balance + amount };
            return a;
        }));

        const fromName = accounts.find((a) => a.id === fromId)?.name || "account";
        const toName = accounts.find((a) => a.id === toId)?.name || "account";

        const newTx = {
            id: `tx-${Date.now()}`,
            name: `Transfer: ${fromName} → ${toName}`,
            date: "Just now",
            amount: -amount
        };

        setTransactions((prev) => [newTx, ...prev]);
    };

    const handleToggleFreeze = (id) => {
        setAccounts((prev) => prev.map((a) => a.id === id ? { ...a, frozen: !a.frozen } : a));
    };

    const renderPanel = () => {
        switch(activeTab) {
            case "accounts": return <AccountsPanel accounts={accounts} transactions={transactions} onOpenTransfer={() => setIsTransferOpen(true)} />;
            case "networth": return <NetWorthPanel accounts={accounts} />;
            case "insights": return <InsightsPanel />;
            case "goals": return <GoalsPanel />;
            case "cards": return <CardsPanel accounts={accounts} onToggleFreeze={handleToggleFreeze} />;
            case "family": return <FamilyPanel />;
            case "carbon": return <CarbonPanel />;
            case "coach": return <CoachPanel />;
            default: return null;
        }
    };

    return (
        <div className="shell">
            <header className="topbar">
                <div className="topbar-left">
                    <FoxMark state="verified" small={true} />
                    <div className="topbar-brand">Emeritus Prime Bank</div>
                </div>
                <div className="topbar-right">
                    <button className="profile-trigger" onClick={() => setView("profile")}>
                        <div className="avatar size-sm">{initials}</div>
                        <span className="profile-trigger-name">{customerName}</span>
                    </button>
                    <button className="logout-link" onClick={signOut}>Sign out</button>
                </div>
            </header>

            {view === "profile" ? (
                <ProfileScreen onBack={() => setView("dashboard")} />
            ) : (
                <>
                    <TabNav activeTab={activeTab} onChange={setActiveTab} />
                    <main className="dashboard">
                        <div key={activeTab}>{renderPanel()}</div>
                    </main>
                </>
            )}

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