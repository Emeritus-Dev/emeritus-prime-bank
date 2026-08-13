import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import "./CreditCard.css";

export default function CreditCard({
                                       accountName = "Premier Cheque",
                                       accountNumber = "4209 5467 8900 0210",
                                       holderName = "TSHEGOFATSO HLABELA",
                                       expiry = "08/28",
                                       cvv = "963",
                                       isFrozen = false,
                                       showFullNumber = false
                                   }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Format account number into standard 4-digit blocks
    const formattedPan = showFullNumber
        ? accountNumber
        : `•••• •••• •••• ${accountNumber.slice(-4)}`;

    return (
        <div
            className={`credit-card-wrapper${isFlipped ? " is-flipped" : ""}${isFrozen ? " is-frozen" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className="credit-card-inner">
                {/* FRONT OF CARD */}
                <div className="card-face-surface">
                    <div className="card-brand-header">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <img src={logoImg} alt="Bank Seal" className="card-emblem-img" />
                            <span className="card-bank-title">Emeritus Prime</span>
                        </div>
                        <span style={{ fontSize: "0.68rem", color: "#c9a227", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {accountName}
                        </span>
                    </div>

                    <div className="card-chip-row">
                        <div className="emv-chip-gold">
                            <div className="emv-chip-line" />
                        </div>
                        <svg className="contactless-waves-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8.5 14.5A5 5 0 0 1 12 8a5 5 0 0 1 3.5 6.5" />
                            <path d="M6 17A8.5 8.5 0 0 1 12 5a8.5 8.5 0 0 1 6 12" />
                        </svg>
                    </div>

                    <div className="card-pan-number">{formattedPan}</div>

                    <div className="card-footer-meta">
                        <div>
                            <div className="card-meta-label">Card Holder</div>
                            <div className="card-meta-value">{holderName}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div className="card-meta-label">Expires</div>
                            <div className="card-meta-value" style={{ fontFamily: "monospace" }}>{expiry}</div>
                        </div>
                    </div>
                </div>

                {/* BACK OF CARD */}
                <div className="card-face-surface card-back-surface">
                    <div className="card-magnetic-black-bar" />

                    <div className="card-signature-box">
                        <div className="card-meta-label" style={{ marginBottom: "4px", textAlign: "right" }}>
                            Authorized Signature
                        </div>
                        <div className="card-signature-strip">
                            <span className="card-signature-watermark">Emeritus Prime Bank</span>
                            <div className="card-cvv-display">{showFullNumber ? cvv : "•••"}</div>
                        </div>
                    </div>

                    <div className="card-disclaimer-text">
                        Issued by Emeritus Prime Bank Ltd. Authorised financial services and registered credit provider.
                    </div>
                </div>
            </div>
        </div>
    );
}