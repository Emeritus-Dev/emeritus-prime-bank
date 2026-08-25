import React from "react";

export default function RegulatoryModal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">FICA & Tax Regulatory Status</div>
                <p className="section-sub" style={{ margin: 0 }}>Compliance verification under South African Reserve Bank mandates.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "1rem" }}>
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">FICA Verification</div>
                            <div className="tx-date">Identity & Proof of Residence verified</div>
                        </div>
                        <span className="modal-success">● Tier 3 Verified</span>
                    </div>
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">SARS Tax Number</div>
                            <div className="tx-date">9482910482 (Individual & Business)</div>
                        </div>
                        <span className="modal-success">● Active</span>
                    </div>
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">FATCA / CRS Status</div>
                            <div className="tx-date">South African Resident for Tax Purposes</div>
                        </div>
                        <span className="modal-success">● Declared</span>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}