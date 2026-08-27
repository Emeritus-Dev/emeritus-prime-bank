import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/context/auth-context';

export function PinLoginScreen() {
    const { loginWithPin, authenticateWithBiometrics } = useAuth();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanVerified, setScanVerified] = useState(false);

    // Seal scan rotation animation
    const spinAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isScanning) {
            Animated.loop(
                Animated.timing(spinAnim, {
                    toValue: 1,
                    duration: 1800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();

            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.12,
                        duration: 900,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 900,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            spinAnim.stopAnimation();
            spinAnim.setValue(0);
            pulseAnim.setValue(1);
        }
    }, [isScanning]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleDigit = (digit: string) => {
        if (pin.length < 4 && !isScanning) {
            const nextPin = pin + digit;
            setPin(nextPin);
            setError('');

            if (nextPin.length === 4) {
                const success = loginWithPin(nextPin);
                if (!success) {
                    setError('Invalid Sovereign Passcode');
                    setTimeout(() => setPin(''), 700);
                }
            }
        }
    };

    const handleBackspace = () => {
        if (isScanning) return;
        setPin((prev) => prev.slice(0, -1));
        setError('');
    };

    const triggerFaceScan = async () => {
        if (isScanning) return;
        setError('');
        setIsScanning(true);

        // Simulated Biometric / Face Scan telemetry
        setTimeout(async () => {
            setScanVerified(true);
            setTimeout(async () => {
                await authenticateWithBiometrics();
                setIsScanning(false);
                setScanVerified(false);
            }, 700);
        }, 1600);
    };

    return (
        <View style={styles.container}>
            {/* Brand & Animated Biometric Seal */}
            <View style={styles.topSection}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={triggerFaceScan}
                    style={styles.sealWrapper}
                >
                    {isScanning && (
                        <Animated.View
                            style={[
                                styles.scanRing,
                                { transform: [{ rotate: spin }] },
                                scanVerified && styles.scanRingVerified,
                            ]}
                        />
                    )}
                    <Animated.View
                        style={[
                            styles.sealBadge,
                            isScanning && { transform: [{ scale: pulseAnim }] },
                            scanVerified && styles.sealBadgeVerified,
                        ]}
                    >
                        <Text style={styles.sealEmblemText}>
                            {scanVerified ? '✓' : isScanning ? '👁' : '🏛️'}
                        </Text>
                    </Animated.View>
                </TouchableOpacity>

                <Text style={styles.brandTitle}>EMERITUS PRIME</Text>
                <Text style={styles.brandSubtitle}>SOVEREIGN PRIVATE VAULT</Text>
                <Text style={styles.scanPrompt}>
                    {isScanning
                        ? scanVerified
                            ? 'BIOMETRIC SIGNATURE VERIFIED'
                            : 'SCANNING FACIAL BIOMETRICS...'
                        : 'Tap seal for Face ID or enter Sovereign PIN'}
                </Text>
            </View>

            {/* PIN Dots */}
            <View style={styles.pinDisplay}>
                <View style={styles.dotsRow}>
                    {[0, 1, 2, 3].map((idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.dot,
                                pin.length > idx && styles.dotFilled,
                                error ? styles.dotError : null,
                            ]}
                        />
                    ))}
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            {/* Keypad */}
            <View style={styles.keypad}>
                {[
                    ['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9'],
                    ['FACE', '0', 'DEL'],
                ].map((row, rIdx) => (
                    <View key={rIdx} style={styles.keypadRow}>
                        {row.map((item) => {
                            if (item === 'FACE') {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.actionKey}
                                        onPress={triggerFaceScan}
                                        disabled={isScanning}
                                    >
                                        <Text style={styles.actionKeyText}>Face ID</Text>
                                    </TouchableOpacity>
                                );
                            }
                            if (item === 'DEL') {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.actionKey}
                                        onPress={handleBackspace}
                                        disabled={isScanning}
                                    >
                                        <Text style={styles.actionKeyText}>⌫</Text>
                                    </TouchableOpacity>
                                );
                            }
                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.numKey}
                                    onPress={() => handleDigit(item)}
                                    disabled={isScanning}
                                >
                                    <Text style={styles.numKeyText}>{item}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>

            {/* Security Hint Footer */}
            <View style={styles.footer}>
                <Text style={styles.hintText}>Standard: 1234 · Duress Decoy: 9999</Text>
            </View>
        </View>
    );
}

export default PinLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b0f14',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 45,
        paddingHorizontal: 24,
    },
    topSection: {
        alignItems: 'center',
        gap: 8,
        marginTop: 15,
    },
    sealWrapper: {
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 8,
    },
    scanRing: {
        position: 'absolute',
        width: 94,
        height: 94,
        borderRadius: 47,
        borderWidth: 2,
        borderColor: '#c9a227',
        borderStyle: 'dashed',
    },
    scanRingVerified: {
        borderColor: '#6f8f5c',
        borderStyle: 'solid',
    },
    sealBadge: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#121821',
        borderWidth: 1.5,
        borderColor: '#c9a227',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sealBadgeVerified: {
        borderColor: '#6f8f5c',
        backgroundColor: '#18241c',
    },
    sealEmblemText: {
        fontSize: 32,
    },
    brandTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#ede6d6',
        letterSpacing: 2,
    },
    brandSubtitle: {
        fontSize: 10,
        color: '#c9a227',
        letterSpacing: 2.8,
        fontWeight: '600',
    },
    scanPrompt: {
        fontSize: 11,
        color: 'rgba(237, 230, 214, 0.55)',
        letterSpacing: 0.4,
        marginTop: 4,
    },
    pinDisplay: {
        alignItems: 'center',
        gap: 12,
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 18,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: 'rgba(232, 226, 209, 0.25)',
        backgroundColor: 'transparent',
    },
    dotFilled: {
        backgroundColor: '#c9a227',
        borderColor: '#c9a227',
    },
    dotError: {
        borderColor: '#b5482d',
        backgroundColor: '#b5482d',
    },
    errorText: {
        fontSize: 12,
        color: '#b5482d',
        fontFamily: 'monospace',
    },
    keypad: {
        width: '100%',
        maxWidth: 290,
        gap: 12,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    numKey: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#121821',
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numKeyText: {
        color: '#ede6d6',
        fontSize: 25,
        fontWeight: '500',
    },
    actionKey: {
        width: 72,
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionKeyText: {
        color: '#c9a227',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footer: {
        alignItems: 'center',
    },
    hintText: {
        fontSize: 11,
        color: 'rgba(237, 230, 214, 0.35)',
        fontFamily: 'monospace',
    },
});