import React from "react";
import logoImg from "../assets/logo.png";

export default function FoxMark({ state = "idle", small = false }) {
    let wrapperClass = "fox-mark-container";
    if (small) wrapperClass += " size-sm";
    if (state === "scanning") wrapperClass += " is-scanning";
    if (state === "verified") wrapperClass += " is-verified";

    return (
        <div className={wrapperClass}>
            <img
                src={logoImg}
                alt="Emeritus Prime Bank Seal"
                className="bank-seal-img"
            />
            {state === "scanning" && <div className="biometric-scan-ring" />}
        </div>
    );
}