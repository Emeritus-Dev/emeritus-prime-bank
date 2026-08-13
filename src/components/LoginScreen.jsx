import React, { useState, useRef, useEffect } from "react";
import FoxMark from "./FoxMark.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginScreen({ onOpenRegister }) {
    const { signIn } = useAuth();
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [markState, setMarkState] = useState("idle");
    const scanTimer = useRef(null);

    const handlePasscodeSubmit = (event) => {
        event.preventDefault();

        const result = signIn(passcode);

        if (!result.success) {
            setError(result.error);
        } else {
            setError("");
        }
    };

    const handleSimulatedScan = () => {
        if (markState === "scanning") return;

        setError("");
        setMarkState("scanning");

        scanTimer.current = setTimeout(() => {
            setMarkState("verified");
            setTimeout(() => signIn("1234"), 350); // Default Face ID logs in under standard profile
        }, 1100);
    };

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
                        placeholder="1234 or 9999"
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

                    {/* REGISTER LINK BUTTON */}
                    <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                        <span className="field-label" style={{ marginRight: "6px" }}>
                            New to Emeritus Prime?
                        </span>
                        <button
                            type="button"
                            className="logout-link"
                            onClick={onOpenRegister}
                            style={{ color: "var(--amber)", textTransform: "none", fontWeight: "600" }}
                        >
                            Create an Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}