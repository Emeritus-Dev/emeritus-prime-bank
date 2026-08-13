import React, { useState } from "react";
import CreditCard from "./CreditCard.jsx";
import FoxMark from "./FoxMark.jsx";

/* ==========================================================================
   1. ACCOUNTS PANEL (SLIDING CARDS WITH MASKED BALANCES RESTORED)
   ========================================================================== */
export function AccountsPanel({ accounts = [], onOpenTransfer }) {
    // Tracks which account card is currently slid open
    const [slidAccountId, setSlidAccountId] = useState(null);

    const handleCardClick = (id) => {
        setSlidAccountId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="panel">
            <div className="section-head">
                <div>
                    <h2 className="section-title">Accounts & Liquidity</h2>
                    <p className="section-sub">Overview of active liquid balances and operational capital.</p>
                </div>
                {onOpenTransfer && (
                    <button className="btn-primary" onClick={onOpenTransfer} style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                        + Transfer Funds
                    </button>
                )}
            </div>

            <div className="accounts-row">
                {accounts.length > 0 ? (
                    accounts.map((acc) => {
                        const isSlid = slidAccountId === acc.id;
                        const isFrozen = acc.frozen || acc.isFrozen || false;

                        return (
                            <div
                                key={acc.id || acc.accountNumber}
                                className={`account-slider-container${isFrozen ? " is-frozen" : ""}`}
                            >
                                {/* REVEALED BACKGROUND PANEL (Reveals actual balance & quick actions on slide) */}
                                <div className="account-actions-bg">
                                    <div>
                                        <div className="revealed-label">Available Balance</div>
                                        <div className="revealed-amount">
                                            R {Number(acc.balance || 0).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="quick-actions-row">
                                        <button
                                            type="button"
                                            className="action-pill"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onOpenTransfer) onOpenTransfer();
                                            }}
                                        >
                                            Transfer
                                        </button>
                                        <button
                                            type="button"
                                            className="action-pill"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Downloading statement for ${acc.name}...`);
                                            }}
                                        >
                                            Statement
                                        </button>
                                    </div>
                                </div>

                                {/* SLIDING FRONT CARD (Masked Balance State) */}
                                <div
                                    className={`account-front${isSlid ? " is-slid" : ""}`}
                                    onClick={() => handleCardClick(acc.id)}
                                >
                                    <div className="front-header">
                                        <div className="front-header-left">
                                            <span className="account-name">{acc.name}</span>
                                            <span className="account-number">{acc.accountNumber}</span>
                                        </div>
                                        <span className="action-pill" style={{ fontSize: "0.65rem" }}>
                                            {acc.type || "Cheque"}
                                        </span>
                                    </div>

                                    <div className="front-footer">
                                        <div>
                                            <div className="revealed-label" style={{ fontSize: "0.65rem" }}>Balance</div>
                                            <div className="masked-balance">••••••••</div>
                                        </div>
                                        <span className="slide-hint">
                                            {isSlid ? "Close ❮" : "Slide to reveal ❯"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">No accounts linked.</div>
                )}
            </div>
        </div>
    );
}

/* ==========================================================================
   2. CARDS PANEL (PHYSICAL 3D FLIPPABLE CARDS)
   ========================================================================== */
export function CardsPanel({ accounts = [], onToggleFreeze }) {
    const [showNumbersMap, setShowNumbersMap] = useState({});

    const toggleShowNumbers = (id) => {
        setShowNumbersMap((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="panel">
            <div>
                <h2 className="section-title">My Physical & Digital Cards</h2>
                <p className="section-sub">Tap any credit card to flip 180° and reveal the security CVV and signature strip.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "0.5rem" }}>
                {accounts.length > 0 ? (
                    accounts.map((acc) => {
                        const isFrozen = acc.frozen || acc.isFrozen || false;
                        const isNumberVisible = !!showNumbersMap[acc.id];

                        return (
                            <div key={acc.id} style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "center" }}>
                                {/* 3D FLIPPABLE CARD */}
                                <CreditCard
                                    accountName={acc.name}
                                    accountNumber={acc.accountNumber || "4209 5467 8900 0210"}
                                    holderName="TSHEGOFATSO HLABELA"
                                    expiry="08/28"
                                    cvv="963"
                                    isFrozen={isFrozen}
                                    showFullNumber={isNumberVisible}
                                />

                                {/* DEDICATED CARD CONTROLS */}
                                <div style={{ width: "100%", maxWidth: "330px", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    <div className="toggle-row" style={{ padding: "0.4rem 0" }}>
                                        <div>
                                            <div className="tx-name" style={{ fontSize: "0.82rem" }}>
                                                {isFrozen ? "Card Frozen" : "Card Active"}
                                            </div>
                                            <div className="tx-date" style={{ fontSize: "0.7rem" }}>
                                                {isFrozen ? "Swipes and online payments are blocked" : "Ready for point-of-sale swipes"}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`toggle${isFrozen ? " is-on" : ""}`}
                                            onClick={() => onToggleFreeze && onToggleFreeze(acc.id)}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>

                                    <div className="toggle-row" style={{ padding: "0.4rem 0" }}>
                                        <div>
                                            <div className="tx-name" style={{ fontSize: "0.82rem" }}>Show PAN & CVV</div>
                                            <div className="tx-date" style={{ fontSize: "0.7rem" }}>Unhide 16-digit number on screen</div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`toggle${isNumberVisible ? " is-on" : ""}`}
                                            onClick={() => toggleShowNumbers(acc.id)}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">No card facilities available.</div>
                )}
            </div>
        </div>
    );
}

/* ==========================================================================
   3. ACTIVITY PANEL
   ========================================================================== */
export function ActivityPanel({ transactions = [] }) {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Recent Activity</h2>
                <p className="section-sub">Real-time audit log of postings and debits.</p>
            </div>

            <div className="transactions-list">
                {transactions.length > 0 ? (
                    transactions.map((tx) => (
                        <div key={tx.id} className="transaction-row">
                            <div className="tx-meta">
                                <div className="tx-name">{tx.name}</div>
                                <div className="tx-date">{tx.date}</div>
                            </div>
                            <div className={`tx-amount ${tx.amount > 0 ? "positive" : "negative"}`}>
                                {tx.amount > 0 ? "+" : ""}R {Math.abs(tx.amount).toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">No recent activity found.</div>
                )}
            </div>
        </div>
    );
}

/* ==========================================================================
   4. NET WORTH PANEL
   ========================================================================== */
export function NetWorthPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Net Worth & Holdings</h2>
                <p className="section-sub">Consolidated asset valuation minus total liabilities.</p>
            </div>

            <div className="card-grid">
                <div className="info-card">
                    <div className="info-card-title">Total Assets</div>
                    <div className="info-card-value" style={{ color: "var(--moss)" }}>R 1,245,000.00</div>
                    <div className="info-card-note">Includes Equities, Property & Cash</div>
                </div>

                <div className="info-card">
                    <div className="info-card-title">Total Liabilities</div>
                    <div className="info-card-value" style={{ color: "var(--rust)" }}>R 185,000.00</div>
                    <div className="info-card-note">Vehicle finance & credit</div>
                </div>

                <div className="info-card">
                    <div className="info-card-title">Net Wealth</div>
                    <div className="info-card-value" style={{ color: "var(--gold)" }}>R 1,060,000.00</div>
                    <div className="info-card-note">▲ 4.2% increase this quarter</div>
                </div>
            </div>
        </div>
    );
}

/* ==========================================================================
   5. INSIGHTS PANEL
   ========================================================================== */
export function InsightsPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Financial Insights</h2>
                <p className="section-sub">Automated spending analysis by category.</p>
            </div>

            <div className="transactions-list">
                <div className="transaction-row">
                    <div className="tx-meta">
                        <div className="tx-name">Investments & Savings</div>
                        <div className="bar-track" style={{ width: "160px", marginTop: "4px" }}>
                            <div className="bar-fill" style={{ width: "65%" }} />
                        </div>
                    </div>
                    <div className="tx-amount">R 12,500.00</div>
                </div>

                <div className="transaction-row">
                    <div className="tx-meta">
                        <div className="tx-name">Utilities & Operational Costs</div>
                        <div className="bar-track" style={{ width: "160px", marginTop: "4px" }}>
                            <div className="bar-fill" style={{ width: "40%", background: "var(--amber)" }} />
                        </div>
                    </div>
                    <div className="tx-amount">R 4,200.00</div>
                </div>
            </div>
        </div>
    );
}

/* ==========================================================================
   6. GOALS PANEL
   ========================================================================== */
export function GoalsPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Capital Goals</h2>
                <p className="section-sub">Targeted savings vaults with automated monthly allocations.</p>
            </div>

            <div className="card-grid">
                <div className="info-card">
                    <div className="info-card-title">Emeritus Emergency Vault</div>
                    <div className="info-card-value">R 45,000 / R 50,000</div>
                    <div className="bar-track">
                        <div className="bar-fill" style={{ width: "90%" }} />
                    </div>
                    <div className="info-card-note">90% achieved • R5,000 remaining</div>
                </div>
            </div>
        </div>
    );
}

/* ==========================================================================
   7. FAMILY PANEL
   ========================================================================== */
export function FamilyPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Family Wealth Hub</h2>
                <p className="section-sub">Linked dependent sub-accounts and allowance caps.</p>
            </div>

            <div className="transactions-list">
                <div className="member-row" style={{ padding: "1rem" }}>
                    <div className="avatar">TH</div>
                    <div className="member-meta" style={{ flex: 1 }}>
                        <div className="member-name">Junior Sub-Account</div>
                        <div className="member-role">Weekly Cap: R500.00 • Read-only viewer</div>
                    </div>
                    <button type="button" className="action-pill">Manage Cap</button>
                </div>
            </div>
        </div>
    );
}

/* ==========================================================================
   8. CARBON PANEL
   ========================================================================== */
export function CarbonPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Carbon Offsetting & Impact</h2>
                <p className="section-sub">Calculated footprint score based on digital transactions.</p>
            </div>

            <div className="info-card">
                <div className="info-card-title">Monthly Footprint Estimator</div>
                <div className="info-card-value" style={{ color: "var(--moss)" }}>142 kg CO₂e</div>
                <div className="info-card-note">▼ 12% lower than regional average in Western Cape.</div>
            </div>
        </div>
    );
}

/* ==========================================================================
   9. COACH PANEL
   ========================================================================== */
export function CoachPanel() {
    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Emeritus Private Coach</h2>
                <p className="section-sub">Algorithmic advisory for portfolio optimization.</p>
            </div>

            <div className="coach-feed">
                <div className="coach-bubble">
                    <FoxMark small={true} />
                    <div>
                        <strong style={{ color: "var(--amber)", fontSize: "0.88rem" }}>Liquidity Advisory:</strong>
                        <p style={{ margin: "0.3rem 0 0", fontSize: "0.82rem", lineHeight: 1.4, color: "var(--parchment-dim)" }}>
                            You have an unallocated surplus in your Premier Cheque account. Moving this to your high-yield call facility could earn an additional 8.2% APY.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}