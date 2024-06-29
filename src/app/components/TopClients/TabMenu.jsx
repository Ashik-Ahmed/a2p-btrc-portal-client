import React, { useState } from 'react';
import styles from './TabMenu.module.css';

const TabMenu = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('Day');

    const tabs = ['Day', 'Week', 'Month'];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    };

    const getTabIndex = () => {
        return tabs.findIndex(tab => tab === activeTab);
    };

    return (
        <div className={`${styles['tab-container']} flex justify-center gap-x-2`}>
            <div
                className={styles['tab-active-indicator']}
                style={{ left: `${getTabIndex() * 33.333}%` }}
            />
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${styles['tab-button']} ${activeTab === tab ? 'text-primary' : 'text-gray-600'}`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabMenu;
