import React from "react";

export default function PersonalInfoModal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">Personal Identification & Contact</div>
                <p className="section-sub" style={{ margin: 0 }}>Verified account owner details registered with Emeritus Prime.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                    <div className="bar-row">
                        <span className="field-label">Legal Full Name</span>
                        <div className="field-input">Tshegofatso Hlabela</div>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Registered Mobile</span>
                        <div className="field-input">+27 (0) 79 482 9102</div>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Verified Email</span>
                        <div className="field-input">tshegofatso@emeritus-prime.com</div>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Residential Address</span>
                        <div className="field-input">Cape Town, Western Cape, 8001</div>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}