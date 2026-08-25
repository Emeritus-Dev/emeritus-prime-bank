import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMobileAuth } from "@/context/auth-context";

export default function HomeScreen() {
    const { user, accounts, signOut } = useMobileAuth();
    const [masked, setMasked] = useState(true);

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <View>
                        <ThemedText type="subtitle">Welcome back,</ThemedText>
                        <ThemedText type="title">{user?.name}</ThemedText>
                    </View>
                    <TouchableOpacity onPress={signOut} style={styles.signoutBtn}>
                        <ThemedText type="small" style={styles.signoutText}>Sign Out</ThemedText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setMasked(!masked)} style={styles.maskToggle}>
                    <ThemedText type="link" style={styles.maskText}>
                        {masked ? "👁 Show Balances" : "🔒 Hide Balances"}
                    </ThemedText>
                </TouchableOpacity>

                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Liquid Accounts
                </ThemedText>

                {accounts.map((acc) => (
                    <View key={acc.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <ThemedText type="subtitle" style={styles.accountName}>{acc.name}</ThemedText>
                            <ThemedText type="small" style={styles.cardNum}>{acc.number}</ThemedText>
                        </View>
                        <ThemedText type="title" style={styles.balance}>
                            {masked ? "••••••••" : `R ${acc.balance.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`}
                        </ThemedText>
                    </View>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 20, paddingTop: 60 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    signoutBtn: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: "rgba(232, 226, 209, 0.15)" },
    signoutText: { textTransform: "uppercase" },
    maskToggle: { alignSelf: "flex-start", marginBottom: 16 },
    maskText: { color: "#c9a227" },
    sectionTitle: { fontSize: 16, marginBottom: 12 },
    card: { padding: 16, borderRadius: 12, backgroundColor: "rgba(232, 226, 209, 0.05)", borderWidth: 1, borderColor: "rgba(232, 226, 209, 0.12)", marginBottom: 12 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    accountName: { fontSize: 15 },
    cardNum: { opacity: 0.6 },
    balance: { fontSize: 20, color: "#c9a227", fontFamily: "monospace" },
});