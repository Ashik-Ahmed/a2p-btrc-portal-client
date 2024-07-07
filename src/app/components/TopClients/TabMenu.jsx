import React, { useState } from 'react';
import styles from './TabMenu.module.css';

const TabMenu = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('1');

    const tabs = [
        { label: 'Daily', value: '1' },
        { label: 'Weekly', value: '7' },
        { label: 'Monthly', value: '30' },
    ];

    const handleTabClick = (value) => {
        setActiveTab(value);
        if (onTabChange) onTabChange(value);
    };

    const getTabIndex = () => {
        return tabs.findIndex(tab => tab.value === activeTab);
    };

    return (
        <div className={`${styles['tab-container']} flex justify-center gap-x-1`}>
            <div
                className={styles['tab-active-indicator']}
                style={{ left: `${getTabIndex() * 32.333}%` }}
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
