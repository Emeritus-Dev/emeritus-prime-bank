import React, { useState } from "react";

export default function DuressModeModal({ onClose }) {
    const [decoyPin, setDecoyPin] = useState("");
    const [confirmDecoy, setConfirmDecoy] = useState("");
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const handleSaveDuress = (e) => {
        e.preventDefault();
        if (!decoyPin || decoyPin.length < 4) {
            setError("Decoy PIN must be 4 digits.");
            return;
        }
        if (decoyPin !== confirmDecoy) {
            setError("PINs do not match.");
            return;
        }

        setSaved(true);
        setError("");
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
                <div className="modal-title" style={{ color: "var(--rust)" }}>Duress Mode Setup</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Configure a secondary PIN to use if forced under physical threat to open your banking app.
                </p>

                <div style={{ background: "rgba(181, 72, 45, 0.1)", border: "1px solid var(--rust)", padding: "0.8rem", borderRadius: "8px", fontSize: "0.78rem", lineHeight: 1.4, marginTop: "0.5rem" }}>
                    <strong>How it works:</strong> Entering your Decoy PIN logs you into a realistic dummy view displaying a small balance (e.g. R150) while silently dispatching an automated emergency signal to Emeritus Fraud Desk.
                </div>

                {saved ? (
                    <div style={{ textAlign: "center", padding: "1.2rem 0" }}>
                        <div style={{ color: "var(--moss)", fontSize: "0.9rem", fontWeight: "600" }}>✓ Duress PIN Active</div>
                        <p style={{ fontSize: "0.78rem", color: "var(--parchment-dim)", marginTop: "0.3rem" }}>
                            Emergency protocol successfully configured.
                        </p>
                        <button className="btn-primary" onClick={onClose} style={{ width: "100%", marginTop: "1rem" }}>
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSaveDuress} style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "0.5rem" }}>
                        <div>
                            <label className="field-label">Set Decoy 4-Digit PIN</label>
                            <input
                                className="field-input"
                                type="password"
                                maxLength={4}
                                value={decoyPin}
                                onChange={(e) => setDecoyPin(e.target.value)}
                                placeholder="••••"
                            />
                        </div>

                        <div>
                            <label className="field-label">Confirm Decoy PIN</label>
                            <input
                                className="field-input"
                                type="password"
                                maxLength={4}
                                value={confirmDecoy}
                                onChange={(e) => setConfirmDecoy(e.target.value)}
                                placeholder="••••"
                            />
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <div className="modal-actions" style={{ marginTop: "0.5rem" }}>
                            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn-primary">Activate Duress Mode</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}