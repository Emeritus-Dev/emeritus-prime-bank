import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';

export function AnimatedIcon() {
    return (
        <View style={styles.container}>
            <View style={styles.outerRing}>
                <View style={styles.innerShield}>
                    <ThemedText style={styles.emblemText}>🏛️</ThemedText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    outerRing: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#c9a227',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(201, 162, 39, 0.08)',
        shadowColor: '#c9a227',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 6,
    },
    innerShield: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#121821',
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emblemText: {
        fontSize: 30,
    },
});