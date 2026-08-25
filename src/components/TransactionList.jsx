import React from "react";
import { formatCurrency } from "../data/mockData.js";

export default function TransactionList({
                                            transactions = [],
                                            onSelectTransaction,
                                            disputedMap = {},
                                        }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="transactions-list">
                <div className="empty-state">No transactions recorded for this period.</div>
            </div>
        );
    }

    return (
        <div className="transactions-list">
            {transactions.map((tx) => {
                const isDisputed = !!disputedMap[tx.id];
                const isPositive = Number(tx.amount) > 0;
                const merchant = tx.merchant || tx.name || "Payment";
                const location = tx.location || "Cape Town, WC";

                return (
                    <div
                        key={tx.id}
                        className="transaction-row"
                        onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                        style={{
                            cursor: onSelectTransaction ? "pointer" : "default",
                            padding: "0.9rem 1.1rem",
                            transition: "background 0.15s var(--ease)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                            <div
                                className="avatar size-sm"
                                style={{
                                    background: "var(--surface-raised)",
                                    border: "1px solid var(--hairline)",
                                    color: "var(--gold)",
                                    fontWeight: "600",
                                }}
                            >
                                {merchant.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="tx-meta">
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span className="tx-name" style={{ fontWeight: "500" }}>
                                        {merchant}
                                    </span>
                                    {isDisputed && (
                                        <span
                                            style={{
                                                fontSize: "0.65rem",
                                                background: "rgba(181, 72, 45, 0.15)",
                                                color: "var(--rust)",
                                                border: "1px solid var(--rust)",
                                                padding: "0.1rem 0.4rem",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Disputed
                                        </span>
                                    )}
                                </div>
                                <div className="tx-date">
                                    {tx.date} • {location}
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div className={`tx-amount ${isPositive ? "positive" : "negative"}`}>
                                {formatCurrency(tx.amount)}
                            </div>
                            {onSelectTransaction && (
                                <span
                                    style={{
                                        fontSize: "0.68rem",
                                        color: "var(--amber)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    Receipt ❯
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}