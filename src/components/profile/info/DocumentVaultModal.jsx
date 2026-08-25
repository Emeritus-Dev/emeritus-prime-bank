import React from "react";

export default function DocumentVaultModal({ onClose }) {
    const docs = [
        { name: "RSA National ID SmartCard.pdf", size: "1.4 MB", date: "Verified Jan 2026" },
        { name: "Proof of Address (Utility).pdf", size: "840 KB", date: "Verified Feb 2026" },
        { name: "SARS Tax Clearance PIN.pdf", size: "420 KB", date: "Verified May 2026" },
    ];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Encrypted Document Vault</div>
                <p className="section-sub" style={{ margin: 0 }}>AES-256 encrypted storage for compliance & KYC documents.</p>
                <div className="transactions-list" style={{ marginTop: "1rem" }}>
                    {docs.map((d, i) => (
                        <div key={i} className="transaction-row">
                            <div className="tx-meta">
                                <div className="tx-name">{d.name}</div>
                                <div className="tx-date">{d.size} • {d.date}</div>
                            </div>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => alert(`Downloading ${d.name}...`)}
                                style={{ fontSize: "0.68rem" }}
                            >
                                Download
                            </button>
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