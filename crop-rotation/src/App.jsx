import React, { useState } from 'react';
import { GardenManager } from './garden-classes';
import NewCropTab from './components/NewCropTab';
import CurrentBedsTab from './components/CurrentBedsTab';
import NewBedTab from './components/NewBedTab';
import HistoricalBedsTab from './components/HistoricalBedsTab';
import PlannedBedsTab from './components/PlannedBedsTab';
import './App.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('current');
    const [gardenManager] = useState(() => new GardenManager());

    const tabs = [
        { id: 'newCrop', label: 'New Crop' },
        { id: 'newBed', label: 'New Bed' },
        { id: 'current', label: 'Current Beds' },
        { id: 'historical', label: 'Historical Beds' },
        { id: 'planned', label: 'Planned Beds' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'newCrop':
                return <NewCropTab gardenManager={gardenManager} />;
            case 'current':
                return <CurrentBedsTab gardenManager={gardenManager} />;
            case 'newBed':
                return <NewBedTab gardenManager={gardenManager} />;
            case 'historical':
                return <HistoricalBedsTab gardenManager={gardenManager} />;
            case 'planned':
                return <PlannedBedsTab gardenManager={gardenManager} />;
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            <div className="tabs-container">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default App;