import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import FoxMark from './FoxMark';
import {
    ActionCentreModal,
    ActivityHistoryModal,
    DocumentVaultModal,
    FamilyModal,
    PersonalInfoModal,
    PreferenceModal,
    RegulatoryModal,
    WorkInfoModal,
} from './profile/info';

export default function ProfileScreen({ onBack }) {
    const { customerName, initials, isDuress } = useAuth();
    const [activeModal, setActiveModal] = useState(null);

    const profileSections = [
        {
            id: 'personal',
            title: 'Personal Identification & Contact',
            desc: 'Verified identity, registered email, and mobile contact info.',
            icon: '👤',
            badge: 'Verified',
        },
        {
            id: 'work',
            title: 'Employment & Commercial Entity',
            desc: 'Declared ventures, primary income sources, and salary bands.',
            icon: '💼',
            badge: 'Active',
        },
        {
            id: 'regulatory',
            title: 'FICA & Tax Compliance Status',
            desc: 'SARB compliance, SARS tax identification, and FATCA residency.',
            icon: '🏛️',
            badge: 'Tier 3 Full',
        },
        {
            id: 'documents',
            title: 'Encrypted Document Vault',
            desc: 'AES-256 cloud storage for RSA ID, proof of address, and tax PINs.',
            icon: '🔒',
            badge: '3 Files',
        },
        {
            id: 'family',
            title: 'Family Office Governance',
            desc: 'Dependent allowances, sub-account caps, and chore approvals.',
            icon: '👨‍👩‍👦',
            badge: '2 Members',
        },
        {
            id: 'action',
            title: 'Action Centre & Tasks',
            desc: 'Pending institutional action items and tax deadlines.',
            icon: '⚡',
            badge: '1 Pending',
        },
        {
            id: 'history',
            title: 'Security & Sign-In Audit Trail',
            desc: 'Hardware device logs, biometric scans, and IP coordinates.',
            icon: '🛡️',
            badge: 'Active Log',
        },
        {
            id: 'preferences',
            title: 'App & Locale Preferences',
            desc: 'Display currencies (ZAR/USD/EUR), system language, and notifications.',
            icon: '⚙️',
            badge: 'ZAR / Eng',
        },
    ];

    return (
        <div className="panel" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* PROFILE HEADER */}
            <div
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '16px',
                    padding: '1.8rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.2rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div
                        className="avatar"
                        style={{
                            width: '64px',
                            height: '64px',
                            fontSize: '1.25rem',
                            borderColor: 'var(--gold)',
                        }}
                    >
                        {initials}
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: '0.7rem',
                                color: isDuress ? 'var(--amber)' : 'var(--gold)',
                                letterSpacing: '0.12em',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                            }}
                        >
                            {isDuress ? 'DECOY CITIZEN RECORD' : 'SOVEREIGN PRIMARY CITIZEN'}
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--parchment)', marginTop: '0.15rem' }}>
                            {customerName}
                        </h1>
                        <div style={{ fontSize: '0.75rem', color: 'var(--parchment-dim)', fontFamily: 'var(--mono)', marginTop: '0.2rem' }}>
                            Client ID: EPB-849201 • Cape Town, South Africa
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <FoxMark small={true} state={isDuress ? 'duress' : 'verified'} />
                    {onBack && (
                        <button type="button" className="btn-ghost" onClick={onBack}>
                            ❮ Back to Dashboard
                        </button>
                    )}
                </div>
            </div>

            {/* MODAL LAUNCHER GRID */}
            <div style={{ marginTop: '1.5rem' }}>
                <h3
                    style={{
                        fontSize: '0.95rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}
                >
                    Institutional Records & Preferences
                </h3>

                <div className="card-grid">
                    {profileSections.map((sec) => (
                        <div
                            key={sec.id}
                            className="info-card"
                            onClick={() => setActiveModal(sec.id)}
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderLeft: '3px solid var(--gold)',
                                gap: '0.6rem',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem' }}>{sec.icon}</span>
                                <span
                                    className="action-pill"
                                    style={{
                                        fontSize: '0.65rem',
                                        padding: '0.2rem 0.55rem',
                                        color: 'var(--moss)',
                                        borderColor: 'var(--moss)',
                                    }}
                                >
                  {sec.badge}
                </span>
                            </div>

                            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--parchment)' }}>
                                {sec.title}
                            </div>

                            <div style={{ fontSize: '0.74rem', color: 'var(--parchment-dim)', lineHeight: 1.4 }}>
                                {sec.desc}
                            </div>

                            <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600, marginTop: '0.4rem' }}>
                                Manage Record ❯
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACTIVE MODALS */}
            {activeModal === 'personal' && <PersonalInfoModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'work' && <WorkInfoModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'regulatory' && <RegulatoryModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'documents' && <DocumentVaultModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'family' && <FamilyModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'action' && <ActionCentreModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'history' && <ActivityHistoryModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'preferences' && <PreferenceModal onClose={() => setActiveModal(null)} />}
        </div>
    );
}