import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// Reusable local icon component for the tiles
function Icon({ d, className = "tile-icon" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {d}
        </svg>
    );
}

const TILE_ICONS = {
    username: <Icon d={<><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>} />,
    pin: <Icon d={<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>} />,
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
    { id: "username", label: "Username & PIN", icon: "username", description: "Update your login name and change your PIN." },
    { id: "limit", label: "Daily limit", icon: "limit", description: "Set how much can move out of your accounts per day." },
    { id: "biometrics", label: "Biometrics", icon: "biometrics", description: "Manage face or fingerprint sign-in for this device." },
    { id: "mandates", label: "Mandate manager", icon: "mandates", description: "See every debit order mandate and dispute one in a tap." },
    { id: "privacy", label: "Privacy mode", icon: "privacy", description: "Hide specific accounts or blur all balances on screen." },
    { id: "permissions", label: "Data permissions", icon: "permissions", description: "Every third party with access to your data, and a revoke button." },
    { id: "channels", label: "Channels & devices", icon: "channels", description: "Registered devices, cellphone banking, and OTP delivery." },
    { id: "duress", label: "Duress mode", icon: "duress", description: "A second PIN that opens a decoy view and quietly alerts the bank." },
];

const PROFILE_TILES = [
    { id: "personal", label: "Personal info", icon: "personal", description: "Your contact details, address, and ID information." },
    { id: "family", label: "My family", icon: "family2", description: "Manage who has sub-accounts, limits, or viewer access." },
    { id: "regulatory", label: "Regulatory details", icon: "regulatory", description: "FICA and compliance status, in plain language." },
    { id: "vault", label: "Document vault", icon: "vault", description: "ID, proof of address, and other documents, stored securely." },
    { id: "work", label: "Work info", icon: "work", description: "Employer and income details on file." },
    { id: "activity", label: "Activity history", icon: "activity", description: "Logins, devices, and account changes over time." },
    { id: "actioncentre", label: "Action centre", icon: "actioncentre", description: "Things worth doing: expiring docs, missing beneficiaries, and more." },
    { id: "preferences", label: "Preferences", icon: "preferences", description: "Language, notifications, and accessibility settings." },
];

function FlipTile({ tile }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="tile">
            <div
                className={`tile-inner${isFlipped ? " is-flipped" : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={tile.label}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsFlipped(!isFlipped);
                    }
                }}
            >
                <div className="tile-face tile-front">
                    {TILE_ICONS[tile.icon]}
                    <span className="tile-front-label">{tile.label}</span>
                </div>
                <div className="tile-face tile-back">
                    <span className="tile-back-title">{tile.label}</span>
                    <span>{tile.description}</span>
                </div>
            </div>
        </div>
    );
}

function TileSection({ title, tiles }) {
    return (
        <section>
            <h2 className="profile-section-title">{title}</h2>
            <div className="tile-grid">
                {tiles.map((tile) => <FlipTile tile={tile} key={tile.id} />)}
            </div>
        </section>
    );
}

export default function ProfileScreen({ onBack }) {
    const { customerName, initials } = useAuth();

    return (
        <main className="dashboard">
            <div className="panel">
                <div className="profile-header">
                    <button className="back-btn" onClick={onBack} aria-label="Back to dashboard">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <div className="avatar">{initials}</div>
                    <div className="welcome-line" style={{ fontSize: "1.2rem" }}>{customerName}</div>
                </div>

                <TileSection title="Settings" tiles={SETTINGS_TILES} />
                <TileSection title="My profile" tiles={PROFILE_TILES} />
            </div>
        </main>
    );
}