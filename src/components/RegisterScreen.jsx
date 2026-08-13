import React, { useState, useRef, useEffect } from "react";
import FoxMark from "./FoxMark.jsx";

const SECURITY_QUESTIONS = [
    "What was the name of your first primary school?",
    "In what city or town did your parents meet?",
    "What is the maiden name of your mother?",
    "What was the make of your first car?",
    "What was the name of your childhood pet?"
];

export default function RegisterScreen({ onBackToLogin, onRegisterSuccess }) {
    const [step, setStep] = useState(1);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        surname: "",
        idNumber: "",
        email: "",
        phone: "",
        gender: "Prefer not to say",
        race: "African",
        taxIdNumber: "",
        sourceOfFunds: "Employment",
        password: "",
        confirmPassword: "",
        securityQuestion: SECURITY_QUESTIONS[0],
        securityAnswer: "",
    });

    const [errors, setErrors] = useState({});

    // Biometric Camera State
    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [cameraStatus, setCameraStatus] = useState("idle"); // idle, active, scanning, verified, error
    const [capturedImage, setCapturedImage] = useState(null);

    const getPasswordStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.surname.trim()) newErrors.surname = "Surname is required.";
        if (!formData.idNumber.trim() || formData.idNumber.length < 13) {
            newErrors.idNumber = "A valid 13-digit SA ID or passport is required.";
        }
        if (!formData.email.trim() || !formData.email.includes("@")) {
            newErrors.email = "Valid email address is required.";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.password || formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formData.securityAnswer.trim()) {
            newErrors.securityAnswer = "Please answer the security question.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) {
            setStep(3);
            startCamera();
        }
    };

    // Upgraded Resilient Camera Initialization
    const startCamera = async () => {
        setCameraStatus("active");
        setErrors((prev) => ({ ...prev, camera: "" }));

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setCameraStatus("error");
            setErrors((prev) => ({ ...prev, camera: "Browser does not support camera capture. Use simulated scan below." }));
            return;
        }

        try {
            // Attempt 1: High quality user-facing camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
                audio: false
            });
            attachStream(stream);
        } catch (err) {
            console.warn("Primary camera request failed, attempting basic constraint fallback...", err);
            try {
                // Attempt 2: Basic fallback constraint
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                attachStream(fallbackStream);
            } catch (fallbackErr) {
                console.error("Camera access denied or device missing:", fallbackErr);
                setCameraStatus("error");
                setErrors((prev) => ({ ...prev, camera: "Camera blocked or not detected. You can use the simulated scan below." }));
            }
        }
    };

    const attachStream = (stream) => {
        setMediaStream(stream);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    const stopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
    };

    useEffect(() => {
        return () => stopCamera();
    }, [mediaStream]);

    const triggerBiometricScan = () => {
        if (cameraStatus === "scanning") return;
        setCameraStatus("scanning");

        setTimeout(() => {
            if (videoRef.current && mediaStream) {
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = videoRef.current.videoWidth || 320;
                    canvas.height = videoRef.current.videoHeight || 240;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    setCapturedImage(canvas.toDataURL("image/jpeg"));
                } catch (e) {
                    console.warn("Snapshot capture fallback", e);
                }
            }
            setCameraStatus("verified");
            stopCamera();
        }, 2200);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowWelcomeModal(true);
    };

    const handleConfirmSuccess = () => {
        setShowWelcomeModal(false);
        const finalRegistrationPayload = {
            ...formData,
            biometricTemplate: capturedImage || "MOCK_BIOMETRIC_HASH_VERIFIED",
            registeredAt: new Date().toISOString(),
        };

        if (onRegisterSuccess) {
            onRegisterSuccess(finalRegistrationPayload);
        }
    };

    const pwdStrength = getPasswordStrength(formData.password);

    return (
        <div className="login-screen" style={{ padding: "1.5rem" }}>
            {/* Split Screen Container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    width: "100%",
                    maxWidth: "920px",
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                }}
            >
                {/* LEFT PANEL: Logo & Brand Banner */}
                <div
                    style={{
                        background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(201, 162, 39, 0.15), transparent 80%), var(--surface-raised)",
                        borderRight: "1px solid var(--hairline)",
                        padding: "2.5rem 2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: "1.2rem"
                    }}
                >
                    <div style={{ transform: "scale(1.2)" }}>
                        <FoxMark state={cameraStatus === "scanning" ? "scanning" : cameraStatus === "verified" ? "verified" : "idle"} />
                    </div>
                    <div>
                        <div className="brand-name" style={{ fontSize: "1.8rem" }}>Emeritus Prime</div>
                        <div className="brand-tag" style={{ marginTop: "0.3rem" }}>Wealth & Digital Infrastructure</div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--parchment-dim)", maxWidth: "260px", lineHeight: 1.5 }}>
                        Join South Africa’s premier institution designed for elite financial growth and security.
                    </p>
                    <div className="field-label" style={{ marginTop: "1rem", color: "var(--gold)" }}>
                        ● Step {step} of 3: {step === 1 ? "Personal Details" : step === 2 ? "Security Credentials" : "Biometric Setup"}
                    </div>
                </div>

                {/* RIGHT PANEL: Vertical Form Flow */}
                <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", maxHeight: "85vh", overflowY: "auto" }}>
                    <div>
                        <h2 className="section-title" style={{ fontSize: "1.4rem", margin: 0 }}>Register Account</h2>
                        <span className="section-sub">Please fill in your details below</span>
                    </div>

                    <form onSubmit={step === 3 ? handleFormSubmit : (e) => { e.preventDefault(); handleNext(); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                        {/* STEP 1: Personal Details */}
                        {step === 1 && (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">First Name *</label>
                                    <input className="field-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Tshegofatso" />
                                    {errors.firstName && <div className="login-error">{errors.firstName}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Middle Name</label>
                                    <input className="field-input" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Optional" />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Surname *</label>
                                    <input className="field-input" name="surname" value={formData.surname} onChange={handleChange} placeholder="Hlabela" />
                                    {errors.surname && <div className="login-error">{errors.surname}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">ID / Passport Number *</label>
                                    <input className="field-input" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="13-digit SA ID" />
                                    {errors.idNumber && <div className="login-error">{errors.idNumber}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Email Address *</label>
                                    <input className="field-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" />
                                    {errors.email && <div className="login-error">{errors.email}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Phone Number *</label>
                                    <input className="field-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+27 ..." />
                                    {errors.phone && <div className="login-error">{errors.phone}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Gender</label>
                                    <select className="field-input" name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Race (FICA Compliance)</label>
                                    <select className="field-input" name="race" value={formData.race} onChange={handleChange}>
                                        <option value="African">African</option>
                                        <option value="Coloured">Coloured</option>
                                        <option value="Indian">Indian</option>
                                        <option value="White">White</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Tax ID (FATCA/TIN)</label>
                                    <input className="field-input" name="taxIdNumber" value={formData.taxIdNumber} onChange={handleChange} placeholder="Optional tax reference" />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Primary Source of Wealth</label>
                                    <select className="field-input" name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleChange}>
                                        <option value="Employment">Salary / Employment</option>
                                        <option value="Business">Business Profits</option>
                                        <option value="Investments">Investments / Capital</option>
                                        <option value="Inheritance">Inheritance / Family</option>
                                    </select>
                                </div>

                                <button type="button" className="btn-primary" onClick={handleNext} style={{ marginTop: "0.5rem" }}>
                                    Continue to Security ❯
                                </button>
                            </>
                        )}

                        {/* STEP 2: Password & Recovery */}
                        {step === 2 && (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Create Password *</label>
                                    <input className="field-input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                                    {errors.password && <div className="login-error">{errors.password}</div>}

                                    <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                style={{
                                                    flex: 1,
                                                    height: "4px",
                                                    borderRadius: "2px",
                                                    background: pwdStrength >= level
                                                        ? (pwdStrength <= 2 ? "var(--rust)" : pwdStrength === 3 ? "var(--amber)" : "var(--moss)")
                                                        : "var(--surface-raised)",
                                                    transition: "background 0.2s var(--ease)"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Confirm Password *</label>
                                    <input className="field-input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                                    {errors.confirmPassword && <div className="login-error">{errors.confirmPassword}</div>}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Security Question *</label>
                                    <select className="field-input" name="securityQuestion" value={formData.securityQuestion} onChange={handleChange}>
                                        {SECURITY_QUESTIONS.map((q, i) => (
                                            <option key={i} value={q}>{q}</option>
                                        ))}
                                    </select>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Security Answer *</label>
                                    <input className="field-input" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} placeholder="Your recovery answer" />
                                    {errors.securityAnswer && <div className="login-error">{errors.securityAnswer}</div>}
                                </div>

                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                                    <button type="button" className="btn-ghost" onClick={() => setStep(1)} style={{ flex: 1 }}>
                                        ❮ Back
                                    </button>
                                    <button type="button" className="btn-primary" onClick={handleNext} style={{ flex: 1 }}>
                                        Continue to Biometrics ❯
                                    </button>
                                </div>
                            </>
                        )}

                        {/* STEP 3: Camera Hardware Scan */}
                        {step === 3 && (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label className="field-label">Face Verification Scan</label>
                                    <div style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "210px",
                                        background: "var(--surface-raised)",
                                        borderRadius: "10px",
                                        border: "1px solid var(--hairline)",
                                        overflow: "hidden",
                                        display: "grid",
                                        placeItems: "center"
                                    }}>
                                        {cameraStatus === "error" ? (
                                            <div style={{ textAlign: "center", padding: "1rem" }}>
                                                <div className="login-error" style={{ marginBottom: "0.5rem" }}>
                                                    {errors.camera}
                                                </div>
                                                <button type="button" className="btn-ghost" onClick={startCamera} style={{ fontSize: "0.75rem", margin: "0 auto" }}>
                                                    Retry Camera Permission
                                                </button>
                                            </div>
                                        ) : capturedImage ? (
                                            <img src={capturedImage} alt="Captured face scan" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        ) : (
                                            <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        )}

                                        <div style={{
                                            position: "absolute",
                                            width: "140px",
                                            height: "140px",
                                            border: `2px dashed ${cameraStatus === "verified" ? "var(--moss)" : "var(--gold)"}`,
                                            borderRadius: "50%",
                                            boxShadow: cameraStatus === "scanning" ? "0 0 15px var(--gold)" : "none",
                                            pointerEvents: "none"
                                        }} />
                                    </div>
                                </div>

                                {cameraStatus === "verified" ? (
                                    <div className="modal-success" style={{ textAlign: "center", color: "var(--moss)" }}>
                                        ✓ Biometric scan captured & verified.
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn-ghost"
                                        onClick={triggerBiometricScan}
                                        disabled={cameraStatus === "scanning"}
                                    >
                                        {cameraStatus === "scanning" ? "Analyzing Liveness..." : cameraStatus === "error" ? "Simulate Biometric Scan" : "Scan & Verify Face"}
                                    </button>
                                )}

                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                                    <button type="button" className="btn-ghost" onClick={() => { stopCamera(); setStep(2); }} style={{ flex: 1 }}>
                                        ❮ Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={cameraStatus !== "verified"}
                                        style={{ flex: 1 }}
                                    >
                                        Submit Registration
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            className="logout-link"
                            onClick={() => { stopCamera(); onBackToLogin(); }}
                            style={{ textAlign: "center", marginTop: "0.5rem" }}
                        >
                            Already registered? Sign in
                        </button>
                    </form>
                </div>
            </div>

            {/* WELCOME POP-UP MODAL */}
            {showWelcomeModal && (
                <div className="modal-backdrop">
                    <div className="modal-card" style={{ textAlign: "center", maxWidth: "420px" }}>
                        <div style={{ margin: "0 auto", width: "60px" }}>
                            <FoxMark state="verified" />
                        </div>
                        <h2 className="modal-title" style={{ color: "var(--gold)", fontSize: "1.35rem" }}>
                            Registration Complete!
                        </h2>
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.5", color: "var(--parchment)" }}>
                            Welcome to banking better — the home for South Africa’s visionaries and wealth builders.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={handleConfirmSuccess} style={{ width: "100%" }}>
                                Access Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}