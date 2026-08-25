import React from "react";

export default function FamilyModal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Family Circle Governance</div>
                <p className="section-sub" style={{ margin: 0 }}>Manage dependent sub-accounts and automated weekly allowances.</p>
                <div className="transactions-list" style={{ marginTop: "1rem" }}>
                    <div className="transaction-row">
                        <div className="tx-meta">
                            <div className="tx-name">Junior Sub-Account (TH)</div>
                            <div className="tx-date">Student • Weekly allowance: R500.00</div>
                        </div>
                        <span className="action-pill" style={{ color: "var(--moss)" }}>Active</span>
                    </div>
                    <div className="transaction-row">
                        <div className="tx-meta">
                            <div className="tx-name">Emeritus Family Vault (FV)</div>
                            <div className="tx-date">Joint Reserve • Weekly cap: R2,500.00</div>
                        </div>
                        <span className="action-pill" style={{ color: "var(--moss)" }}>Active</span>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}