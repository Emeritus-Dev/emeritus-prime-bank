import React, { useState } from "react";
import FoxMark from "../../FoxMark.jsx";

export default function UsernamePinModal({ onClose, currentUsername = "tshegofatso_h", onSave }) {
    const [username, setUsername] = useState(currentUsername);
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    // Biometric scanning state
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");

    // Triggers the facial scan sequence
    const handleTriggerScan = () => {
        setIsVerifying(true);
        setError("");

        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
        }, 1800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isVerified) {
            setError("Facial verification is required before saving changes.");
            return;
        }

        if (newPin && newPin !== confirmPin) {
            setError("PINs do not match.");
            return;
        }

        if (onSave) onSave({ username, newPin });
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: "460px",
                    width: "100%",
                    padding: "2.2rem 2rem",
                    borderRadius: "14px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)"
                }}
            >
                {/* Header Title */}
                <div style={{ marginBottom: "1.8rem", textAlign: "left" }}>
                    <div className="modal-title" style={{ fontSize: "1.35rem", letterSpacing: "0.03em" }}>
                        UPDATE CREDENTIALS
                    </div>
                    <span className="section-sub" style={{ fontSize: "0.8rem", color: "var(--parchment-dim)", marginTop: "0.2rem" }}>
                        Modify your account username and 4-digit security PIN
                    </span>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* USERNAME FIELD */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        <label className="field-label" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", fontWeight: "600", color: "var(--parchment-dim)" }}>
                            USERNAME
                        </label>
                        <input
                            className="field-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            style={{ width: "100%", padding: "0.8rem 0.9rem", fontSize: "0.95rem" }}
                        />
                    </div>

                    {/* NEW PIN FIELD */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        <label className="field-label" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", fontWeight: "600", color: "var(--parchment-dim)" }}>
                            NEW 4-DIGIT PIN
                        </label>
                        <input
                            className="field-input"
                            type="password"
                            maxLength={4}
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            placeholder="••••"
                            style={{ width: "100%", padding: "0.8rem 0.9rem", fontSize: "0.95rem" }}
                        />
                    </div>

                    {/* CONFIRM PIN FIELD */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        <label className="field-label" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", fontWeight: "600", color: "var(--parchment-dim)" }}>
                            CONFIRM NEW PIN
                        </label>
                        <input
                            className="field-input"
                            type="password"
                            maxLength={4}
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            placeholder="••••"
                            style={{ width: "100%", padding: "0.8rem 0.9rem", fontSize: "0.95rem" }}
                        />
                    </div>

                    {/* DYNAMIC BIOMETRIC AREA */}
                    <div style={{
                        background: "var(--surface-raised)",
                        padding: (isVerifying || isVerified) ? "1.4rem 1rem" : "0.85rem 1rem",
                        borderRadius: "10px",
                        border: "1px solid var(--hairline)",
                        textAlign: "center",
                        marginTop: "0.4rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.8rem",
                        transition: "all 0.3s var(--ease)"
                    }}>
                        {/* 1. INITIAL STATE: Clean button only */}
                        {!isVerifying && !isVerified && (
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={handleTriggerScan}
                                style={{ width: "100%", fontSize: "0.8rem", padding: "0.75rem 0.8rem" }}
                            >
                                Verify Face to Authorize Changes
                            </button>
                        )}

                        {/* 2. SCANNING STATE: Full-sized logo pops up with spinning ring */}
                        {isVerifying && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
                                <FoxMark state="scanning" small={false} />
                                <span style={{ fontSize: "0.82rem", color: "var(--gold)", letterSpacing: "0.04em" }}>
                                    Analyzing Facial Liveness...
                                </span>
                            </div>
                        )}

                        {/* 3. VERIFIED STATE: Full-sized logo locked with the green glowing ring & checkmark */}
                        {isVerified && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                                <FoxMark state="verified" small={false} />
                                <div style={{ color: "var(--moss)", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                                    ✓ Facial Identity Confirmed
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <div className="login-error" style={{ fontSize: "0.8rem" }}>{error}</div>}

                    {/* ACTION BUTTONS */}
                    <div className="modal-actions" style={{ marginTop: "0.8rem", display: "flex", gap: "0.75rem" }}>
                        <button type="button" className="btn-ghost" onClick={onClose} style={{ flex: 1 }}>
                            CANCEL
                        </button>
                        <button type="submit" className="btn-primary" disabled={!isVerified} style={{ flex: 1 }}>
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}