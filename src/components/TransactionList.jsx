import React from 'react';

export default function TransactionList({
                                            transactions = [],
                                            onSelectTransaction,
                                            disputedMap = {},
                                        }) {
    if (!transactions.length) {
        return <div className="empty-state">No transaction records match this query.</div>;
    }

    return (
        <div className="transactions-list">
            {transactions.map((tx) => {
                const isDisputed = !!disputedMap[tx.id];

                return (
                    <div
                        key={tx.id || tx.reference}
                        className="transaction-row"
                        onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div
                                className="avatar"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    fontSize: '0.8rem',
                                    borderColor: isDisputed ? 'var(--rust)' : 'var(--hairline-gold)',
                                }}
                            >
                                {isDisputed ? '⚠️' : tx.isPositive ? '↙' : '↗'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--parchment)' }}>
                                    {tx.merchant || tx.title || tx.name}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--parchment-dim)', marginTop: '0.15rem' }}>
                                    {tx.date} · {tx.category || tx.tag || 'Sovereign Ledger'}
                                    {isDisputed && <span style={{ color: 'var(--rust)', marginLeft: '0.4rem' }}>[DISPUTED]</span>}
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div
                                style={{
                                    fontFamily: 'var(--mono)',
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: tx.isPositive ? 'var(--moss)' : 'var(--parchment)',
                                }}
                            >
                                {tx.isPositive ? '+' : ''}R {Math.abs(tx.amount || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--gold)', marginTop: '0.15rem' }}>
                                View Receipt ❯
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}