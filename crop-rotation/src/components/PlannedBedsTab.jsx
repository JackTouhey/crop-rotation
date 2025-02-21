import { useState, useEffect } from 'react';
import { useGardenManager } from '../hooks/useGardenManager';
import './PlannedBedsTab.css';

const PlannedBedsTab = () => {
    const gardenManager = useGardenManager();
    const [plannedBeds, setPlannedBeds] = useState([]);

    useEffect(() => {
        const beds = gardenManager.getAllPlannedBeds()
            .sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));
        setPlannedBeds(beds);
    }, [gardenManager]);

    const handleActivateBed = (bed) => {
        gardenManager.activateBed(bed);
        alert(`Successfully activated ${bed.getName()}`);
    };

    return (
        <div className="planned-beds-container">
            <h2 className="planned-beds-title">Planned Beds</h2>
            <div className="planned-beds-grid">
                {plannedBeds.map((bed, index) => (
                    <div key={index} className="planned-bed-card">
                        <div className="bed-header">
                            <h3 className="bed-name">{bed.name}</h3>
                            <span className="bed-year">{bed.year}</span>
                        </div>
                        <div className="bed-content">
                            <div className="crops-section">
                                <h4>Planned Crops:</h4>
                                <p>{Array.from(bed.crops).map(crop => crop.name).join(', ') || 'No crops planned yet'}</p>
                            </div>
                            <button
                                className="activate-button"
                                onClick={() => handleActivateBed(bed)}
                            >
                                Activate Bed
                            </button>
                        </div>
                    </div>
                ))}
                {plannedBeds.length === 0 && (
                    <div className="no-beds-message">
                        No planned beds available
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlannedBedsTab;