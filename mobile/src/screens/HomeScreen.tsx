import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useAuth } from '@/context/auth-context';

export default function HomeScreen() {
    const { customerName, accounts, transactions, logout, toggleCardFreeze, isDuress } = useAuth();
    const [masked, setMasked] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Top Sovereign Bar */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeSub}>SOVEREIGN ACCESS</Text>
                        <Text style={styles.customerTitle}>{customerName}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                        <Text style={styles.logoutText}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>

                {isDuress && (
                    <View style={styles.duressBanner}>
                        <Text style={styles.duressText}>DECOY PROTOCOL ACTIVE</Text>
                    </View>
                )}

                {/* Balance Reveal Controls */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Vault Portfolios</Text>
                    <TouchableOpacity onPress={() => setMasked(!masked)}>
                        <Text style={styles.toggleMaskText}>{masked ? 'Reveal Balances' : 'Mask Balances'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Account Cards */}
                <View style={styles.cardsList}>
                    {accounts.map((acc) => (
                        <View key={acc.id} style={[styles.card, acc.isFrozen && styles.cardFrozen]}>
                            <View style={styles.cardTop}>
                                <Text style={styles.cardName}>{acc.name}</Text>
                                <Text style={styles.cardNum}>{acc.accountNumber}</Text>
                            </View>
                            <Text style={styles.cardBalance}>
                                {masked ? '••••••••' : `R ${acc.balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}
                            </Text>
                            <View style={styles.cardBottom}>
                                <TouchableOpacity
                                    style={[styles.freezeBtn, acc.isFrozen && styles.freezeBtnActive]}
                                    onPress={() => toggleCardFreeze(acc.id)}
                                >
                                    <Text style={styles.freezeBtnText}>{acc.isFrozen ? 'UNFREEZE' : 'FREEZE'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Ledger */}
                <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Recent Activity</Text>
                <View style={styles.ledger}>
                    {transactions.map((tx) => (
                        <View key={tx.id} style={styles.txRow}>
                            <View>
                                <Text style={styles.txTitle}>{tx.title}</Text>
                                <Text style={styles.txDate}>{tx.date} · {tx.category}</Text>
                            </View>
                            <Text style={[styles.txAmount, tx.isPositive ? styles.txGreen : styles.txWhite]}>
                                {tx.isPositive ? '+' : ''}R {Math.abs(tx.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0b0f14',
    },
    container: {
        padding: 20,
        backgroundColor: '#0b0f14',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeSub: {
        fontSize: 10,
        color: '#c9a227',
        letterSpacing: 2,
        fontWeight: '700',
    },
    customerTitle: {
        fontSize: 20,
        color: '#ede6d6',
        fontWeight: '600',
    },
    logoutBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.15)',
    },
    logoutText: {
        color: '#ede6d6',
        fontSize: 11,
        letterSpacing: 1,
    },
    duressBanner: {
        backgroundColor: '#b5482d',
        padding: 8,
        borderRadius: 6,
        marginBottom: 16,
        alignItems: 'center',
    },
    duressText: {
        color: '#ede6d6',
        fontSize: 11,
        letterSpacing: 1.5,
        fontWeight: '700',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#ede6d6',
        fontSize: 16,
        fontWeight: '600',
    },
    toggleMaskText: {
        color: '#c9a227',
        fontSize: 12,
    },
    cardsList: {
        gap: 14,
    },
    card: {
        backgroundColor: '#121821',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.12)',
        padding: 16,
        gap: 12,
    },
    cardFrozen: {
        opacity: 0.5,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardName: {
        color: 'rgba(237, 230, 214, 0.65)',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    cardNum: {
        color: 'rgba(237, 230, 214, 0.4)',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    cardBalance: {
        fontSize: 22,
        color: '#ede6d6',
        fontFamily: 'monospace',
        fontWeight: '700',
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    freezeBtn: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.2)',
    },
    freezeBtnActive: {
        backgroundColor: '#b5482d',
        borderColor: '#b5482d',
    },
    freezeBtnText: {
        color: '#ede6d6',
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.8,
    },
    ledger: {
        backgroundColor: '#121821',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(232, 226, 209, 0.12)',
        overflow: 'hidden',
    },
    txRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(232, 226, 209, 0.08)',
    },
    txTitle: {
        color: '#ede6d6',
        fontSize: 14,
        fontWeight: '500',
    },
    txDate: {
        color: 'rgba(237, 230, 214, 0.45)',
        fontSize: 11,
        marginTop: 2,
    },
    txAmount: {
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '600',
    },
    txGreen: {
        color: '#6f8f5c',
    },
    txWhite: {
        color: '#ede6d6',
    },
});