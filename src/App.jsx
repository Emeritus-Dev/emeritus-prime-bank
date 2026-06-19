import React from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import DemoBanner from "./components/DemoBanner.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

function Screen() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Dashboard /> : <LoginScreen />;
}

export default function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <div className="shell">
                    <DemoBanner />
                    <Screen />
                </div>
            </AuthProvider>
        </ErrorBoundary>
    );
}