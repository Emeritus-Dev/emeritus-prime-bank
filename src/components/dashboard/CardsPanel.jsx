import React, { useState } from "react";
import CreditCard from "../CreditCard.jsx";
import VirtualCardManager from "../VirtualCardManager.jsx";

export function CardsPanel({ accounts = [], onToggleFreeze }) {
    const [showNumbersMap, setShowNumbersMap] = useState({});

    const toggleShowNumbers = (id) => {
        setShowNumbersMap((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="panel">
            <div>
                <h2 className="section-title">My Physical & Digital Cards</h2>
                <p className="section-sub">Tap any credit card to flip 180° and reveal the security CVV and signature strip.</p>
            </div>

            {/* 3D PHYSICAL CARDS SECTION */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "0.5rem" }}>
                {accounts.length > 0 ? (
                    accounts.map((acc) => {
                        const isFrozen = acc.frozen || acc.isFrozen || false;
                        const isNumberVisible = !!showNumbersMap[acc.id];

                        return (
                            <div
                                key={acc.id}
                                style={{
                                    background: "var(--surface)",
                                    border: "1px solid var(--hairline)",
                                    borderRadius: "14px",
                                    padding: "1.5rem 1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.2rem",
                                    alignItems: "center"
                                }}
                            >
                                {/* 3D FLIPPABLE CARD */}
                                <CreditCard
                                    accountName={acc.name}
                                    accountNumber={acc.accountNumber || "4209 5467 8900 0210"}
                                    holderName="TSHEGOFATSO HLABELA"
                                    expiry="08/28"
                                    cvv="963"
                                    isFrozen={isFrozen}
                                    showFullNumber={isNumberVisible}
                                />

                                {/* DEDICATED CARD CONTROLS */}
                                <div style={{ width: "100%", maxWidth: "330px", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    <div className="toggle-row" style={{ padding: "0.4rem 0" }}>
                                        <div>
                                            <div className="tx-name" style={{ fontSize: "0.82rem" }}>
                                                {isFrozen ? "Card Frozen" : "Card Active"}
                                            </div>
                                            <div className="tx-date" style={{ fontSize: "0.7rem" }}>
                                                {isFrozen ? "Swipes and online payments are blocked" : "Ready for point-of-sale swipes"}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`toggle${isFrozen ? " is-on" : ""}`}
                                            onClick={() => onToggleFreeze && onToggleFreeze(acc.id)}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>

                                    <div className="toggle-row" style={{ padding: "0.4rem 0" }}>
                                        <div>
                                            <div className="tx-name" style={{ fontSize: "0.82rem" }}>Show PAN & CVV</div>
                                            <div className="tx-date" style={{ fontSize: "0.7rem" }}>Unhide 16-digit number on screen</div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`toggle${isNumberVisible ? " is-on" : ""}`}
                                            onClick={() => toggleShowNumbers(acc.id)}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">No card facilities available.</div>
                )}
            </div>

            {/* VIRTUAL CARDS / EPHEMERAL SHIELDS */}
            <div style={{ marginTop: "2rem", borderTop: "1px dashed var(--hairline)", paddingTop: "1.5rem" }}>
                <VirtualCardManager />
            </div>
        </div>
    );
}