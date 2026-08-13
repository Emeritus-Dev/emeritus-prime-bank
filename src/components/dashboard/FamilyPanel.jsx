import React, { useState } from "react";

export function FamilyPanel() {
    const [members, setMembers] = useState([
        {
            id: "fam-1",
            name: "Junior Sub-Account",
            initials: "TH",
            role: "Dependent / Student",
            weeklyCap: 500,
            spentThisWeek: 180,
            allowanceStatus: "Locked (2 Chores Pending)",
            categoryLockouts: ["Gaming", "Online Retail"],
            emergencyPending: false
        },
        {
            id: "fam-2",
            name: "Family Vault Sub-Account",
            initials: "FV",
            role: "Family Member / Secondary",
            weeklyCap: 2500,
            spentThisWeek: 920,
            allowanceStatus: "Active Auto-Transfer",
            categoryLockouts: [],
            emergencyPending: true
        }
    ]);

    // Triggers an emergency liquidity injection for a dependent
    const handleApproveSOS = (id) => {
        setMembers((prev) => prev.map((m) => m.id === id ? { ...m, emergencyPending: false, spentThisWeek: m.spentThisWeek - 200 } : m));
        alert("Emergency S.O.S. funds approved! R200 instantly transferred to dependent account.");
    };

    // Unlocks allowance upon completing tasks
    const handleUnlockAllowance = (id) => {
        setMembers((prev) => prev.map((m) => m.id === id ? { ...m, allowanceStatus: "Unlocked & Paid" } : m));
        alert("Task completion verified! Weekly allowance released.");
    };

    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Family Wealth & Governance Hub</h2>
                <p className="section-sub">Multi-generational sub-account management, conditional task-based allowances, and emergency capital injections.</p>
            </div>

            {/* MEMBER CARDS GRID */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                {members.map((member) => {
                    const percentSpent = Math.min(100, Math.round((member.spentThisWeek / member.weeklyCap) * 100));

                    return (
                        <div
                            key={member.id}
                            style={{
                                background: "var(--surface)",
                                border: "1px solid var(--hairline)",
                                borderRadius: "14px",
                                padding: "1.4rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem"
                            }}
                        >
                            {/* Member Header */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                                    <div className="avatar">{member.initials}</div>
                                    <div>
                                        <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{member.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)" }}>{member.role}</div>
                                    </div>
                                </div>

                                {member.emergencyPending ? (
                                    <button
                                        type="button"
                                        className="btn-primary"
                                        onClick={() => handleApproveSOS(member.id)}
                                        style={{ background: "var(--rust)", fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                                    >
                                        ⚠ APPROVE R200 S.O.S
                                    </button>
                                ) : (
                                    <span className="action-pill" style={{ fontSize: "0.7rem", color: "var(--moss)" }}>
                                        ● Operational
                                    </span>
                                )}
                            </div>

                            {/* Allowance Progress & Spending Caps */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                                    <span style={{ color: "var(--parchment-dim)" }}>Weekly Cap Usage:</span>
                                    <span style={{ fontFamily: "var(--mono)", color: "var(--gold)" }}>
                                        R {member.spentThisWeek} / R {member.weeklyCap}
                                    </span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${percentSpent}%`,
                                            background: percentSpent > 80 ? "var(--rust)" : "var(--gold)"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Guardrails & Task Unlocks */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.6rem", borderTop: "1px dashed var(--hairline)" }}>
                                <div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--parchment-dim)", textTransform: "uppercase" }}>Category Guardrails</div>
                                    <div style={{ fontSize: "0.78rem", color: "var(--amber)", marginTop: "0.1rem" }}>
                                        {member.categoryLockouts.length > 0
                                            ? `Blocked: ${member.categoryLockouts.join(", ")}`
                                            : "No merchant lockouts active"}
                                    </div>
                                </div>

                                {member.allowanceStatus.includes("Locked") ? (
                                    <button
                                        type="button"
                                        className="action-pill"
                                        onClick={() => handleUnlockAllowance(member.id)}
                                        style={{ fontSize: "0.72rem" }}
                                    >
                                        Unlock Allowance 🔓
                                    </button>
                                ) : (
                                    <span style={{ fontSize: "0.75rem", color: "var(--parchment-dim)" }}>
                                        {member.allowanceStatus}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}