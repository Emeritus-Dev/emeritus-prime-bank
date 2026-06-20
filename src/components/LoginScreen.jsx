import React, { useState, useRef, useEffect } from "react";
import FoxMark from "./FoxMark.jsx";
import { DEMO_CUSTOMER } from "../data/mockData.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [markState, setMarkState] = useState("idle");
    const scanTimer = useRef(null);

    const handlePasscodeSubmit = (event) => {
        event.preventDefault();
        if (passcode === DEMO_CUSTOMER.passcode) {
            setError("");
            signIn();
        } else {
            setError("Passcode incorrect. Try 1234 for this demo.");
        }
    };

    const handleSimulatedScan = () => {
        if (markState === "scanning") return;

        setError("");
        setMarkState("scanning");

        scanTimer.current = setTimeout(() => {
            setMarkState("verified");
            setTimeout(() => signIn(), 350);
        }, 1100);
    };

    // Cleanup timer if component unmounts
    useEffect(() => {
        return () => {
            if (scanTimer.current) clearTimeout(scanTimer.current);
        };
    }, []);

    return (
        <div className="login-screen">
            <div className="login-card">
                <div className="brand-mark">
                    <FoxMark state={markState} />
                    <div className="brand-name">Emeritus Prime Bank</div>
                    <div className="brand-tag">Proto-Sim</div>
                </div>

                <form className="login-form" onSubmit={handlePasscodeSubmit}>
                    <label className="field-label" htmlFor="passcode">
                        Passcode
                    </label>
                    <input
                        id="passcode"
                        className="field-input"
                        type="password"
                        inputMode="numeric"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="1234"
                        autoComplete="off"
                    />
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="btn-primary">
                        Sign in
                    </button>
                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={handleSimulatedScan}
                        disabled={markState === "scanning"}
                    >
                        Use face scan
                    </button>
                </form>
            </div>
        </div>
    );
}