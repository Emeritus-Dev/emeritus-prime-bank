import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// --- Settings Modals (profile/settings/) ---
import UsernamePinModal from "./profile/settings/UsernamePinModal.jsx";
import DailyLimitModal from "./profile/settings/DailyLimitModal.jsx";
import PrivacyModeModal from "./profile/settings/PrivacyModeModal.jsx";
import DuressModeModal from "./profile/settings/DuressModeModal.jsx";
import ChannelsDevicesModal from "./profile/settings/ChannelsDevicesModal.jsx";
import DataPermissionsModal from "./profile/settings/DataPermissionsModal.jsx";
import BiometricsModal from "./profile/settings/BiometricsModal.jsx";

// --- Profile Info Modals (profile/info/) ---
import PersonalInfoModal from "./profile/info/PersonalInfoModal.jsx";
import FamilyModal from "./profile/info/FamilyModal.jsx";
import RegulatoryModal from "./profile/info/RegulatoryModal.jsx";
import DocumentVaultModal from "./profile/info/DocumentVaultModal.jsx";
import WorkInfoModal from "./profile/info/WorkInfoModal.jsx";
import ActivityHistoryModal from "./profile/info/ActivityHistoryModal.jsx";
import ActionCentreModal from "./profile/info/ActionCentreModal.jsx";
import PreferenceModal from "./profile/info/PreferenceModal.jsx";

// Shared SVG Icon Component
function Icon({ d, className = "tile-icon" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {d}
        </svg>
    );
}

