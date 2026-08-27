import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMobileAuth } from "@/context/auth-context";

export default function TransferScreen() {
    const { accounts, transferFunds } = useMobileAuth();
    const [fromId, setFromId] = useState(accounts[0]?.id || "");
    const [toId, setToId] = useState(accounts[1]?.id || "");
    const [amount, setAmount] = useState("");
    const [statusMessage, setStatusMessage] = useState<{ text: string; error: boolean } | null>(null);

    const handleTransfer = async () => {
        setStatusMessage(null);
        const numAmount = parseFloat(amount);

        if (isNaN(numAmount) || numAmount <= 0) {
            setStatusMessage({ text: "Please enter a valid transfer amount.", error: true });
            return;
        }

        const result = await transferFunds({ fromId, toId, amount: numAmount });
        if (result.success) {
            setStatusMessage({ text: `Successfully transferred R ${numAmount.toFixed(2)}.`, error: false });
            setAmount("");
        } else {
            setStatusMessage({ text: result.error || "Transfer failed.", error: true });
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <ThemedText type="title" style={styles.title}>Transfer Funds</ThemedText>
                <ThemedText type="small" style={styles.sub}>Instant allocation across liquidity facilities</ThemedText>

                {/* Source Account Selection */}
                <ThemedText type="subtitle" style={styles.label}>From Account</ThemedText>
                <View style={styles.accountList}>
                    {accounts.map((acc) => (
                        <TouchableOpacity
                            key={acc.id}
                            onPress={() => setFromId(acc.id)}
                            style={[styles.accountChoice, fromId === acc.id && styles.accountSelected]}
                        >
                            <ThemedText type="smallBold">{acc.name}</ThemedText>
                            <ThemedText type="small" style={{ color: "#c9a227" }}>
                                R {acc.balance.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Destination Account Selection */}
                <ThemedText type="subtitle" style={styles.label}>To Account</ThemedText>
                <View style={styles.accountList}>
                    {accounts.map((acc) => (
                        <TouchableOpacity
                            key={acc.id}
                            onPress={() => setToId(acc.id)}
                            style={[styles.accountChoice, toId === acc.id && styles.accountSelected]}
                        >
                            <ThemedText type="smallBold">{acc.name}</ThemedText>
                            <ThemedText type="small" style={{ color: "#c9a227" }}>
                                R {acc.balance.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Amount Input */}
                <ThemedText type="subtitle" style={styles.label}>Amount (ZAR)</ThemedText>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="rgba(237, 230, 214, 0.3)"
                    value={amount}
                    onChangeText={setAmount}
                />

                {statusMessage && (
                    <ThemedText type="small" style={[styles.statusText, statusMessage.error ? styles.statusError : styles.statusSuccess]}>
                        {statusMessage.text}
                    </ThemedText>
                )}

                <TouchableOpacity onPress={handleTransfer} style={styles.transferButton}>
                    <ThemedText type="subtitle" style={styles.transferBtnText}>Execute Transfer</ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 20, paddingTop: 50 },
    title: { marginBottom: 4 },
    sub: { opacity: 0.6, marginBottom: 20 },
    label: { fontSize: 14, marginTop: 14, marginBottom: 8 },
    accountList: { gap: 8, marginBottom: 12 },
    accountChoice: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(232, 226, 209, 0.12)",
        backgroundColor: "rgba(232, 226, 209, 0.04)",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    accountSelected: { borderColor: "#c9a227", backgroundColor: "rgba(201, 162, 39, 0.12)" },
    input: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(232, 226, 209, 0.15)",
        backgroundColor: "rgba(232, 226, 209, 0.05)",
        paddingHorizontal: 16,
        color: "#ede6d6",
        fontSize: 18,
        fontFamily: "monospace",
        marginBottom: 16,
    },
    statusText: { marginBottom: 16, textAlign: "center" },
    statusError: { color: "#b5482d" },
    statusSuccess: { color: "#6f8f5c" },
    transferButton: {
        height: 48,
        backgroundColor: "#c9a227",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    transferBtnText: { color: "#121821", fontWeight: "bold" },
});