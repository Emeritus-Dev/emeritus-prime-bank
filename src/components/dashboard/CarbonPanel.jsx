import React, { useState } from "react";

export function CarbonPanel() {
    const [selectedTab, setSelectedTab] = useState("arbitrage");

    const esgHoldings = [
        {
            title: "Western Cape Commercial Solar Array",
            category: "Section 12B Green Facility",
            invested: 120000,
            sarsTaxDeduction: 150000, // 125% upfront tax write-off
            yieldAPY: "11.20% p.a.",
            co2Sequestered: "18.4 Tons / yr"
        },
        {
            title: "Sub-Saharan Hydroelectric Green Bond",
            category: "Sovereign ESG Debt",
            invested: 50000,
            sarsTaxDeduction: 0,
            yieldAPY: "9.45% p.a.",
            co2Sequestered: "8.1 Tons / yr"
        }
    ];

    return (
        <div className="panel">
            <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 className="section-title">ESG Yield & Carbon Arbitrage</h2>
                    <p className="section-sub">Section 12B renewable tax write-offs, operational eco-efficiency, and high-yield green bonds.</p>
                </div>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                        type="button"
                        className={`action-pill${selectedTab === "arbitrage" ? " active" : ""}`}
                        onClick={() => setSelectedTab("arbitrage")}
                        style={{ fontSize: "0.72rem" }}
                    >
                        Tax Arbitrage
                    </button>
                    <button
                        type="button"
                        className={`action-pill${selectedTab === "opex" ? " active" : ""}`}
                        onClick={() => setSelectedTab("opex")}
                        style={{ fontSize: "0.72rem" }}
                    >
                        Operational OPEX
                    </button>
                </div>
            </div>

            {/* TOP ESG SUMMARY METRICS */}
            <div className="card-grid" style={{ marginTop: "1rem" }}>
                <div className="info-card" style={{ borderLeft: "3px solid var(--moss)" }}>
                    <div className="info-card-title">Section 12B Tax Write-Off</div>
                    <div className="info-card-value" style={{ color: "var(--moss)" }}>
                        R 150,000.00
                    </div>
                    <div className="info-card-note">125% immediate SARS tax deduction claimed</div>
                </div>

                <div className="info-card" style={{ borderLeft: "3px solid var(--gold)" }}>
                    <div className="info-card-title">Average ESG Portfolio Yield</div>
                    <div className="info-card-value" style={{ color: "var(--gold)" }}>
                        10.32% APY
                    </div>
                    <div className="info-card-note">Outperforming standard cash benchmarks</div>
                </div>

                <div className="info-card" style={{ borderLeft: "3px solid var(--amber)" }}>
                    <div className="info-card-title">Net Offset Footprint</div>
                    <div className="info-card-value" style={{ color: "var(--amber)" }}>
                        26.5 Tons CO₂e
                    </div>
                    <div className="info-card-note">Net Positive / Offsets 3x annual emissions</div>
                </div>
            </div>

            {/* GREEN BONDS & TAX ARBITRAGE LEDGER */}
            <div style={{ marginTop: "1.8rem" }}>
                <h3 style={{ fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "0.8rem", textTransform: "uppercase" }}>
                    Verified Green Capital Facilities
                </h3>

                <div className="transactions-list">
                    {esgHoldings.map((facility, idx) => (
                        <div key={idx} className="transaction-row" style={{ padding: "1rem", flexWrap: "wrap", gap: "0.8rem" }}>
                            <div className="tx-meta" style={{ flex: 1 }}>
                                <div style={{ fontWeight: "600", fontSize: "0.92rem" }}>{facility.title}</div>
                                <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)", marginTop: "0.2rem" }}>
                                    {facility.category} • <span style={{ color: "var(--moss)" }}>{facility.co2Sequestered}</span>
                                </div>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontFamily: "var(--mono)", fontWeight: "600", color: "var(--gold)" }}>
                                    R {facility.invested.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "var(--moss)" }}>
                                    Yield: {facility.yieldAPY} {facility.sarsTaxDeduction > 0 ? `• Tax Benefit: R${facility.sarsTaxDeduction.toLocaleString()}` : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}