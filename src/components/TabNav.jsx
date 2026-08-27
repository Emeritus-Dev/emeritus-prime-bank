import React from 'react';

export default function TabNav({ tabs, activeTab, onTabSelect }) {
    return (
        <nav className="sovereign-nav">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    className={`action-pill${activeTab === tab.id ? ' is-active' : ''}`}
                    onClick={() => onTabSelect(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}