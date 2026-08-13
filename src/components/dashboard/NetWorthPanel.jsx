import React, { useState } from "react";

export function NetWorthPanel({ accounts = [] }) {
    const [zarUsdRate] = useState(18.45); // Benchmark ZAR/USD exchange rate
    const [selectedTab, setSelectedTab] = useState("overview");

    // Liquid cash calculated from accounts array
    const totalLiquidCash = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

    // Fixed physical & off-grid capital assets
    const physicalAssets = [
        { name: "Commercial Laundry Facility Infrastructure", category: "Commercial Equipment", value: 480000, yield: "Operational Business" },
        { name: "High-Yield Private Equity Vault", category: "Equities", value: 350000, yield: "+11.4% p.a." },
        { name: "Off-Grid Microgrid Solar & Battery Array", category: "Infrastructure", value: 165000, yield: "R3,200/mo cost saved" }
    ];

    const totalPhysical = physicalAssets.reduce((sum, a) => sum + a.value, 0);
    const totalAssets = totalLiquidCash + totalPhysical;
    const totalLiabilities = 185000; // Vehicle & Revolving Facility
    const netWealth = totalAssets - totalLiabilities;
    const usdEquiv = (netWealth / zarUsdRate).toLocaleString("en-US", { maximumFractionDigits: 0 });

    return (
        <div className="panel">
            <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 className="section-title">Liquidity & Sovereign Capital</h2>
                    <p className="section-sub">Consolidated asset valuation, off-grid infrastructure capital, and forex exposure index.</p>
                </div>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                        type="button"
                        className={`action-pill${selectedTab === "overview" ? " active" : ""}`}
                        onClick={() => setSelectedTab("overview")}
                        style={{ fontSize: "0.72rem" }}
                    >
                        ZAR Valuation
                    </button>
                    <button
                        type="button"
                        className={`action-pill${selectedTab === "forex" ? " active" : ""}`}
                        onClick={() => setSelectedTab("forex")}
                        style={{ fontSize: "0.72rem" }}
                    >
                        USD Global Index
                    </button>
                </div>
            </div>

            {/* TOP METRIC CARDS */}
            <div className="card-grid" style={{ marginTop: "1rem" }}>
                <div className="info-card" style={{ borderLeft: "3px solid var(--moss)" }}>
                    <div className="info-card-title">Total Gross Assets</div>
                    <div className="info-card-value" style={{ color: "var(--moss)" }}>
                        R {totalAssets.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="info-card-note">Includes Liquid Cash & Infrastructure</div>
                </div>

                <div className="info-card" style={{ borderLeft: "3px solid var(--rust)" }}>
                    <div className="info-card-title">Total Liabilities</div>
                    <div className="info-card-value" style={{ color: "var(--rust)" }}>
                        R {totalLiabilities.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="info-card-note">Vehicle finance & facility credit</div>
                </div>

                <div className="info-card" style={{ borderLeft: "3px solid var(--gold)" }}>
                    <div className="info-card-title">Sovereign Net Wealth</div>
                    <div className="info-card-value" style={{ color: "var(--gold)" }}>
                        {selectedTab === "forex" ? `$ ${usdEquiv} USD` : `R ${netWealth.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`}
                    </div>
                    <div className="info-card-note">
                        {selectedTab === "forex" ? `Benchmarked at 1 USD = ${zarUsdRate} ZAR` : "▲ 4.8% net capital expansion this cycle"}
                    </div>
                </div>
            </div>

            {/* OFF-GRID & INFRASTRUCTURE CAPITAL LEDGER */}
            <div style={{ marginTop: "1.8rem" }}>
                <h3 style={{ fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "0.8rem", textTransform: "uppercase" }}>
                    Physical & Operational Assets Ledger
                </h3>

                <div className="transactions-list">
                    {physicalAssets.map((asset, idx) => (
                        <div key={idx} className="transaction-row" style={{ padding: "0.9rem 1rem" }}>
                            <div className="tx-meta">
                                <div style={{ fontWeight: "600", fontSize: "0.88rem" }}>{asset.name}</div>
                                <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)" }}>
                                    Category: {asset.category} • Yield: <span style={{ color: "var(--amber)" }}>{asset.yield}</span>
                                </div>
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontWeight: "600", color: "var(--gold)" }}>
                                R {asset.value.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}