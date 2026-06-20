import React, { useState } from "react";

export default function AccountCard({ account, onOpenTransfer }) {
    const [isSlid, setIsSlid] = useState(false);

    const handleAction = (event, action) => {
        event.stopPropagation(); // Prevents the card from sliding closed when you click a button

        if (action === "transfer" && onOpenTransfer) {
            onOpenTransfer();
        } else {

            alert(`Simulated Action: Opening ${action} settings for ${account.name}`);
        }
    };

    const isDebt = account.balance < 0;
    const displayBalance = Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 });

    return (
        <div className={`account-slider-container ${account.frozen ? "is-frozen" : ""}`}>

            {/* BACKGROUND LAYER: The Revealed Actions & Balance */}
            <div className="account-actions-bg">
                <div className="revealed-balance-area">
                    <div className="revealed-label">
                        {isDebt ? "Outstanding Balance" : "Available Balance"}
                    </div>
                    <div className={`revealed-amount ${isDebt ? "is-debt" : ""}`}>
                        {isDebt ? "-" : ""}${displayBalance}
                    </div>
                </div>

                <div className="quick-actions-row">
                    {isDebt ? (
                        <button className="action-pill" onClick={(e) => handleAction(e, "pay")}>Pay</button>
                    ) : (
                        <button className="action-pill" onClick={(e) => handleAction(e, "transfer")}>Move</button>
                    )}
                    <button className="action-pill" onClick={(e) => handleAction(e, "limit")}>Limit</button>
                    <button className="action-pill" onClick={(e) => handleAction(e, "statements")}>Docs</button>
                </div>
            </div>

            {/* FOREGROUND LAYER: The Slidable Card */}
            <div
                className={`account-front ${isSlid ? "is-slid" : ""}`}
                onClick={() => setIsSlid(!isSlid)}
            >
                <div className="front-header">
                    <div className="account-name">
                        {account.name} {account.frozen ? "· Frozen" : ""}
                    </div>
                    <div className="account-number">{account.number}</div>
                </div>
                <div className="front-footer">
                    <div className="masked-balance">•••• ••••</div>
                    <div className="slide-hint">
                        {isSlid ? "❮ Close" : "Tap to manage ❯"}
                    </div>
                </div>
            </div>

        </div>
    );
}