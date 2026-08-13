import React from "react";

export function InsightsPanel() {
    const cpiRate = 5.2; // Local South African CPI %
    const portfolioYieldRate = 8.4; // Average yield %
    const realYieldDelta = (portfolioYieldRate - cpiRate).toFixed(1);

    return (
        <div className="panel">
            <div>
                <h2 className="section-title">Tax & Wealth Intelligence Radar</h2>
                <p className="section-sub">Automated SARS tax-deductibility flags, cash runway modeling, and inflation yield parity.</p>
            </div>

            {/* INFLATION VS YIELD METRIC CARD */}
            <div
                style={{
                    background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(201, 162, 39, 0.15), transparent 80%), var(--surface)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "14px",
                    padding: "1.4rem",
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Real Yield Parity Analyzer
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "0.2rem" }}>
                        Portfolio Yield: <span style={{ color: "var(--moss)" }}>{portfolioYieldRate}%</span> vs CPI Inflation: <span style={{ color: "var(--amber)" }}>{cpiRate}%</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--parchment-dim)", marginTop: "0.2rem" }}>
                        Your capital is outperforming inflation by <strong style={{ color: "var(--gold)" }}>+{realYieldDelta}% p.a.</strong>
                    </div>
                </div>

                <div className="avatar" style={{ width: "52px", height: "52px", fontSize: "0.9rem", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                    +{realYieldDelta}%
                </div>
            </div>

            {/* TAX DEDUCTIBILITY RADAR LIST */}
            <div style={{ marginTop: "1.8rem" }}>
                <h3 style={{ fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "0.8rem", textTransform: "uppercase" }}>
                    SARS Deductibility & Operational Log
                </h3>

                <div className="transactions-list">
                    <div className="transaction-row" style={{ padding: "0.9rem 1rem" }}>
                        <div className="tx-meta">
                            <div style={{ fontWeight: "600" }}>Home Office Solar & Backup Inverter Utilities</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)" }}>
                                Section 12B Solar Depreciation Allowance • <span style={{ color: "var(--moss)" }}>100% Tax Deductible</span>
                            </div>
                        </div>
                        <div style={{ fontFamily: "var(--mono)", color: "var(--moss)", fontWeight: "600" }}>
                            R 18,500.00
                        </div>
                    </div>

                    <div className="transaction-row" style={{ padding: "0.9rem 1rem" }}>
                        <div className="tx-meta">
                            <div style={{ fontWeight: "600" }}>Professional Software & Cloud Infrastructure</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)" }}>
                                Operational Business Expense • <span style={{ color: "var(--moss)" }}>Tax Deductible</span>
                            </div>
                        </div>
                        <div style={{ fontFamily: "var(--mono)", color: "var(--moss)", fontWeight: "600" }}>
                            R 4,200.00
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}