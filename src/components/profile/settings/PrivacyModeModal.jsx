import React from "react";

export default function PrivacyModeModal({ onClose, privacySettings, onToggleSetting }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
                <div className="modal-title">Privacy Controls</div>
                <p className="section-sub" style={{ margin: 0 }}>
                    Shoulder-surfer protection to prevent people near you from seeing sensitive account values.
                </p>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {/* Blur all account balances globally */}
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">Blur Balances</div>
                            <div className="tx-date">Replaces numeric balances with masked indicators</div>
                        </div>
                        <button
                            type="button"
                            className={`toggle${privacySettings.blurBalances ? " is-on" : ""}`}
                            onClick={() => onToggleSetting("blurBalances")}
                        >
                            <span className="toggle-knob" />
                        </button>
                    </div>

                    {/* Hide high-value investment cards */}
                    <div className="toggle-row">
                        <div>
                            <div className="tx-name">Hide High-Value Investments</div>
                            <div className="tx-date">Conceals equity and bond cards on main dashboard</div>
                        </div>
                        <button
                            type="button"
                            className={`toggle${privacySettings.hideInvestments ? " is-on" : ""}`}
                            onClick={() => onToggleSetting("hideInvestments")}
                        >
                            <span className="toggle-knob" />
                        </button>
                    </div>
                </div>

                <div className="modal-actions" style={{ marginTop: "1.2rem" }}>
                    <button className="btn-primary" onClick={onClose} style={{ width: "100%" }}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}