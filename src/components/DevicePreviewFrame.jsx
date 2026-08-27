import React, { useState } from 'react';

export default function DevicePreviewFrame({ children }) {
    const [device, setDevice] = useState('full'); // 'full' | 'iphone14promax' | 'pixel7' | 'iphoneSE'

    const presets = {
        full: { name: 'Full Desktop View', width: '100%', height: '100%', frame: false },
        iphone14promax: { name: 'iPhone 14 Pro Max', width: '430px', height: '932px', frame: true, notch: 'dynamic-island' },
        pixel7: { name: 'Google Pixel 7', width: '412px', height: '915px', frame: true, notch: 'punch-hole' },
        iphoneSE: { name: 'Compact Mobile', width: '375px', height: '667px', frame: true, notch: 'classic' },
    };

    const activePreset = presets[device];

    return (
        <div style={{ minHeight: '100vh', background: '#070a0e', display: 'flex', flexDirection: 'column' }}>
            {/* SOVEREIGN DEVICE SWITCHER TOOLBAR */}
            <div
                style={{
                    background: 'var(--surface, #121821)',
                    borderBottom: '1px solid var(--hairline, rgba(232, 226, 209, 0.12))',
                    padding: '0.6rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--gold, #c9a227)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            DEVICE SIMULATOR
          </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--parchment-dim, rgba(237,230,214,0.6))' }}>
            ({activePreset.name} — {activePreset.width})
          </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {Object.entries(presets).map(([key, config]) => (
                        <button
                            key={key}
                            type="button"
                            className={`action-pill${device === key ? ' is-active' : ''}`}
                            onClick={() => setDevice(key)}
                            style={{ fontSize: '0.7rem', padding: '0.3rem 0.75rem' }}
                        >
                            {config.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* VIEWPORT CANVAS */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: activePreset.frame ? '2rem 1rem' : '0',
                    overflow: 'auto',
                }}
            >
                {activePreset.frame ? (
                    <div
                        style={{
                            width: activePreset.width,
                            height: activePreset.height,
                            maxHeight: '90vh',
                            background: 'var(--ink, #0b0f14)',
                            borderRadius: '44px',
                            border: '10px solid #232d3d',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(201, 162, 39, 0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* DYNAMIC ISLAND / CAMERA NOTCH */}
                        {activePreset.notch === 'dynamic-island' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '120px',
                                    height: '28px',
                                    background: '#000',
                                    borderRadius: '20px',
                                    zIndex: 9999,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0 12px',
                                }}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0b1622' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#04070a', border: '1px solid #1f2a3e' }} />
                            </div>
                        )}

                        {/* PUNCH HOLE (PIXEL 7) */}
                        {activePreset.notch === 'punch-hole' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    background: '#000',
                                    borderRadius: '50%',
                                    border: '1px solid #1a2230',
                                    zIndex: 9999,
                                }}
                            />
                        )}

                        {/* SCROLLABLE DEVICE SCREEN BODY */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                WebkitOverflowScrolling: 'touch',
                                paddingTop: activePreset.notch ? '35px' : '0',
                            }}
                        >
                            {children}
                        </div>

                        {/* HOME INDICATOR BAR */}
                        <div
                            style={{
                                height: '20px',
                                background: 'var(--ink, #0b0f14)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '100%', height: '100%' }}>{children}</div>
                )}
            </div>
        </div>
    );
}