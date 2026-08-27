import React, { useState } from "react";

export default function PreferenceModal({ onClose }) {
    const [currency, setCurrency] = useState("ZAR");
    const [language, setLanguage] = useState("English (RSA)");
    const [alerts, setAlerts] = useState(true);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                <div className="modal-title">App & Locale Preferences</div>
                <p className="section-sub" style={{ margin: 0 }}>Customise currency benchmarks, notifications, and language.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginTop: "1rem" }}>
                    <div className="bar-row">
                        <span className="field-label">Display Currency Benchmark</span>
                        <select className="field-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="ZAR">ZAR (South African Rand - R)</option>
                            <option value="USD">USD (United States Dollar - $)</option>
                            <option value="EUR">EUR (Euro - €)</option>
                        </select>
                    </div>
                    <div className="bar-row">
                        <span className="field-label">Institutional Language</span>
                        <select className="field-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="English (RSA)">English (South Africa)</option>
                            <option value="Sepedi">Sepedi</option>
                            <option value="isiZulu">isiZulu</option>
                            <option value="Afrikaans">Afrikaans</option>
                        </select>
                    </div>
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">Real-Time In-App Push Alerts</div>
                            <div className="tx-date">Instant debit notifications & security pings</div>
                        </div>
                        <button
                            type="button"
                            className={`toggle${alerts ? " is-on" : ""}`}
                            onClick={() => setAlerts(!alerts)}
                        >
                            <span className="toggle-knob" />
                        </button>
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Save Preferences</button>
                </div>
            </div>
        </div>
    );
}