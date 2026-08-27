import React from 'react';
import logoImg from '../assets/logo.png';

export default function FoxMark({ small = false, state = 'idle', className = '' }) {
    const size = small ? 42 : 72;
    const isScanning = state === 'scanning';
    const isVerified = state === 'verified';
    const isDuress = state === 'duress';

    // State-based halo colors
    const glowColor = isVerified
        ? 'rgba(111, 143, 92, 0.6)'
        : isDuress
            ? 'rgba(181, 72, 45, 0.6)'
            : 'rgba(201, 162, 39, 0.45)';

    const ringBorderColor = isVerified
        ? 'var(--moss, #6f8f5c)'
        : isDuress
            ? 'var(--rust, #b5482d)'
            : 'var(--gold, #c9a227)';

    return (
        <div
            className={`foxmark-container ${className}`}
            style={{
                position: 'relative',
                width: size,
                height: size,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            {/* Animated Radar Pulse when scanning/biometrics active */}
            {isScanning && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        border: `2px dashed ${ringBorderColor}`,
                        animation: 'spin 4s linear infinite',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Sovereign Outer Metallic Glow Ring */}
            <div
                style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                    filter: 'blur(4px)',
                    opacity: 0.8,
                    pointerEvents: 'none',
                }}
            />

            {/* Physical Coin Medallion Image */}
            <div
                style={{
                    position: 'relative',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#0b0f14',
                    boxShadow: `0 4px 18px rgba(0, 0, 0, 0.8), 0 0 12px ${glowColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(201, 162, 39, 0.3)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                }}
            >
                <img
                    src={logoImg}
                    alt="Emeritus Prime Bank Sovereign Seal"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </div>
        </div>
    );
}