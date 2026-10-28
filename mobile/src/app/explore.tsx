import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import CardsScreen from "@/screens/CardsScreen";
import TransferScreen from "@/screens/TransferScreen";

export default function ExploreRoute() {
    const [activeSegment, setActiveSegment] = useState<"cards" | "transfer">("cards");

    return (
        <ThemedView style={styles.container}>
            {/* Top Segment Controller */}
            <View style={styles.segmentRow}>
                <TouchableOpacity
                    onPress={() => setActiveSegment("cards")}
                    style={[styles.segmentBtn, activeSegment === "cards" && styles.segmentActive]}
                >
                    <ThemedText type="smallBold" style={activeSegment === "cards" ? styles.textActive : styles.textInactive}>
                        Cards Facility
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveSegment("transfer")}
                    style={[styles.segmentBtn, activeSegment === "transfer" && styles.segmentActive]}
                >
                    <ThemedText type="smallBold" style={activeSegment === "transfer" ? styles.textActive : styles.textInactive}>
                        Fund Transfer
                    </ThemedText>
                </TouchableOpacity>
            </View>

            {activeSegment === "cards" ? <CardsScreen /> : <TransferScreen />}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    segmentRow: {
        flexDirection: "row",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(232, 226, 209, 0.1)",
    },
    segmentBtn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 6, borderWidth: 1, borderColor: "transparent" },
    segmentActive: { borderColor: "#c9a227", backgroundColor: "rgba(201, 162, 39, 0.1)" },
    textActive: { color: "#c9a227" },
    textInactive: { opacity: 0.6 },
});