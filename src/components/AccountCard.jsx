import React, { useState } from 'react';

export default function AccountCard({
                                        account,
                                        isMasked = false,
                                        onTransfer,
                                        onToggleFreeze,
                                        onUpdateLimit,
                                    }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentLimit, setCurrentLimit] = useState(account.limit || 50000);
    const [isSlid, setIsSlid] = useState(false);

    const isFrozen = account.isFrozen || account.frozen || false;
    const balanceVal = Number(account.balance || 0);

    const handleLimitChange = (e) => {
        const val = Number(e.target.value);
        setCurrentLimit(val);
        if (onUpdateLimit) onUpdateLimit(account.id, val);
    };

    return (
        <div
            style={{
                perspective: '1200px',
                width: '100%',
                minHeight: '220px',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: '220px',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* =========================================================================
            FRONT FACE: MASKED TILE SLIDER & BALANCE CARD
            ========================================================================= */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        borderRadius: '16px',
                        border: `1px solid ${isFrozen ? 'var(--rust)' : 'var(--hairline-gold)'}`,
                        background: 'var(--surface)',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        opacity: isFrozen ? 0.65 : 1,
                    }}
                >
                    {/* UNDERNEATH REVEAL LAYER (Exposed when front slides) */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, #182030 0%, #121821 100%)',
                            padding: '1.4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Unmasked Sovereign Liquidity
                            </div>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--parchment)', marginTop: '0.2rem' }}>
                                R {balanceVal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => onTransfer && onTransfer(account)}
                                style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
                            >
                                Transfer
                            </button>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => setIsFlipped(true)}
                                style={{ fontSize: '0.72rem' }}
                            >
                                ⚙ Adjust Limit
                            </button>
                            <button
                                type="button"
                                className="action-pill"
                                onClick={() => onToggleFreeze && onToggleFreeze(account.id)}
                                style={{
                                    fontSize: '0.72rem',
                                    borderColor: isFrozen ? 'var(--moss)' : 'var(--rust)',
                                    color: isFrozen ? 'var(--moss)' : 'var(--rust)',
                                }}
                            >
                                {isFrozen ? 'Unfreeze' : 'Freeze'}
                            </button>
                        </div>
                    </div>

                    {/* SLIDING FRONT PANEL */}
                    <div
                        onClick={() => setIsSlid(!isSlid)}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, #161e2b 0%, #0d1219 100%)',
                            padding: '1.4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transform: isSlid ? 'translateX(-70%)' : 'translateX(0)',
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            borderRadius: '16px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--parchment)', display: 'block' }}>
                  {account.name}
                </span>
                                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--parchment-dim)' }}>
                  {account.accountNumber}
                </span>
                            </div>
                            <span
                                className="action-pill"
                                style={{
                                    fontSize: '0.65rem',
                                    borderColor: isFrozen ? 'var(--rust)' : 'var(--hairline-gold)',
                                    color: isFrozen ? 'var(--rust)' : 'var(--gold)',
                                }}
                            >
                {isFrozen ? 'FROZEN' : account.type || 'Sovereign Vault'}
              </span>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--parchment-dim)', textTransform: 'uppercase' }}>
                                Account Balance
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--mono)',
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    letterSpacing: isMasked && !isSlid ? '0.18em' : 'normal',
                                    color: 'var(--parchment)',
                                    marginTop: '0.15rem',
                                }}
                            >
                                {isMasked && !isSlid
                                    ? '••••••••'
                                    : `R ${balanceVal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid var(--hairline)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--parchment-dim)' }}>
                Active Limit: <strong style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>R {currentLimit.toLocaleString()}</strong>
              </span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600 }}>
                {isSlid ? '❮ Close' : 'Slide to Reveal ❯'}
              </span>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
            BACK FACE: LIMIT ADJUSTMENT & CONTROLS
            ========================================================================= */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderRadius: '16px',
                        border: '1px solid var(--gold)',
                        background: 'var(--surface-raised)',
                        padding: '1.4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Sovereign Limit Controller
              </span>
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={() => setIsFlipped(false)}
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                            >
                                ✕ Close
                            </button>
                        </div>

                        <div style={{ marginTop: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                                <span style={{ color: 'var(--parchment-dim)' }}>Daily Dispatch Limit:</span>
                                <span style={{ fontFamily: 'var(--mono)', color: 'var(--gold)', fontWeight: 700 }}>
                  R {currentLimit.toLocaleString()}
                </span>
                            </div>
                            <input
                                type="range"
                                min="5000"
                                max="250000"
                                step="5000"
                                value={currentLimit}
                                onChange={handleLimitChange}
                                style={{
                                    width: '100%',
                                    accentColor: 'var(--gold)',
                                    cursor: 'pointer',
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--parchment-dim)', marginTop: '0.2rem' }}>
                                <span>R 5k</span>
                                <span>R 125k</span>
                                <span>R 250k Max</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => {
                                setIsFlipped(false);
                                alert(`Limit updated to R ${currentLimit.toLocaleString()} for ${account.name}.`);
                            }}
                            style={{ flex: 1, fontSize: '0.72rem', padding: '0.4rem 0.6rem' }}
                        >
                            Save Limit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}