import React from "react";

export default function AccountCard({ account }) {
    return (
        <div className="account-card">
            <div className="account-name">{account.name}</div>
            <div className="account-balance">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="account-number">{account.number}</div>
        </div>
    );
}