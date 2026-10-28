import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import DevicePreviewFrame from './components/DevicePreviewFrame';

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
        <DevicePreviewFrame>
            <div className="app-root">
                {!isAuthenticated ? <LoginScreen /> : <Dashboard />}
            </div>
        </DevicePreviewFrame>
    );
}