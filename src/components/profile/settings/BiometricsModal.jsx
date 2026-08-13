import React, { useState } from "react";

export default function BiometricsModal({ onClose }) {
    const [devices, setDevices] = useState([
        { id: "d1", name: "iPhone 15 Pro", type: "FaceID", enabled: true },
        { id: "d2", name: "MacBook Pro TouchBar", type: "Fingerprint", enabled: true },
    ]);

    const toggleBiometric = (id) => {
        setDevices((prev) => prev.map((d) => d.id === id ? { ...d, enabled: !d.enabled } : d));
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
                <div className="modal-title">Biometric Credentials</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Toggle biometric authentication for individual devices.
                </p>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {devices.map((d) => (
                        <div className="toggle-row" key={d.id}>
                            <div>
                                <div className="tx-name">{d.name}</div>
                                <div className="tx-date">{d.type} authentication</div>
                            </div>
                            <button
                                type="button"
                                className={`toggle${d.enabled ? " is-on" : ""}`}
                                onClick={() => toggleBiometric(d.id)}
                            >
                                <span className="toggle-knob" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
                </div>
            </div>
        </div>
    );
}