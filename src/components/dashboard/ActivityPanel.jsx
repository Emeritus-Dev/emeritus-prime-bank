import React, { useState } from "react";
import TransactionList from "../TransactionList.jsx";

export function ActivityPanel({ transactions = [] }) {
    const [selectedTx, setSelectedTx] = useState(null);
    const [filter, setFilter] = useState("all");
    const [disputedTxs, setDisputedTxs] = useState({});

    const enrichedTransactions = transactions.map((tx) => ({
        ...tx,
        merchant: tx.merchant || tx.name || "Merchant Purchase",
        category: tx.category || "General Expenditure",
        location: tx.location || "Cape Town, WC",
        tag: tx.tag || "Personal",
        items: tx.items || [
            { name: "Executive Suite Reservation / Service", qty: 1, price: Math.abs(tx.amount || 1200) }
        ],
        vatAmount: (Math.abs(tx.amount || 1200) * 0.15).toFixed(2),
        reference: tx.id || `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    }));

    const filteredTransactions = enrichedTransactions.filter(
        (tx) => filter === "all" || tx.tag === filter
    );

    const handleDispute = (txId) => {
        setDisputedTxs((prev) => ({ ...prev, [txId]: true }));
        alert(`Dispute lodged for Ref: ${txId}. Case routed to Emeritus Fraud Desk.`);
        setSelectedTx(null);
    };

    return (
        <div className="panel">
            <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 className="section-title">Audit Log & Smart Activity</h2>
                    <p className="section-sub">Enriched real-time transaction ledger with itemized digital receipt inspection.</p>
                </div>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                    {["all", "Personal", "Tax Deductible", "Business"].map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`action-pill${filter === cat ? " is-active" : ""}`}
                            onClick={() => setFilter(cat)}
                            style={{ fontSize: "0.72rem", padding: "0.35rem 0.7rem" }}
                        >
                            {cat === "all" ? "All Activity" : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
                <TransactionList
                    transactions={filteredTransactions}
                    onSelectTransaction={(tx) => setSelectedTx(tx)}
                    disputedMap={disputedTxs}
                />
            </div>

            {selectedTx && (
                <div className="modal-backdrop" onClick={() => setSelectedTx(null)}>
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: "420px", width: "100%", padding: "2rem", borderRadius: "14px" }}
                    >
                        <div style={{ borderBottom: "1px dashed var(--hairline)", paddingBottom: "1rem", marginBottom: "1.2rem", textAlign: "center" }}>
                            <div className="modal-title" style={{ fontSize: "1.2rem", color: "var(--gold)" }}>
                                {selectedTx.merchant}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--parchment-dim)", marginTop: "0.2rem" }}>
                                Digital Verified Receipt • Ref: {selectedTx.reference}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "var(--parchment-dim)" }}>
                                Location: {selectedTx.location}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
                            <div style={{ fontSize: "0.7rem", color: "var(--parchment-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                Line Item Breakdown
                            </div>
                            {selectedTx.items.map((item, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                                    <span>{item.qty}x {item.name}</span>
                                    <span style={{ fontFamily: "var(--mono)" }}>R {item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "var(--surface-raised)", padding: "0.9rem", borderRadius: "8px", border: "1px solid var(--hairline)", marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--parchment-dim)" }}>
                                <span>15% VAT Included:</span>
                                <span>R {selectedTx.vatAmount}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: "700", color: "var(--gold)", marginTop: "0.4rem", paddingTop: "0.4rem", borderTop: "1px solid var(--hairline)" }}>
                                <span>Total Paid:</span>
                                <span>R {Math.abs(selectedTx.amount).toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            <button type="button" className="btn-ghost" onClick={() => setSelectedTx(null)} style={{ flex: 1 }}>
                                CLOSE
                            </button>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => handleDispute(selectedTx.id)}
                                style={{ flex: 1, borderColor: "var(--rust)", color: "var(--rust)" }}
                            >
                                DISPUTE DEBIT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}