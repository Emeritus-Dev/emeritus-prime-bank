import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import { PinLoginScreen } from '@/components/PinLoginScreen';

function RootNavigator() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <PinLoginScreen />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="explore" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <AnimatedSplashOverlay />
            <RootNavigator />
            <StatusBar style="light" />
        </AuthProvider>
    );
}