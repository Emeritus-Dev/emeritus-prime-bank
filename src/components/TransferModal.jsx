import React, { useState } from 'react';

export default function TransferModal({
                                          isOpen = false,
                                          onClose,
                                          onTransferSuccess,
                                          accounts = [],
                                      }) {
    const [selectedAccount, setSelectedAccount] = useState(
        accounts && accounts.length > 0 ? accounts[0].id : ''
    );
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recipient || !amount) {
            alert('Please enter both beneficiary name and transfer amount.');
            return;
        }
        if (onTransferSuccess) {
            onTransferSuccess({
                fromAccountId: selectedAccount || (accounts[0] && accounts[0].id),
                recipient,
                amount: Number(amount),
                reference,
            });
        }
        setRecipient('');
        setAmount('');
        setReference('');
        if (onClose) onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Execute Sovereign Transfer</h3>
                    <p className="modal-subtitle">
                        Instant wire dispatch backed by liquid reserve liquidity.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    {accounts && accounts.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Source Vault Account</label>
                            <select
                                className="field-input"
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(e.target.value)}
                            >
                                {accounts.map((acc) => (
                                    <option key={acc.id} value={acc.id}>
                                        {acc.name} — R {Number(acc.balance || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Beneficiary Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Western Cape Escrow"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Amount (ZAR)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Statement Reference</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Bullion Allocation"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-ghost" onClick={onClose}>
                            CANCEL
                        </button>
                        <button type="submit" className="btn-primary">
                            AUTHORIZE DISPATCH
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}