import React from "react";

export default function ActionCentreModal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Action Centre & Pending Tasks</div>
                <p className="section-sub" style={{ margin: 0 }}>Action items requiring attention or institutional review.</p>
                <div className="transactions-list" style={{ marginTop: "1rem" }}>
                    <div className="transaction-row">
                        <div className="tx-meta">
                            <div className="tx-name" style={{ color: "var(--amber)" }}>SARS Provisional Tax Estimate</div>
                            <div className="tx-date">Upcoming deadline: August 31, 2026</div>
                        </div>
                        <button className="action-pill" onClick={() => alert("Redirecting to Tax Reserve...")}>Review</button>
                    </div>
                    <div className="transaction-row">
                        <div className="tx-meta">
                            <div className="tx-name" style={{ color: "var(--moss)" }}>Proof of Residence Re-validation</div>
                            <div className="tx-date">Compliance valid for 180 days</div>
                        </div>
                        <span className="modal-success" style={{ fontSize: "0.72rem" }}>✓ Current</span>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}