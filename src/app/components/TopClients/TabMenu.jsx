import React, { useState } from 'react';
import styles from './TabMenu.module.css';

const TabMenu = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('1');

    const tabs = [
        { label: 'Day', value: '1' },
        { label: 'Week', value: '7' },
        { label: 'Month', value: '30' },
    ];

    const handleTabClick = (value) => {
        setActiveTab(value);
        if (onTabChange) onTabChange(value);
    };

    const getTabIndex = () => {
        return tabs.findIndex(tab => tab.value === activeTab);
    };

    return (
        <div className={`${styles['tab-container']} flex justify-center gap-x-2`}>
            <div
                className={styles['tab-active-indicator']}
                style={{ left: `${getTabIndex() * 33.333}%` }}
            />
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    className={`${styles['tab-button']} ${activeTab === tab.value ? 'text-primary' : 'text-gray-600'}`}
                    onClick={() => handleTabClick(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabMenu;
