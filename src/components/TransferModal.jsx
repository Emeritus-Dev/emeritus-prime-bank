import React, { useState } from "react";

export default function TransferModal({ accounts, onClose, onSubmit }) {
    // Default to the first and second accounts if they exist
    const [fromId, setFromId] = useState(accounts[0]?.id || "");
    const [toId, setToId] = useState(accounts[1]?.id || accounts[0]?.id || "");
    const [amountText, setAmountText] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fromId === toId) {
            setError("Please select two different accounts.");
            return;
        }

        const amount = Number(amountText);
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        const fromAccount = accounts.find((acc) => acc.id === fromId);
        if (!fromAccount || amount > fromAccount.balance) {
            setError("Insufficient funds for this transfer.");
            return;
        }

        setError("");
        onSubmit({ fromId, toId, amount });
        setSuccess(true);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <form
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <div className="modal-title">Transfer Funds</div>

                {success ? (
                    <div className="modal-success">
                        Transfer successful. You can close this window.
                    </div>
                ) : (
                    <>
                        <label className="field-label" htmlFor="from-account">From</label>
                        <select
                            id="from-account"
                            className="field-input"
                            value={fromId}
                            onChange={(e) => setFromId(e.target.value)}
                        >
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.name} ({acc.number})
                                </option>
                            ))}
                        </select>

                        <label className="field-label" htmlFor="to-account">To</label>
                        <select
                            id="to-account"
                            className="field-input"
                            value={toId}
                            onChange={(e) => setToId(e.target.value)}
                        >
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.name} ({acc.number})
                                </option>
                            ))}
                        </select>

                        <label className="field-label" htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            className="field-input"
                            type="number"
                            min="0"
                            step="0.01"
                            value={amountText}
                            onChange={(e) => setAmountText(e.target.value)}
                            placeholder="0.00"
                        />

                        {error && <div className="login-error">{error}</div>}
                    </>
                )}

                <div className="modal-actions">
                    <button type="button" className="btn-ghost" onClick={onClose}>
                        {success ? "Close" : "Cancel"}
                    </button>
                    {!success && (
                        <button type="submit" className="btn-primary">
                            Transfer
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}