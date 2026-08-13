import React, { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import DemoBanner from "./components/DemoBanner.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import RegisterScreen from "./components/RegisterScreen.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

function Screen() {
    const { isAuthenticated, signIn } = useAuth();
    const [authView, setAuthView] = useState("login"); // 'login' or 'register'

    if (isAuthenticated) {
        return <Dashboard />;
    }

    if (authView === "register") {
        return (
            <RegisterScreen
                onBackToLogin={() => setAuthView("login")}
                onRegisterSuccess={(payload) => {
                    console.log("Registered successfully:", payload);
                    alert(`Welcome, ${payload.firstName}! Registration complete.`);
                    signIn(); // Automatically log user in after successful registration
                }}
            />
        );
    }

    return <LoginScreen onOpenRegister={() => setAuthView("register")} />;
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