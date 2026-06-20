import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

function Icon({ d }) {
    return (
        <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {d}
        </svg>
    );
}

const ICONS = {
    accounts: <Icon d={<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 14h3" /></>} />,
    networth: <Icon d={<><path d="M3 17l5-5 4 4 7-8" /><path d="M14 7h6v6" /></>} />,
    insights: <Icon d={<><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.4.3.6.8.6 1.2h6c0-.4.2-.9.6-1.2A6 6 0 0 0 12 3z" /></>} />,
    goals: <Icon d={<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></>} />,
    cards: <Icon d={<><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19" /></>} />,
    family: <Icon d={<><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M2.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M10.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /></>} />,
    carbon: <Icon d={<><path d="M12 21c4-2 6-6 6-10a6 6 0 0 0-12 0c0 4 2 8 6 10z" /><path d="M12 11v6" /></>} />,
    coach: <Icon d={<><path d="M12 3l1.7 3.6 4 .5-2.9 2.8.7 4-3.5-1.9-3.5 1.9.7-4-2.9-2.8 4-.5z" /></>} />,
};

const TABS = [
    { id: "accounts", label: "Accounts" },
    { id: "networth", label: "Net worth" },
    { id: "insights", label: "Insights" },
    { id: "goals", label: "Goals" },
    { id: "cards", label: "Cards" },
    { id: "family", label: "Family" },
    { id: "carbon", label: "Carbon" },
    { id: "coach", label: "Coach" },
];

export default function TabNav({ activeTab, onChange }) {
    const listRef = useRef(null);
    const btnRefs = useRef({});
    const [underline, setUnderline] = useState({ left: 0, width: 0 });

    const measure = () => {
        const btn = btnRefs.current[activeTab];
        const list = listRef.current;
        if (btn && list) {
            const btnRect = btn.getBoundingClientRect();
            const listRect = list.getBoundingClientRect();
            setUnderline({ left: btnRect.left - listRect.left, width: btnRect.width });
        }
    };

    useLayoutEffect(() => {
        measure();
    }, [activeTab]);

    useEffect(() => {
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [activeTab]);

    return (
        <nav className="tab-nav" aria-label="Dashboard sections">
            <div className="tab-list" ref={listRef}>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        ref={(el) => { btnRefs.current[tab.id] = el; }}
                        className={`tab-btn${activeTab === tab.id ? " is-active" : ""}`}
                        onClick={() => onChange(tab.id)}
                        type="button"
                    >
                        {ICONS[tab.id]}
                        {tab.label}
                    </button>
                ))}
                <span
                    className="tab-underline"
                    style={{ transform: `translateX(${underline.left}px)`, width: `${underline.width}px` }}
                />
            </div>
        </nav>
    );
}