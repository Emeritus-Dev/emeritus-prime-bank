import React, { useState } from "react";

export function AccountsPanel({ accounts = [], onOpenTransfer }) {
    // State to track which account card is currently slid open
    const [slidAccountId, setSlidAccountId] = useState(null);

    const handleCardClick = (id) => {
        setSlidAccountId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="panel">
            <div className="section-head">
                <div>
                    <h2 className="section-title">Accounts & Liquidity</h2>
                    <p className="section-sub">Overview of active liquid balances and operational capital.</p>
                </div>
                {onOpenTransfer && (
                    <button className="btn-primary" onClick={onOpenTransfer} style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                        + Transfer Funds
                    </button>
                )}
            </div>

            <div className="accounts-row">
                {accounts.length > 0 ? (
                    accounts.map((acc) => {
                        const isSlid = slidAccountId === acc.id;
                        const isFrozen = acc.frozen || acc.isFrozen || false;

                        return (
                            <div
                                key={acc.id || acc.accountNumber}
                                className={`account-slider-container${isFrozen ? " is-frozen" : ""}`}
                            >
                                {/* REVEALED BACKGROUND PANEL (Reveals actual balance & quick actions on slide) */}
                                <div className="account-actions-bg">
                                    <div>
                                        <div className="revealed-label">Available Balance</div>
                                        <div className="revealed-amount">
                                            R {Number(acc.balance || 0).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="quick-actions-row">
                                        <button
                                            type="button"
                                            className="action-pill"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onOpenTransfer) onOpenTransfer();
                                            }}
                                        >
                                            Transfer
                                        </button>
                                        <button
                                            type="button"
                                            className="action-pill"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Downloading statement for ${acc.name}...`);
                                            }}
                                        >
                                            Statement
                                        </button>
                                    </div>
                                </div>

                                {/* SLIDING FRONT CARD (Masked Balance State) */}
                                <div
                                    className={`account-front${isSlid ? " is-slid" : ""}`}
                                    onClick={() => handleCardClick(acc.id)}
                                >
                                    <div className="front-header">
                                        <div className="front-header-left">
                                            <span className="account-name">{acc.name}</span>
                                            <span className="account-number">{acc.accountNumber}</span>
                                        </div>
                                        <span className="action-pill" style={{ fontSize: "0.65rem" }}>
                                            {acc.type || "Cheque"}
                                        </span>
                                    </div>

                                    <div className="front-footer">
                                        <div>
                                            <div className="revealed-label" style={{ fontSize: "0.65rem" }}>Balance</div>
                                            <div className="masked-balance">••••••••</div>
                                        </div>
                                        <span className="slide-hint">
                                            {isSlid ? "Close ❮" : "Slide to reveal ❯"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">No accounts linked.</div>
                )}
            </div>
        </div>
    );
}