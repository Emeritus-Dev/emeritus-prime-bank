import React, { useState } from 'react';
import './CreditCard.css';

export default function CreditCard({
                                       accountName = 'Sovereign Black Card',
                                       accountNumber = '4209 5467 8900 0210',
                                       holderName = 'TSHEGOFATSO HLABELA',
                                       expiry = '08/28',
                                       cvv = '963',
                                       isFrozen = false,
                                       showFullNumber = false,
                                   }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const displayPan = showFullNumber
        ? accountNumber
        : `•••• •••• •••• ${accountNumber.slice(-4)}`;

    return (
        <div className="card-3d-wrapper" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`card-3d-inner${isFlipped ? ' is-flipped' : ''}`}>
                {/* FRONT FACE */}
                <div className="card-face">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                                EMERITUS PRIME
                            </div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--parchment)' }}>
                                {accountName}
                            </div>
                        </div>
                        <span
                            style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--mono)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                border: `1px solid ${isFrozen ? 'var(--rust)' : 'var(--moss)'}`,
                                color: isFrozen ? 'var(--rust)' : 'var(--moss)',
                            }}
                        >
              {isFrozen ? 'FROZEN' : 'ACTIVE'}
            </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '0.6rem 0' }}>
                        <div className="card-chip" />
                        <span style={{ fontSize: '1rem', color: 'var(--parchment-dim)' }}>📡</span>
                    </div>

                    <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', letterSpacing: '0.15em', color: 'var(--parchment)' }}>
                            {displayPan}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.6rem' }}>
                            <div>
                                <div style={{ fontSize: '0.55rem', color: 'var(--parchment-dim)', textTransform: 'uppercase' }}>Cardholder</div>
                                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--parchment)', fontWeight: 600 }}>
                                    {holderName}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.55rem', color: 'var(--parchment-dim)', textTransform: 'uppercase' }}>Expires</div>
                                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--parchment)' }}>
                                    {expiry}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div className="card-face card-face-back">
                    <div className="mag-stripe" />
                    <div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--parchment-dim)', padding: '0 1.4rem' }}>
                            Authorized Sovereign Signature
                        </div>
                        <div className="cvv-strip">
                            CVV {cvv}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--parchment-dim)', padding: '0 1.4rem', textAlign: 'center' }}>
                        Issued by Emeritus Prime Bank Limited. Sovereign Vault Custody.
                    </div>
                </div>
            </div>
        </div>
    );
}