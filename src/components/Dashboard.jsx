import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FoxMark from './FoxMark';
import TabNav from './TabNav';
import TransferModal from './TransferModal';
import {
    AccountsPanel,
    ActivityPanel,
    NetWorthPanel,
    CardsPanel,
    InsightsPanel,
    GoalsPanel,
    CarbonPanel,
    CoachPanel,
    FamilyPanel,
} from './dashboard/index.js';

export default function Dashboard() {
    const {
        customerName,
        accounts = [],
        transactions = [],
        toggleCardFreeze,
        logout,
        isDuress,
    } = useAuth();

    const [activeTab, setActiveTab] = useState('accounts');
    const [transferModalOpen, setTransferModalOpen] = useState(false);

    const tabs = [
        { id: 'accounts', label: 'Accounts & Liquidity' },
        { id: 'activity', label: 'Audit Activity' },
        { id: 'networth', label: 'Sovereign Net Worth' },
        { id: 'cards', label: 'Cards & Controls' },
        { id: 'insights', label: 'Tax & Radar' },
        { id: 'goals', label: 'Capital Vaults' },
        { id: 'carbon', label: 'ESG / Carbon' },
        { id: 'coach', label: 'Advisory AI' },
        { id: 'family', label: 'Family Office' },
    ];

    const handleTransferSuccess = ({ recipient, amount, reference }) => {
        alert(
            `Sovereign Wire Authorized: R ${Number(amount).toLocaleString('en-ZA', {
                minimumFractionDigits: 2,
            })} dispatched to ${recipient} (Ref: ${reference || 'Capital Transfer'}).`
        );
    };

    return (
        <div className="dashboard-wrapper">
            {/* TOP SOVEREIGN BAR */}
            <header className="sovereign-header">
                <div className="header-left">
                    <FoxMark small={false} state={isDuress ? 'duress' : 'idle'} />
                    <div>
                        <div className={`access-badge ${isDuress ? 'is-duress' : 'is-sovereign'}`}>
                            {isDuress ? 'STANDARD ACCESS (DECOY)' : 'SOVEREIGN ACCESS'}
                        </div>
                        <h1 className="customer-heading">{customerName}</h1>
                    </div>
                </div>

                <div className="header-right">
                    <button type="button" className="action-pill" onClick={logout}>
                        SIGN OUT
                    </button>
                </div>
            </header>

            {/* DURESS WARNING BANNER */}
            {isDuress && (
                <div className="duress-banner">
                    ⚠️ DURESS PROTOCOL ACTIVATED — DECOY ENVIRONMENT ENGAGED
                </div>
            )}

            {/* HORIZONTAL TAB NAVIGATION */}
            <TabNav
                tabs={tabs}
                activeTab={activeTab}
                onTabSelect={(tabId) => setActiveTab(tabId)}
            />

            {/* ACTIVE PANEL VIEW */}
            <main className="dashboard-content">
                {activeTab === 'accounts' && (
                    <AccountsPanel
                        accounts={accounts}
                        onOpenTransfer={() => setTransferModalOpen(true)}
                        onToggleFreeze={toggleCardFreeze}
                    />
                )}
                {activeTab === 'activity' && <ActivityPanel transactions={transactions} />}
                {activeTab === 'networth' && <NetWorthPanel accounts={accounts} />}
                {activeTab === 'cards' && (
                    <CardsPanel accounts={accounts} onToggleFreeze={toggleCardFreeze} />
                )}
                {activeTab === 'insights' && <InsightsPanel />}
                {activeTab === 'goals' && <GoalsPanel />}
                {activeTab === 'carbon' && <CarbonPanel />}
                {activeTab === 'coach' && <CoachPanel accounts={accounts} />}
                {activeTab === 'family' && <FamilyPanel />}
            </main>

            {/* WIRE TRANSFER MODAL */}
            <TransferModal
                isOpen={transferModalOpen}
                onClose={() => setTransferModalOpen(false)}
                onTransferSuccess={handleTransferSuccess}
                accounts={accounts}
            />
        </div>
    );
}