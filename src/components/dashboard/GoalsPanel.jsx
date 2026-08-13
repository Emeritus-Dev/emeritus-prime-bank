import React, { useState } from "react";

export function GoalsPanel() {
    const [vaults, setVaults] = useState([
        {
            id: "vault-1",
            title: "Commercial Laundry Venture Vault",
            category: "Business Expansion",
            currentAmount: 85000,
            targetAmount: 120000,
            earnedInterest: 4200,
            monthlyAutoDeposit: 5000,
            projectedYieldAPY: "8.55% p.a."
        },
        {
            id: "vault-2",
            title: "Emeritus Emergency Reserve",
            category: "Liquid Reserve",
            currentAmount: 46500,
            targetAmount: 50000,
            earnedInterest: 1850,
            monthlyAutoDeposit: 2500,
            projectedYieldAPY: "7.90% p.a."
        },
        {
            id: "vault-3",
            title: "SARS Provisional Tax Holdout",
            category: "Tax Compliance",
            currentAmount: 28000,
            targetAmount: 35000,
            earnedInterest: 920,
            monthlyAutoDeposit: 3000,
            projectedYieldAPY: "7.20% p.a."
        }
    ]);

    const [isSweeping, setIsSweeping] = useState(false);

    const handleTriggerSweep = () => {
        setIsSweeping(true);
        setTimeout(() => {
            setVaults((prev) => prev.map((v) => v.id === "vault-1" ? { ...v, currentAmount: v.currentAmount + 2500 } : v));
            setIsSweeping(false);
            alert("Friday Surplus Sweep executed! R2,500 swept from Premier Cheque into Commercial Laundry Venture Vault.");
        }, 1200);
    };

    return (
        <div className="panel">
            <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 className="section-title">Capital Vault Architectures</h2>
                    <p className="section-sub">Targeted high-yield vaults with automated interest projections and weekly excess liquidity sweeps.</p>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleTriggerSweep}
                    disabled={isSweeping}
                    style={{ fontSize: "0.78rem", padding: "0.45rem 0.9rem" }}
                >
                    {isSweeping ? "Sweeping Surplus..." : "⚡ Execute Friday Sweep"}
                </button>
            </div>

            {/* VAULT CARDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                {vaults.map((vault) => {
                    const percentComplete = Math.min(100, Math.round((vault.currentAmount / vault.targetAmount) * 100));

                    return (
                        <div
                            key={vault.id}
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
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <span style={{ fontSize: "0.68rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        {vault.category}
                                    </span>
                                    <div style={{ fontWeight: "600", fontSize: "1.05rem", marginTop: "0.2rem" }}>
                                        {vault.title}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: "1.1rem", fontWeight: "700", color: "var(--gold)" }}>
                                        R {vault.currentAmount.toLocaleString()} / R {vault.targetAmount.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--moss)" }}>
                                        Includes +R{vault.earnedInterest} interest earned ({vault.projectedYieldAPY})
                                    </div>
                                </div>
                            </div>

                            {/* PROGRESS BAR */}
                            <div>
                                <div className="bar-track" style={{ height: "8px" }}>
                                    <div className="bar-fill" style={{ width: `${percentComplete}%` }} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--parchment-dim)", marginTop: "0.4rem" }}>
                                    <span>{percentComplete}% Progress</span>
                                    <span>Auto-Allocation: R{vault.monthlyAutoDeposit.toLocaleString()} / month</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}