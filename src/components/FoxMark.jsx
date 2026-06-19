import React from "react";

export default function FoxMark({ state = "idle" }) {
    let markClass = "fox-mark";
    if (state === "scanning") markClass += " is-scanning";
    if (state === "verified") markClass += " is-verified";

    return (
        <svg
            className={markClass}
            viewBox="0 0 100 100"
            role="img"
            aria-label="Emeritus Prime logo"
        >
            <polygon className="ear" points="18,30 34,8 40,34" />
            <polygon className="ear" points="82,30 66,8 60,34" />
            <circle className="ring" cx="50" cy="52" r="34" fill="none" strokeWidth="2" />
            <path
                d="M28 58 Q50 80 72 58 Q66 70 50 70 Q34 70 28 58 Z"
                fill="var(--surface-raised)"
                stroke="var(--gold)"
                strokeWidth="1.4"
            />
            <ellipse className="iris" cx="50" cy="56" rx="13" ry="13" fill="var(--gold)" />
            <circle cx="50" cy="56" r="4.5" fill="var(--ink)" />
        </svg>
    );
}