import React from "react";

export default function WorkInfoModal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Employment & Operational Entity</div>
                <p className="section-sub" style={{ margin: 0 }}>Income source declarations and registered commercial ventures.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                    <div className="bar-row">
                        <span className="field-label">Primary Entity / Occupation</span>
                        <div className="field-input">Software Engineering & Operations</div>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Venture Affiliate</span>
                        <div className="field-input">Commercial Laundry & Retail Projects</div>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Income Band</span>
                        <div className="field-input">R45,000 – R80,000 / month</div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}