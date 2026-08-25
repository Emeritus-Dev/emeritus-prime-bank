import React, { useState } from "react";

export default function VirtualCardManager() {
    const [virtualCards, setVirtualCards] = useState([
        {
            id: "vc-1",
            merchant: "Amazon AWS Cloud",
            pan: "4921 •••• •••• 8812",
            expiry: "11/27",
            cvv: "402",
            limit: 5000,
            spent: 3120,
            active: true,
        },
        {
            id: "vc-2",
            merchant: "Single-Use Merchant Token",
            pan: "4921 •••• •••• 1044",
            expiry: "09/26",
            cvv: "771",
            limit: 1500,
            spent: 0,
            active: true,
        }
    ]);

    const handleCreateCard = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const newCard = {
            id: `vc-${Date.now()}`,
            merchant: "Custom Merchant Shield",
            pan: `4921 •••• •••• ${randomDigits}`,
            expiry: "12/28",
            cvv: `${Math.floor(100 + Math.random() * 900)}`,
            limit: 2500,
            spent: 0,
            active: true,
        };
        setVirtualCards([newCard, ...virtualCards]);
    };

    const handleToggleStatus = (id) => {
        setVirtualCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="section-title" style={{ fontSize: "0.95rem" }}>
                    Ephemeral Virtual Cards
                </span>
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleCreateCard}
                    style={{ fontSize: "0.75rem", padding: "0.35rem 0.7rem" }}
                >
                    + Issue Virtual Card
                </button>
            </div>

            <div className="card-grid">
                {virtualCards.map((card) => (
                    <div
                        key={card.id}
                        className="info-card"
                        style={{ opacity: card.active ? 1 : 0.6, borderLeft: "3px solid var(--gold)" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="info-card-title">{card.merchant}</span>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => handleToggleStatus(card.id)}
                                style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}
                            >
                                {card.active ? "Freeze" : "Unfreeze"}
                            </button>
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: "1.05rem", color: "var(--parchment)" }}>
                            {card.pan}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--parchment-dim)" }}>
                            <span>Exp: {card.expiry}</span>
                            <span>CVV: {card.cvv}</span>
                        </div>
                        <div className="bar-track" style={{ height: "4px", marginTop: "0.4rem" }}>
                            <div
                                className="bar-fill"
                                style={{ width: `${(card.spent / card.limit) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}