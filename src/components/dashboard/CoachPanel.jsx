import React, { useState } from "react";
import FoxMark from "../FoxMark.jsx";

export function CoachPanel({ accounts = [] }) {
    const [idleCashMoved, setIdleCashMoved] = useState(false);

    const handleExecuteYieldMove = () => {
        setIdleCashMoved(true);
        alert("Action Executed! R30,000 transferred from Cheque to 7-Day High-Yield Call Vault. Projected annual yield gain: +R2,450.00.");
    };

    return (
        <div className="panel">
            <div className="section-head">
                <div>
                    <h2 className="section-title">Emeritus Sovereign Advisory AI</h2>
                    <p className="section-sub">Algorithmic CFO intelligence, predictive liquidity modeling, and automated yield optimization.</p>
                </div>
                <span className="action-pill" style={{ color: "var(--moss)", borderColor: "var(--moss)", fontSize: "0.7rem" }}>
                    ● Algorithmic Engine Active
                </span>
            </div>

            {/* ADVISORY FEED CONTAINER */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>

                {/* INSIGHT 1: UNALLOCATED SURPLUS & OPPORTUNITY COST */}
                <div
                    style={{
                        background: "var(--surface)",
                        border: "1px solid var(--hairline)",
                        borderRadius: "14px",
                        padding: "1.4rem",
                        display: "flex",
                        gap: "1.2rem",
                        alignItems: "flex-start"
                    }}
                >
                    <div style={{ marginTop: "0.2rem" }}>
                        <FoxMark small={true} state="verified" />
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.72rem", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>
                                Opportunity Cost Scanner
                            </span>
                            <span style={{ fontSize: "0.7rem", color: "var(--parchment-dim)" }}>Just now</span>
                        </div>

                        <div style={{ fontSize: "1rem", fontWeight: "600", marginTop: "0.3rem" }}>
                            Unallocated Liquid Surplus Detected
                        </div>

                        <p style={{ fontSize: "0.82rem", color: "var(--parchment-dim)", lineHeight: 1.5, marginTop: "0.4rem" }}>
                            You currently hold an unallocated surplus of liquid cash in your Premier Cheque account earning 0% interest. Sweep <strong>R30,000.00</strong> into your 7-Day Call Vault to capture <strong>+8.15% APY</strong> (approx. +R2,450.00/yr in risk-free yield).
                        </p>

                        {!idleCashMoved ? (
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleExecuteYieldMove}
                                style={{ marginTop: "0.9rem", fontSize: "0.78rem", padding: "0.45rem 0.9rem" }}
                            >
                                ⚡ Execute Sweep & Capture Yield
                            </button>
                        ) : (
                            <div style={{ marginTop: "0.9rem", color: "var(--moss)", fontSize: "0.8rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                ✓ Yield Optimised (R30,000 moved to 7-Day Call Vault)
                            </div>
                        )}
                    </div>
                </div>

                {/* INSIGHT 2: PREDICTIVE RUNWAY & SARS TAX DEADLINE */}
                <div
                    style={{
                        background: "var(--surface)",
                        border: "1px solid var(--hairline)",
                        borderRadius: "14px",
                        padding: "1.4rem",
                        display: "flex",
                        gap: "1.2rem",
                        alignItems: "flex-start"
                    }}
                >
                    <div style={{ marginTop: "0.2rem" }}>
                        <FoxMark small={true} state="scanning" />
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.72rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>
                                Predictive Runway & Tax Alert
                            </span>
                            <span style={{ fontSize: "0.7rem", color: "var(--parchment-dim)" }}>Automated Runway Monitor</span>
                        </div>

                        <div style={{ fontSize: "1rem", fontWeight: "600", marginTop: "0.3rem" }}>
                            SARS Provisional Tax Payment Window
                        </div>

                        <p style={{ fontSize: "0.82rem", color: "var(--parchment-dim)", lineHeight: 1.5, marginTop: "0.4rem" }}>
                            Estimated provisional tax liquidity requirement: <strong>R28,000.00</strong>. Based on your current cash burn rate, your total financial runway is <strong>18.4 months</strong>, ensuring full operational stability without liquidating long-term investments.
                        </p>

                        <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.9rem" }}>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => alert("Redirecting to Tax Reserve Vault...")}
                                style={{ fontSize: "0.75rem" }}
                            >
                                View Tax Vault Reserve ❯
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}