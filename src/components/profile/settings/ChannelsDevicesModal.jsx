import React, { useState } from "react";

export default function ChannelsDevicesModal({ onClose }) {
    const [otpChannel, setOtpChannel] = useState("SMS");
    const [sessions, setSessions] = useState([
        { id: "s1", device: "iPhone 15 Pro", location: "Cape Town, ZA", active: true, isCurrent: true },
        { id: "s2", device: "IntelliJ Dev Client (Windows)", location: "Pretoria, ZA", active: true, isCurrent: false },
        { id: "s3", device: "Chrome Browser", location: "Johannesburg, ZA", active: true, isCurrent: false },
    ]);


    const handleTerminate = (id) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
                <div className="modal-title">Channels & Device Sessions</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Manage active logins and secondary authentication preferences.
                </p>

                {/* OTP Delivery Preference */}
                <div style={{ marginTop: "0.8rem" }}>
                    <label className="field-label">Preferred OTP Delivery Channel</label>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                        {["SMS", "Email", "Push Notification"].map((ch) => (
                            <button
                                key={ch}
                                type="button"
                                className={`action-pill${otpChannel === ch ? " is-active" : ""}`}
                                onClick={() => setOtpChannel(ch)}
                                style={{ flex: 1, textAlign: "center", justifyContent: "center" }}
                            >
                                {ch}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Sessions List */}
                <div style={{ marginTop: "1rem" }}>
                    <div className="field-label" style={{ marginBottom: "0.4rem" }}>Active Sessions</div>
                    <div className="transactions-list">
                        {sessions.map((s) => (
                            <div className="transaction-row" key={s.id}>
                                <div className="tx-meta">
                                    <div className="tx-name">
                                        {s.device} {s.isCurrent ? "• (This Device)" : ""}
                                    </div>
                                    <div className="tx-date">{s.location}</div>
                                </div>
                                {!s.isCurrent && (
                                    <button
                                        type="button"
                                        className="btn-ghost"
                                        onClick={() => handleTerminate(s.id)}
                                        style={{ fontSize: "0.7rem", padding: "0.25rem 0.5rem", color: "var(--rust)" }}
                                    >
                                        Log Out
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}