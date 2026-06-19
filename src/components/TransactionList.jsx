import React from "react";
import { formatCurrency } from "../data/mockData.js";

export default function TransactionList({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="transactions-list">
                <div className="empty-state">
                    No recent activity to show.
                </div>
            </div>
        );
    }

    return (
        <div className="transactions-list">
            {transactions.map((tx) => (
                <div className="transaction-row" key={tx.id}>
                    <div className="tx-meta">
                        <div className="tx-name">{tx.name}</div>
                        <div className="tx-date">{tx.date}</div>
                    </div>
                    <div className={`tx-amount ${tx.amount >= 0 ? "positive" : "negative"}`}>
                        {formatCurrency(tx.amount)}
                    </div>
                </div>
            ))}
        </div>
    );
}