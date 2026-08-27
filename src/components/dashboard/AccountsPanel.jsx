import React, { useState } from 'react';
import AccountCard from '../AccountCard.jsx';

export function AccountsPanel({ accounts = [], onOpenTransfer, onToggleFreeze }) {
    const [isMasked, setIsMasked] = useState(true);

    return (
        <div className="panel">
            {/* SECTION HEADER & MASK TOGGLE */}
            <div className="section-head">
                <div>
                    <h2 className="section-title">Accounts & Liquidity</h2>
                    <p className="section-sub">
                        Overview of active liquid balances, sliding authorization trays, and real-time limit controls.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <button
                        type="button"
                        className="action-pill"
                        onClick={() => setIsMasked(!isMasked)}
                        style={{ fontSize: '0.75rem' }}
                    >
                        {isMasked ? '👁 Reveal Balances' : '🔒 Mask Balances'}
                    </button>

                    {onOpenTransfer && (
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={onOpenTransfer}
                            style={{ fontSize: '0.75rem', padding: '0.45rem 0.9rem' }}
                        >
                            + Transfer Funds
                        </button>
                    )}
                </div>
            </div>

            {/* 3D TILE SLIDERS GRID */}
            <div className="accounts-row">
                {accounts.length > 0 ? (
                    accounts.map((acc) => (
                        <AccountCard
                            key={acc.id || acc.accountNumber}
                            account={acc}
                            isMasked={isMasked}
                            onTransfer={onOpenTransfer}
                            onToggleFreeze={onToggleFreeze}
                        />
                    ))
                ) : (
                    <div className="empty-state">No accounts linked to this profile.</div>
                )}
            </div>
        </div>
    );
}