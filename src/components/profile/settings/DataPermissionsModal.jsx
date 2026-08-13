import React, { useState } from "react";

export default function DataPermissionsModal({ onClose }) {
    const [apps, setApps] = useState([
        { id: "a1", name: "22seven Budget App", access: "Read-only • Transactions", linked: true },
        { id: "a2", name: "Luno Crypto Wallet", access: "Bank Transfer Link", linked: true },
        { id: "a3", name: "Old Mutual Investment Portal", access: "Account Balances", linked: true },
    ]);

    // One-tap Open Banking access revocation
    const handleRevoke = (id) => {
        setApps((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Data Permissions (Open Banking)</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Third-party applications authorized to read or interact with your account data.
                </p>

                <div className="transactions-list" style={{ marginTop: "1rem" }}>
                    {apps.length === 0 ? (
                        <div className="empty-state">No active third-party integrations.</div>
                    ) : (
                        apps.map((app) => (
                            <div className="transaction-row" key={app.id}>
                                <div className="tx-meta">
                                    <div className="tx-name">{app.name}</div>
                                    <div className="tx-date">{app.access}</div>
                                </div>
                                <button
                                    type="button"
                                    className="btn-ghost"
                                    onClick={() => handleRevoke(app.id)}
                                    style={{ fontSize: "0.72rem", color: "var(--rust)", borderColor: "var(--rust)" }}
                                >
                                    Revoke
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}