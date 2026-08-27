import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FoxMark from './FoxMark';

// Luxury 3D Icon Assets
import iconLounge from '../assets/icons/icon-lounge.png';
import iconEscrow from '../assets/icons/icon-escrow.png';
import iconAviation from '../assets/icons/icon-aviation.png';
import iconBullion from '../assets/icons/icon-bullion.png';
import iconSarb from '../assets/icons/icon-sarb.png';
import iconTax from '../assets/icons/icon-tax.png';

export default function LoginScreen() {
    const { login } = useAuth();
    const [pin, setPin] = useState('');
    const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
    const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'verified' | 'failed'
    const [errorMsg, setErrorMsg] = useState('');
    const [activeServiceModal, setActiveServiceModal] = useState(null);

    const quickServices = [
        {
            id: 'lounge',
            label: 'Lounge & Escort',
            icon: iconLounge,
            title: 'VIP Terminal & Escort Pass',
            details: 'Instant access pass for OR Tambo (JNB) Fireblade terminal and Cape Town (CPT) Signature VIP suites. Includes biometric diplomatic fast-track lane clearance.',
            badge: 'Active Priority',
        },
        {
            id: 'escrow',
            label: 'Sovereign Escrow',
            icon: iconEscrow,
            title: 'Institutional Escrow Vault',
            details: 'Dual-key cryptographic holding vault for high-value acquisitions, bullion settlements, and real estate disbursements.',
            badge: 'SARB Regulated',
        },
        {
            id: 'aviation',
            label: 'Private Aviation',
            icon: iconAviation,
            title: 'Executive Air Concierge',
            details: 'Direct dispatch line to Fireblade Aviation & ExecuJet flight handlers. Helipad tarmac bookings and private charter clearance.',
            badge: '24/7 Dispatch',
        },
        {
            id: 'bullion',
            label: 'Bullion Custody',
            icon: iconBullion,
            title: 'Allocated Bullion Reserves',
            details: 'Direct access to physical 99.99% gold bars vaulted at Rand Refinery. Real-time physical allocation and audit custody certs.',
            badge: 'Spot R1,482,900/kg',
        },
        {
            id: 'sarb',
            label: 'SARB Real-Time',
            icon: iconSarb,
            title: 'SAMOS Direct Settlement',
            details: 'Gross real-time settlement channel connected directly to the South African Reserve Bank. Instantaneous high-value wire execution.',
            badge: 'T+0 Nominal',
        },
        {
            id: 'tax',
            label: 'SARS Tax Vault',
            icon: iconTax,
            title: 'SARS Tax Shield & Compliance',
            details: 'Automated ring-fenced reserve for provisional corporate and high-net-worth tax liabilities. Real-time SARS Compliance PIN verification.',
            badge: 'Tier 3 Compliant',
        },
    ];

    const handleDigit = (digit) => {
        if (pin.length < 4) {
            const nextPin = pin + digit;
            setPin(nextPin);
            setErrorMsg('');

            if (nextPin.length === 4) {
                setScanState('scanning');
                setTimeout(() => {
                    if (nextPin === '1234' || nextPin === '9999') {
                        setScanState('verified');
                        setTimeout(() => {
                            login(nextPin);
                        }, 450);
                    } else {
                        setScanState('failed');
                        setErrorMsg('INVALID SOVEREIGN PIN');
                        setPin('');
                        setTimeout(() => setScanState('idle'), 1200);
                    }
                }, 600);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setErrorMsg('');
    };

    const handleTriggerBiometrics = () => {
        setScanState('scanning');
        setErrorMsg('');

        setTimeout(() => {
            setScanState('verified');
            setTimeout(() => {
                login('1234');
            }, 700);
        }, 1600);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'radial-gradient(circle at 50% 15%, #1b2434 0%, #0b0f14 85%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                padding: '1.2rem 1.2rem 2.2rem 1.2rem',
            }}
        >
            {/* TOP INSTITUTIONAL BAR */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.5rem 1rem 0.5rem',
                }}
            >
                <button
                    type="button"
                    onClick={() => alert('Emeritus Prime Concierge: +27 21 000 8899 | concierge@emeritus-prime.com')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--parchment-dim)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                    }}
                >
                    Concierge Support
                </button>

                <span
                    style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.72rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
          ZA • CAPE TOWN
        </span>
            </div>

            {/* CENTRAL SOVEREIGN CLIENT CARD */}
            <div
                style={{
                    background: 'rgba(18, 24, 33, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--hairline-gold)',
                    borderRadius: '28px',
                    padding: '2.5rem 1.5rem 2rem 1.5rem',
                    position: 'relative',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
                    maxWidth: '430px',
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                {/* FLOATING SOVEREIGN MEDALLION */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-42px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <FoxMark small={false} state={scanState} />
                </div>

                {/* CLIENT GREETING */}
                <div style={{ textAlign: 'center', marginTop: '1.8rem', marginBottom: '2rem' }}>
                    <div
                        style={{
                            fontSize: '0.68rem',
                            color: 'var(--gold)',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                        }}
                    >
                        Sovereign Private Client
                    </div>
                    <h2
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.65rem',
                            fontWeight: 600,
                            color: 'var(--parchment)',
                            marginTop: '0.2rem',
                        }}
                    >
                        Tshegofatso
                    </h2>
                    <div style={{ fontSize: '0.72rem', color: 'var(--parchment-dim)', fontFamily: 'var(--mono)', marginTop: '0.15rem' }}>
                        Vault ID: EPB-849201 · Sovereign Tier
                    </div>
                </div>

                {/* 3x2 SQUIRCLE ICON TILES */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.2rem 0.8rem',
                        textAlign: 'center',
                    }}
                >
                    {quickServices.map((srv) => (
                        <button
                            key={srv.id}
                            type="button"
                            onClick={() => setActiveServiceModal(srv)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.55rem',
                                cursor: 'pointer',
                                padding: '0.2rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '14px',
                                    background: '#0e141c',
                                    border: '1px solid var(--hairline-gold)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.55)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
                                    e.currentTarget.style.borderColor = 'var(--gold)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px var(--gold-glow)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.borderColor = 'var(--hairline-gold)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.55)';
                                }}
                            >
                                <img
                                    src={srv.icon}
                                    alt={srv.label}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            </div>

                            <span
                                style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 600,
                                    color: 'var(--parchment)',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.01em',
                                }}
                            >
                {srv.label}
              </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* BOTTOM SOVEREIGN AUTH LAUNCHER */}
            <div style={{ maxWidth: '430px', width: '100%', margin: '1.5rem auto 0 auto', textAlign: 'center' }}>
                <button
                    type="button"
                    className="btn-sovereign-vault"
                    onClick={() => setAuthDrawerOpen(true)}
                >
                    <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0b0f14"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>ENTER SOVEREIGN VAULT</span>
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--parchment-dim)' }}>
            emeritusprime.co.za
          </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--parchment-dim)' }}>
            FICA & SARB Sovereign Protocols
          </span>
                </div>
            </div>

            {/* PRE-AUTH SERVICE MODAL */}
            {activeServiceModal && (
                <div className="modal-backdrop" onClick={() => setActiveServiceModal(null)}>
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '420px', textAlign: 'left' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--gold)',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={activeServiceModal.icon}
                                    alt={activeServiceModal.label}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                <span
                    className="action-pill"
                    style={{ fontSize: '0.65rem', color: 'var(--moss)', borderColor: 'var(--moss)', padding: '0.15rem 0.5rem' }}
                >
                  {activeServiceModal.badge}
                </span>
                                <h3 style={{ fontSize: '1.15rem', color: 'var(--parchment)', marginTop: '0.2rem' }}>
                                    {activeServiceModal.title}
                                </h3>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: 'var(--parchment-dim)', lineHeight: 1.5 }}>
                            {activeServiceModal.details}
                        </p>

                        <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={() => setActiveServiceModal(null)}
                            >
                                CLOSE
                            </button>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => {
                                    setActiveServiceModal(null);
                                    setAuthDrawerOpen(true);
                                }}
                            >
                                UNLOCK & DISPATCH
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SLIDE-UP PIN & BIOMETRIC DRAWER */}
            {authDrawerOpen && (
                <div
                    className="modal-backdrop"
                    onClick={() => setAuthDrawerOpen(false)}
                    style={{ alignItems: 'flex-end', padding: 0 }}
                >
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '430px',
                            width: '100%',
                            borderRadius: '28px 28px 0 0',
                            borderBottom: 'none',
                            padding: '2rem 1.8rem 2.5rem 1.8rem',
                            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                            <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Hardware Security Enclave
                </span>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--parchment)', margin: '0.1rem 0 0 0' }}>
                                    Sovereign PIN / FaceID
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={() => setAuthDrawerOpen(false)}
                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* PIN INDICATORS */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.9rem',
                                margin: '1.4rem 0',
                            }}
                        >
                            {[0, 1, 2, 3].map((index) => {
                                const isFilled = pin.length > index;
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            border: '1.5px solid var(--gold)',
                                            backgroundColor: isFilled ? 'var(--gold)' : 'transparent',
                                            boxShadow: isFilled ? '0 0 10px var(--gold-glow)' : 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {errorMsg && (
                            <div
                                style={{
                                    color: 'var(--rust)',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    fontFamily: 'var(--mono)',
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                }}
                            >
                                {errorMsg}
                            </div>
                        )}

                        {/* ROUND NUMERIC KEYPAD */}
                        <div className="pin-keypad-grid">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                                <button
                                    key={digit}
                                    type="button"
                                    className="pin-key-round"
                                    onClick={() => handleDigit(digit)}
                                    disabled={scanState === 'scanning'}
                                >
                                    {digit}
                                </button>
                            ))}

                            {/* EMPTY PLACEHOLDER TO KEEP '0' CENTERED */}
                            <div style={{ width: '68px', height: '68px' }} />

                            {/* ZERO */}
                            <button
                                type="button"
                                className="pin-key-round"
                                onClick={() => handleDigit('0')}
                                disabled={scanState === 'scanning'}
                            >
                                0
                            </button>

                            {/* BACKSPACE */}
                            <button
                                type="button"
                                className="pin-key-round"
                                onClick={handleDelete}
                                disabled={scanState === 'scanning'}
                                style={{ fontSize: '1.2rem' }}
                            >
                                ⌫
                            </button>
                        </div>

                        {/* 24K GOLD INSTANT FACEID BAR */}
                        <div style={{ marginTop: '1.4rem', textAlign: 'center' }}>
                            <button
                                type="button"
                                className="btn-sovereign-vault-sm"
                                onClick={handleTriggerBiometrics}
                                disabled={scanState === 'scanning'}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0b0f14"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span>Instant FaceID Verification</span>
                            </button>
                        </div>

                        <div style={{ marginTop: '1.2rem', fontSize: '0.65rem', color: 'var(--parchment-dim)', textAlign: 'center' }}>
                            PIN: <strong style={{ color: 'var(--gold)' }}>1234</strong> (Sovereign) ·{' '}
                            <strong style={{ color: 'var(--rust)' }}>9999</strong> (Duress Decoy)
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}