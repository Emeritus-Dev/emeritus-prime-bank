import React from "react";

export default function ActivityHistoryModal({ onClose }) {
    const logs = [
        { action: "Successful Authentication (FaceID)", ip: "102.165.24.112", location: "Cape Town, ZA", time: "Today, 08:24" },
        { action: "Funds Transfer R2,500 to Vault", ip: "102.165.24.112", location: "Cape Town, ZA", time: "Yesterday, 14:10" },
        { action: "Daily Limit Modified to R15k", ip: "196.24.11.89", location: "Pretoria, ZA", time: "18 Aug 2026" },
    ];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
                <div className="modal-title">Security & Sign-In Audit Trail</div>
                <p className="section-sub" style={{ margin: 0 }}>Immutable record of user access, IP coordinates, and privilege changes.</p>
                <div className="transactions-list" style={{ marginTop: "1rem" }}>
                    {logs.map((l, i) => (
                        <div key={i} className="transaction-row">
                            <div className="tx-meta">
                                <div className="tx-name">{l.action}</div>
                                <div className="tx-date">{l.time} • IP: {l.ip} ({l.location})</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}