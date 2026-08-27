import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMobileAuth } from "@/context/auth-context";

export default function CardsScreen() {
    const { accounts, toggleFreeze } = useMobileAuth();
    const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

    const toggleReveal = (id: string) => {
        setRevealedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <ThemedText type="title" style={styles.headerTitle}>Card Facilities</ThemedText>
                <ThemedText type="small" style={styles.headerSub}>
                    Tap unhide to inspect physical PAN and security CVV
                </ThemedText>

                {accounts.map((acc) => {
                    const isRevealed = !!revealedCards[acc.id];

                    return (
                        <View key={acc.id} style={[styles.cardContainer, acc.frozen && styles.cardFrozen]}>
                            {/* Sovereign Physical Card Representation */}
                            <View style={styles.cardSurface}>
                                <View style={styles.cardTopRow}>
                                    <ThemedText type="subtitle" style={styles.cardBrand}>Emeritus Prime</ThemedText>
                                    <ThemedText type="small" style={styles.cardType}>{acc.type || "Cheque"}</ThemedText>
                                </View>

                                <View style={styles.chipRow}>
                                    <View style={styles.emvChip} />
                                    <ThemedText type="small" style={styles.contactlessText}>))))</ThemedText>
                                </View>

                                <ThemedText type="title" style={styles.panNumber}>
                                    {isRevealed ? acc.number : `•••• •••• •••• ${acc.number.slice(-4)}`}
                                </ThemedText>

                                <View style={styles.cardBottomRow}>
                                    <View>
                                        <ThemedText type="small" style={styles.metaLabel}>CARD HOLDER</ThemedText>
                                        <ThemedText type="smallBold" style={styles.metaValue}>TSHEGOFATSO HLABELA</ThemedText>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <ThemedText type="small" style={styles.metaLabel}>EXPIRES</ThemedText>
                                        <ThemedText type="smallBold" style={styles.metaValue}>08/28</ThemedText>
                                    </View>
                                </View>
                            </View>

                            {/* Card Controls */}
                            <View style={styles.controlsRow}>
                                <View style={styles.controlItem}>
                                    <ThemedText type="smallBold">Freeze Card</ThemedText>
                                    <Switch
                                        value={acc.frozen}
                                        onValueChange={() => toggleFreeze(acc.id)}
                                        trackColor={{ false: "rgba(232, 226, 209, 0.2)", true: "#b5482d" }}
                                        thumbColor={acc.frozen ? "#ede6d6" : "#c9a227"}
                                    />
                                </View>

                                <TouchableOpacity onPress={() => toggleReveal(acc.id)} style={styles.revealBtn}>
                                    <ThemedText type="link" style={styles.revealBtnText}>
                                        {isRevealed ? "Hide Details" : "Show PAN & CVV"}
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 20, paddingTop: 50 },
    headerTitle: { marginBottom: 4 },
    headerSub: { opacity: 0.6, marginBottom: 20 },
    cardContainer: { marginBottom: 24 },
    cardFrozen: { opacity: 0.6 },
    cardSurface: {
        height: 190,
        borderRadius: 16,
        padding: 18,
        backgroundColor: "#121821",
        borderWidth: 1,
        borderColor: "rgba(201, 162, 39, 0.3)",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    cardBrand: { color: "#c9a227", fontSize: 16 },
    cardType: { color: "rgba(237, 230, 214, 0.6)", textTransform: "uppercase" },
    chipRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    emvChip: { width: 34, height: 24, borderRadius: 4, backgroundColor: "#c9a227" },
    contactlessText: { color: "#ede6d6", opacity: 0.6, letterSpacing: 2 },
    panNumber: { fontSize: 18, letterSpacing: 2, fontFamily: "monospace", color: "#ede6d6" },
    cardBottomRow: { flexDirection: "row", justifyContent: "space-between" },
    metaLabel: { fontSize: 9, opacity: 0.5, letterSpacing: 1 },
    metaValue: { color: "#ede6d6", fontSize: 12 },
    controlsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 8,
    },
    controlItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    revealBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: "rgba(201, 162, 39, 0.4)" },
    revealBtnText: { fontSize: 12, color: "#c9a227" },
});