const TILE_ICONS = {
    username: <Icon d={<><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>} />,
    limit: <Icon d={<><path d="M4 19h16" /><path d="M7 19V11" /><path d="M12 19V5" /><path d="M17 19v-7" /></>} />,
    biometrics: <Icon d={<><path d="M12 3a8 8 0 0 1 8 8c0 3-1 5-2 6.5" /><path d="M12 3a8 8 0 0 0-8 8c0 2 .3 3.6 1 5" /><path d="M9 18c-1.2-1.4-2-3.2-2-5a5 5 0 0 1 10 0c0 1.1-.1 2-.4 3" /><path d="M12 8v5c0 1 .3 1.8.8 2.4" /></>} />,
    mandates: <Icon d={<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h5" /></>} />,
    privacy: <Icon d={<><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" /><circle cx="12" cy="12" r="2.5" /><path d="M3 3l18 18" /></>} />,
    permissions: <Icon d={<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9.5 12l1.8 1.8 3.2-3.6" /></>} />,
    channels: <Icon d={<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>} />,
    duress: <Icon d={<><path d="M12 3l9 16H3z" /><path d="M12 10v3" /><path d="M12 16v.3" /></>} />,
    personal: <Icon d={<><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>} />,
    family2: <Icon d={<><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M2.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M10.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /></>} />,
    regulatory: <Icon d={<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6" /><path d="M9 12h6" /><path d="M9 16h3" /></>} />,
    vault: <Icon d={<><rect x="3" y="5" width="18" height="15" rx="2" /><circle cx="12" cy="12.5" r="3" /><path d="M12 10.5v1" /><path d="M12 13.5v1" /></>} />,
    work: <Icon d={<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} />,
    activity: <Icon d={<><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>} />,
    actioncentre: <Icon d={<><path d="M5 6h14" /><path d="M5 12h14" /><path d="M5 18h8" /><path d="M5 6l0 0" /></>} />,
    preferences: <Icon d={<><circle cx="12" cy="12" r="3" /><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.2-2-3.4-2.3.7a7.6 7.6 0 0 0-1.7-1l-.3-2.4H10.9l-.3 2.4a7.6 7.6 0 0 0-1.7 1l-2.3-.7-2 3.4 2 1.2a7.6 7.6 0 0 0 0 2l-2 1.2 2 3.4 2.3-.7a7.6 7.6 0 0 0 1.7 1l.3 2.4h2.2l.3-2.4a7.6 7.6 0 0 0 1.7-1l2.3.7 2-3.4z" /></>} />,
};

const SETTINGS_TILES = [
    { id: "username", label: "Username & PIN", icon: "username", description: "Manage login username & 4-digit PIN." },
    { id: "limit", label: "Daily limit", icon: "limit", description: "Adjust transfer limits with step-up verification." },
    { id: "biometrics", label: "Biometrics", icon: "biometrics", description: "Device face & touch access controls." },
    { id: "mandates", label: "Mandate manager", icon: "mandates", description: "Track active debit orders & disputes." },
    { id: "privacy", label: "Privacy mode", icon: "privacy", description: "Shoulder-surfer balance blurring." },
    { id: "permissions", label: "Data permissions", icon: "permissions", description: "Open-banking access revocation." },
    { id: "channels", label: "Channels & devices", icon: "channels", description: "Active login session management." },
    { id: "duress", label: "Duress mode", icon: "duress", description: "Emergency decoy PIN configuration." },
];

const PROFILE_TILES = [
    { id: "personal", label: "Personal info", icon: "personal", description: "Contact details & address records." },
    { id: "family", label: "My family", icon: "family2", description: "Family sub-accounts & view limits." },
    { id: "regulatory", label: "Regulatory details", icon: "regulatory", description: "FICA compliance & tax status." },
    { id: "vault", label: "Document vault", icon: "vault", description: "Encrypted ID & proof of residence storage." },
    { id: "work", label: "Work info", icon: "work", description: "Employer details & income records." },
    { id: "activity", label: "Activity history", icon: "activity", description: "Audit trail of sign-ins & IP logs." },
    { id: "actioncentre", label: "Action centre", icon: "actioncentre", description: "Pending tasks & document renewals." },
    { id: "preferences", label: "Preferences", icon: "preferences", description: "Language, alerts & notification channels." },
];

export default function ProfileScreen({ onBack }) {
    const { customerName, initials } = useAuth();
    const [activeModal, setActiveModal] = useState(null);

    // Global settings states
    const [dailyLimit, setDailyLimit] = useState(15000);
    const [username, setUsername] = useState("tshegofatso_h");
    const [privacySettings, setPrivacySettings] = useState({ blurBalances: false, hideInvestments: false });

    const handleTogglePrivacy = (key) => {
        setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCloseModal = () => setActiveModal(null);

    return (
        <main className="dashboard">
            <div className="panel">
                {/* Top Header */}
                <div className="profile-header">
                    <button className="back-btn" onClick={onBack} aria-label="Back to dashboard">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <div className="avatar">{initials}</div>
                    <div className="welcome-line" style={{ fontSize: "1.2rem" }}>{customerName}</div>
                </div>

                {/* Settings Grid */}
                <section>
                    <h2 className="profile-section-title">Settings</h2>
                    <div className="tile-grid">
                        {SETTINGS_TILES.map((tile) => (
                            <FlipTile tile={tile} key={tile.id} onClickModal={() => setActiveModal(tile.id)} />
                        ))}
                    </div>
                </section>

                {/* Profile Grid */}
                <section>
                    <h2 className="profile-section-title">My Profile</h2>
                    <div className="tile-grid">
                        {PROFILE_TILES.map((tile) => (
                            <FlipTile tile={tile} key={tile.id} onClickModal={() => setActiveModal(tile.id)} />
                        ))}
                    </div>
                </section>
            </div>

            {/* ================= SETTINGS MODALS ================= */}
            {activeModal === "username" && (
                <UsernamePinModal
                    currentUsername={username}
                    onClose={handleCloseModal}
                    onSave={({ username: newU }) => setUsername(newU)}
                />
            )}

            {activeModal === "limit" && (
                <DailyLimitModal
                    currentLimit={dailyLimit}
                    onClose={handleCloseModal}
                    onUpdateLimit={(limit) => setDailyLimit(limit)}
                />
            )}

            {activeModal === "biometrics" && (
                <BiometricsModal onClose={handleCloseModal} />
            )}

            {activeModal === "mandates" && (
                <DataPermissionsModal onClose={handleCloseModal} />
            )}

            {activeModal === "privacy" && (
                <PrivacyModeModal
                    privacySettings={privacySettings}
                    onClose={handleCloseModal}
                    onToggleSetting={handleTogglePrivacy}
                />
            )}

            {activeModal === "permissions" && (
                <DataPermissionsModal onClose={handleCloseModal} />
            )}

            {activeModal === "channels" && (
                <ChannelsDevicesModal onClose={handleCloseModal} />
            )}

            {activeModal === "duress" && (
                <DuressModeModal onClose={handleCloseModal} />
            )}

            {/* ================= PROFILE INFO MODALS ================= */}
            {activeModal === "personal" && (
                <PersonalInfoModal onClose={handleCloseModal} />
            )}

            {activeModal === "family" && (
                <FamilyModal onClose={handleCloseModal} />
            )}

            {activeModal === "regulatory" && (
                <RegulatoryModal onClose={handleCloseModal} />
            )}

            {activeModal === "vault" && (
                <DocumentVaultModal onClose={handleCloseModal} />
            )}

            {activeModal === "work" && (
                <WorkInfoModal onClose={handleCloseModal} />
            )}

            {activeModal === "activity" && (
                <ActivityHistoryModal onClose={handleCloseModal} />
            )}

            {activeModal === "actioncentre" && (
                <ActionCentreModal onClose={handleCloseModal} />
            )}

            {activeModal === "preferences" && (
                <PreferenceModal onClose={handleCloseModal} />
            )}
        </main>
    );
}

// Reusable 3D FlipTile Component
function FlipTile({ tile, onClickModal }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className={`tile${isFlipped ? " is-flipped" : ""}`}>
            <div
                className="tile-inner"
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
            >
                <div className="tile-face tile-front">
                    {TILE_ICONS[tile.icon]}
                    <span className="tile-front-label">{tile.label}</span>
                </div>
                <div
                    className="tile-face tile-back"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClickModal();
                    }}
                >
                    <span className="tile-back-title">{tile.label}</span>
                    <span style={{ fontSize: "0.68rem" }}>{tile.description}</span>
                    <button
                        type="button"
                        className="action-pill"
                        style={{ marginTop: "4px", fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}
                    >
                        Manage ❯
                    </button>
                </div>
            </div>
        </div>
    );
}