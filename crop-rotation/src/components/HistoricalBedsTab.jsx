import { useState, useEffect } from 'react';
import { useGardenManager } from '../hooks/useGardenManager';
import './HistoricalBedsTab.css';

const HistoricalBedsTab = () => {
    const gardenManager = useGardenManager();
    const [historicalBeds, setHistoricalBeds] = useState([]);

    useEffect(() => {
        const beds = gardenManager.bedHistory.getAllBeds()
            .sort((a, b) => b.year - a.year || b.name.localeCompare(a.name));
        setHistoricalBeds(beds);
    }, [gardenManager]);

    const handleRemoveBed = (bed) => {
        console.log(bed.name);
        gardenManager.removeHistoricalBed(bed);
        const beds = gardenManager.bedHistory.getAllBeds()
            .sort((a, b) => b.year - a.year || b.name.localeCompare(a.name));
        setHistoricalBeds(beds);
        alert(`Successfully removed ${bed.getName()}`);
    };

    return (
        <div className="historical-beds-container">
            <h2 className="historical-beds-title">Historical Beds</h2>
            <div className="historical-beds-list">
                {historicalBeds.map((bed, index) => (
                    <div key={index} className="historical-bed-card">
                        <div className="bed-header">
                            <h3 className="bed-name">{bed.name}</h3>
                            <div className="year-remove-container">
                                <span className="bed-year">{bed.year}</span>
                                <button onClick={() => handleRemoveBed(bed)} className="remove-bed">X</button>
                            </div>
                        </div>
                        <div className="bed-details">
                            <div className="bed-crops">
                                <h4>Crops:</h4>
                                <p>{Array.from(bed.crops).map(crop => crop.name).join(', ') || 'No crops recorded'}</p>
                            </div>
                            <div className="bed-weather">
                                <h4>Weather Conditions:</h4>
                                <p>{bed.weatherDescription || 'No weather description available'}</p>
                            </div>
                            {bed.success > 0 && (
                                <div className="bed-success">
                                    <h4>Success Rating:</h4>
                                    <p>{bed.success}%</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {historicalBeds.length === 0 && (
                    <div className="no-beds-message">
                        No historical beds available
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoricalBedsTab;