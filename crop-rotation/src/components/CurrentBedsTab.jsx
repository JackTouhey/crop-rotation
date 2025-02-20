import { useState, useEffect } from 'react';
import { useGardenManager } from '../hooks/useGardenManager';
import './CurrentBedsTab.css';

const CurrentBedsTab = () => {
    const gardenManager = useGardenManager();
    const [selectedBed, setSelectedBed] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState('');
    const [activeBeds, setActiveBeds] = useState([]);

    useEffect(() => {
        setActiveBeds(gardenManager.getAllActiveBeds());
    }, [gardenManager]);

    const handleMoveToHistory = (bed) => {
        if (weatherDescription.trim()) {
            bed.setWeatherDescription(weatherDescription.trim());
            gardenManager.archiveBed(bed);
            setSelectedBed(null);
            setWeatherDescription('');
        }
    };

    return (
        <div className="current-beds-container">
            <h2 className="current-beds-title">Current Beds</h2>
            <div className="beds-grid">
                {activeBeds.map((bed, index) => (
                    <div key={index} className="bed-card">
                        <h3 className="bed-name">{bed.name}</h3>
                        <div className="bed-info">
                            <p>Year: {bed.year}</p>
                            <p>Crops: {Array.from(bed.crops).map(crop => crop.name).join(', ')}</p>
                        </div>
                        <button
                            className="archive-button"
                            onClick={() => setSelectedBed(bed)}
                        >
                            Move to History
                        </button>
                    </div>
                ))}
            </div>
            {selectedBed && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add Weather Description</h3>
                        <textarea
                            value={weatherDescription}
                            onChange={(e) => setWeatherDescription(e.target.value)}
                            placeholder="Enter weather description"
                            className="weather-input"
                        />
                        <div className="modal-buttons">
                            <button
                                className="submit-button"
                                onClick={() => handleMoveToHistory(selectedBed)}
                            >
                                Submit
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    setSelectedBed(null);
                                    setWeatherDescription('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentBedsTab;