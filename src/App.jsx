import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="app-root">
            {!isAuthenticated ? <LoginScreen /> : <Dashboard />}
        </div>
    );
}