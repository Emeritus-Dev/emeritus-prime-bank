import React, { useState } from "react";
import AccountCard from "./AccountCard.jsx";
import TransactionList from "./TransactionList.jsx";
import FoxMark from "./FoxMark.jsx";

export function AccountsPanel({ accounts, transactions, onOpenTransfer }) {
    return (
        <div className="panel">
            <section>
                <div className="section-head">
                    <div className="section-title">Accounts</div>
                    <button className="btn-ghost" onClick={onOpenTransfer}>Move money</button>
                </div>
                <div className="accounts-row" style={{ marginTop: "0.9rem" }}>
                    {accounts.map((a) => <AccountCard account={a} key={a.id} />)}
                </div>
            </section>
            <section>
                <div className="section-head"><div className="section-title">Recent activity</div></div>
                <div style={{ marginTop: "0.9rem" }}><TransactionList transactions={transactions} /></div>
            </section>
        </div>
    );
}

export function NetWorthPanel({ accounts }) {
    const bankTotal = accounts.reduce((sum, a) => sum + a.balance, 0);
    const external = [
        { name: "Old Mutual Invest", value: 32140.0, linked: true },
        { name: "Luno wallet", value: 4380.0, linked: true },
    ];
    const externalTotal = external.reduce((sum, e) => sum + e.value, 0);

    return (
        <div className="panel">
            <div className="card-grid">
                <div className="info-card">
                    <div className="info-card-title">This bank</div>
                    <div className="info-card-value">${bankTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    <div className="info-card-note">Across {accounts.length} accounts</div>
                </div>
                <div className="info-card">
                    <div className="info-card-title">Linked elsewhere</div>
                    <div className="info-card-value">${externalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    <div className="info-card-note">Via open-banking style links, simulated for this demo</div>
                </div>
                <div className="info-card">
                    <div className="info-card-title">Combined net worth</div>
                    <div className="info-card-value">${(bankTotal + externalTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    <div className="info-card-note">What most apps never show you in one place</div>
                </div>
            </div>
            <section>
                <div className="section-title">Linked accounts</div>
                <div className="transactions-list" style={{ marginTop: "0.9rem" }}>
                    {external.map((e) => (
                        <div className="transaction-row" key={e.name}>
                            <div className="tx-meta"><div className="tx-name">{e.name}</div><div className="tx-date">Linked, read-only</div></div>
                            <div className="tx-amount positive">${e.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function InsightsPanel() {
    const categories = [
        { label: "Housing", pct: 38 }, { label: "Groceries", pct: 21 },
        { label: "Subscriptions", pct: 9 }, { label: "Transport", pct: 14 },
        { label: "Everything else", pct: 18 },
    ];
    return (
        <div className="panel">
            <div className="info-card">
                <div className="info-card-title">Cash-flow forecast</div>
                <div className="info-card-value">R820 buffer by payday</div>
                <div className="info-card-note">At your current pace, you're projected to stay positive through the end of the month.</div>
            </div>
            <section>
                <div className="section-title">Where it's going this month</div>
                <div style={{ marginTop: "0.9rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {categories.map((c) => (
                        <div className="bar-row" key={c.label}>
                            <div className="bar-label"><span>{c.label}</span><span>{c.pct}%</span></div>
                            <div className="bar-track"><div className="bar-fill" style={{ width: `${c.pct}%` }} /></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function GoalsPanel() {
    const [roundUp, setRoundUp] = useState(true);
    const goals = [
        { name: "Emergency fund", saved: 9300, target: 15000 },
        { name: "New laptop", saved: 3600, target: 12000 },
    ];
    return (
        <div className="panel">
            <section>
                <div className="section-title">Goals</div>
                <div style={{ marginTop: "0.9rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {goals.map((g) => {
                        const pct = Math.round((g.saved / g.target) * 100);
                        return (
                            <div className="bar-row" key={g.name}>
                                <div className="bar-label"><span>{g.name}</span><span>R{g.saved.toLocaleString()} of R{g.target.toLocaleString()}</span></div>
                                <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section>
                <div className="section-title">Automation</div>
                <div className="transactions-list" style={{ marginTop: "0.9rem", padding: "0 1.25rem" }}>
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">Round up purchases</div>
                            <div className="tx-date">Spare change from every purchase goes to Emergency fund</div>
                        </div>
                        <button
                            type="button"
                            className={`toggle${roundUp ? " is-on" : ""}`}
                            role="switch"
                            aria-checked={roundUp}
                            onClick={() => setRoundUp(!roundUp)}
                        >
                            <span className="toggle-knob" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function CardsPanel({ accounts, onToggleFreeze }) {
    const [locks, setLocks] = useState({ online: false, gambling: true, international: true });
    const toggleLock = (key) => setLocks((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="panel">
            <section>
                <div className="section-title">Your cards</div>
                <div className="accounts-row" style={{ marginTop: "0.9rem" }}>
                    {accounts.map((a) => (
                        <div className="account-card" key={a.id}>
                            <div className="account-name">{a.name}</div>
                            <div className="account-number">{a.number}</div>
                            <button className="btn-ghost" onClick={() => onToggleFreeze(a.id)} style={{ marginTop: "0.4rem" }}>
                                {a.frozen ? "Unfreeze card" : "Freeze card"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <div className="section-title">Merchant locks</div>
                <div className="transactions-list" style={{ marginTop: "0.9rem", padding: "0 1.25rem" }}>
                    {[
                        { key: "online", label: "Block online purchases" },
                        { key: "gambling", label: "Block gambling merchants" },
                        { key: "international", label: "Block international charges" },
                    ].map((item) => (
                        <div className="toggle-row" key={item.key}>
                            <div className="tx-name">{item.label}</div>
                            <button
                                type="button"
                                className={`toggle${locks[item.key] ? " is-on" : ""}`}
                                role="switch"
                                aria-checked={locks[item.key]}
                                onClick={() => toggleLock(item.key)}
                            >
                                <span className="toggle-knob" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function FamilyPanel() {
    const members = [
        { initials: "JM", name: "Jordan (you)", role: "Owner · full access" },
        { initials: "TM", name: "Thandi", role: "Sub-account · R500 weekly limit" },
        { initials: "KM", name: "Kagiso", role: "Viewer · spending visibility only" },
    ];
    return (
        <div className="panel">
            <section>
                <div className="section-head">
                    <div className="section-title">Family</div>
                    <button className="btn-ghost">Invite member</button>
                </div>
                <div className="transactions-list" style={{ marginTop: "0.9rem" }}>
                    {members.map((m) => (
                        <div className="member-row" key={m.initials} style={{ padding: "0.7rem 1.25rem" }}>
                            <div className="avatar">{m.initials}</div>
                            <div className="member-meta">
                                <div className="member-name">{m.name}</div>
                                <div className="member-role">{m.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function CarbonPanel() {
    const breakdown = [
        { label: "Transport", pct: 34 }, { label: "Groceries", pct: 26 },
        { label: "Utilities", pct: 22 }, { label: "Everything else", pct: 18 },
    ];
    return (
        <div className="panel">
            <div className="card-grid">
                <div className="info-card">
                    <div className="info-card-title">This month</div>
                    <div className="info-card-value">142 kg CO₂e</div>
                    <div className="info-card-note">Estimated from your transaction categories</div>
                </div>
                <div className="info-card">
                    <div className="info-card-title">Vs last month</div>
                    <div className="info-card-value">−8%</div>
                    <div className="info-card-note">Mostly from fewer fuel purchases</div>
                </div>
            </div>
            <section>
                <div className="section-title">Breakdown</div>
                <div style={{ marginTop: "0.9rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {breakdown.map((b) => (
                        <div className="bar-row" key={b.label}>
                            <div className="bar-label"><span>{b.label}</span><span>{b.pct}%</span></div>
                            <div className="bar-track"><div className="bar-fill" style={{ width: `${b.pct}%` }} /></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export function CoachPanel() {
    const messages = [
        "You're on track to save about R450 this month if you skip three takeaway orders.",
        "Your Vault Savings balance hasn't moved in 9 days — want to set up an automatic weekly transfer?",
        "Subscriptions detected: R649/month across 4 services. Want a breakdown?",
    ];
    return (
        <div className="panel">
            <div className="section-title">Coach</div>
            <div className="coach-feed">
                {messages.map((m, i) => (
                    <div className="coach-bubble" key={i}>
                        <FoxMark state="verified" small={true} />
                        <span>{m}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}