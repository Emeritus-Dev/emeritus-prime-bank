import React, { useState } from "react";

// The new graphical Sparkline component
function Sparkline({ points, width = 200, height = 38, positive = true }) {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const step = width / (points.length - 1);
    const coords = points.map((p, i) => {
        const x = i * step;
        const y = height - ((p - min) / range) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return (
        <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <polyline
                points={coords.join(" ")}
                fill="none"
                stroke={positive ? "var(--moss)" : "var(--rust)"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sparkline-line"
            />
        </svg>
    );
}

export default function AccountCard({ account, onOpenTransfer }) {
    const [isSlid, setIsSlid] = useState(false);

    const handleAction = (event, action) => {
        event.stopPropagation();
        if (action === "transfer" && onOpenTransfer) {
            onOpenTransfer();
        } else {
            alert(`Simulated Action: Opening ${action} settings for ${account.name}`);
        }
    };

    const isDebt = account.balance < 0;
    const displayBalance = Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 });

    // Calculate trend direction for the sparkline color
    const history = account.history || [];
    const trendPositive = history.length < 2 || history[history.length - 1] >= history[0];

    return (
        <div className={`account-slider-container ${account.frozen ? "is-frozen" : ""}`}>

            {/* BACKGROUND LAYER: Actions & Balance */}
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
                    <div className="front-header-left">
                        <div className="account-name">{account.name} {account.frozen ? "· Frozen" : ""}</div>
                        <div className="account-number">{account.number}</div>
                    </div>
                </div>

                <Sparkline points={history} positive={trendPositive} />

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