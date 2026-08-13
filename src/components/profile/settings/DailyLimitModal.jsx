import React, { useState } from "react";
import FoxMark from "../../FoxMark.jsx";

export default function DailyLimitModal({ onClose, currentLimit = 15000, onUpdateLimit }) {
    const [selectedLimit, setSelectedLimit] = useState(currentLimit);
    const [pin, setPin] = useState("");
    const [isVerifyingFace, setIsVerifyingFace] = useState(false);
    const [faceVerified, setFaceVerified] = useState(false);
    const [error, setError] = useState("");

    // Detects if user is increasing their limit to trigger step-up security
    const isIncrease = selectedLimit > currentLimit;

    const handleFaceScan = () => {
        setIsVerifyingFace(true);
        setTimeout(() => {
            setIsVerifyingFace(false);
            setFaceVerified(true);
        }, 1500);
    };

    const handleSave = () => {
        // Instant decrease without extra security steps
        if (!isIncrease) {
            onUpdateLimit(selectedLimit);
            onClose();
            return;
        }

        // Limit increases require PIN + Face verification
        if (!pin || pin.length < 4) {
            setError("Please enter your 4-digit PIN.");
            return;
        }

        if (!faceVerified) {
            setError("Facial verification required to increase daily transfer limits.");
            return;
        }

        onUpdateLimit(selectedLimit);
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
                <div className="modal-title">Daily Transfer Limit</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Lowering limits takes effect immediately. Increasing limits requires 2-factor verification.
                </p>

                {/* Amount display */}
                <div style={{ textAlign: "center", padding: "1.2rem 0" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "2.2rem", color: "var(--gold)" }}>
                        R {selectedLimit.toLocaleString()}
                    </div>
                    {isIncrease && (
                        <div style={{ fontSize: "0.75rem", color: "var(--amber)", marginTop: "0.2rem" }}>
                            ▲ Step-up security required for limit increases
                        </div>
                    )}
                </div>

                {/* Interactive range slider */}
                <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={selectedLimit}
                    onChange={(e) => {
                        setSelectedLimit(Number(e.target.value));
                        setError("");
                    }}
                    style={{ width: "100%", accentColor: "var(--gold)" }}
                />

                {/* Quick preset buttons */}
                <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.8rem", justifyContent: "center" }}>
                    {[5000, 15000, 50000, 100000].map((preset) => (
                        <button key={preset} type="button" className="action-pill" onClick={() => setSelectedLimit(preset)}>
                            R{(preset / 1000)}k
                        </button>
                    ))}
                </div>

                {/* Additional security step rendered only on limit increases */}
                {isIncrease && (
                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", background: "var(--surface-raised)", padding: "0.85rem", borderRadius: "8px", border: "1px solid var(--hairline)" }}>
                        <div>
                            <label className="field-label">Enter 4-Digit PIN</label>
                            <input
                                className="field-input"
                                type="password"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="••••"
                            />
                        </div>

                        <div style={{ textAlign: "center" }}>
                            {faceVerified ? (
                                <div style={{ color: "var(--moss)", fontSize: "0.8rem" }}>✓ Biometric Scan Passed</div>
                            ) : (
                                <button type="button" className="btn-ghost" onClick={handleFaceScan} disabled={isVerifyingFace} style={{ fontSize: "0.78rem", margin: "0 auto" }}>
                                    {isVerifyingFace ? "Scanning..." : "Scan Face"}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {error && <div className="login-error" style={{ marginTop: "0.5rem" }}>{error}</div>}

                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Confirm Limit</button>
                </div>
            </div>
        </div>
    );
}