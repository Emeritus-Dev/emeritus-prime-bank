import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedIcon } from './animated-icon';
import { ThemedText } from './themed-text';

export function AnimatedSplashOverlay() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.brandTitle}>
                Emeritus Prime
            </ThemedText>
            <ThemedText type="small" style={styles.brandTag}>
                Sovereign Banking
            </ThemedText>
        </View>
    );
}

export default AnimatedSplashOverlay;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0b0f14',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    brandTitle: {
        color: '#ede6d6',
        letterSpacing: 1.5,
        marginTop: 12,
    },
    brandTag: {
        color: '#c9a227',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 11,
    },
});