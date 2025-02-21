import { useState } from 'react';
import { CropBed } from '../classes/garden-classes';
import { useGardenManager } from '../hooks/useGardenManager';
import './NewBedTab.css';

const NewBedTab = () => {
    const gardenManager = useGardenManager();
    const [bedName, setBedName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedCrops, setSelectedCrops] = useState(new Set());
    const [bedType, setBedType] = useState('planned');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bedName.trim()) {
            const plantingDate = new Date(selectedDate);
            const year = plantingDate.getFullYear();

            const newBed = new CropBed(bedName.trim(), year);
            newBed.setDatePlanted(plantingDate);
            selectedCrops.forEach(crop => newBed.addCrop(crop));

            if (weatherDescription) {
                newBed.setWeatherDescription(weatherDescription);
            }

            // Use the wrapped methods that trigger updates
            switch (bedType) {
                case 'planned':
                    gardenManager.plannedBeds.addBed(newBed);
                    break;
                case 'active':
                    gardenManager.activeBeds.addBed(newBed);
                    break;
                case 'historical':
                    gardenManager.bedHistory.addBed(newBed);
                    break;
            }

            setMessage(`Bed "${bedName}" created successfully!`);
            setBedName('');
            setSelectedCrops(new Set());
            setWeatherDescription('');
            setTimeout(() => setMessage(''), 3000);
            alert(`Bed "${bedName}" created successfully!`);
        }
    };

    const toggleCrop = (crop) => {
        const newSelectedCrops = new Set(selectedCrops);
        if (selectedCrops.has(crop)) {
            newSelectedCrops.delete(crop);
        } else {
            newSelectedCrops.add(crop);
        }
        setSelectedCrops(newSelectedCrops);
    };

    return (
        <div className="new-bed-container">
            <h2 className="new-bed-title">Create New Bed</h2>
            <form onSubmit={handleSubmit} className="new-bed-form">
                <div className="form-group">
                    <label htmlFor="bedName">Bed Name:</label>
                    <input
                        type="text"
                        id="bedName"
                        value={bedName}
                        onChange={(e) => setBedName(e.target.value)}
                        placeholder="Enter bed name"
                        className="bed-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plantingDate">Planting Date:</label>
                    <input
                        type="date"
                        id="plantingDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="date-input"
                    />
                </div>

                <div className="form-group">
                    <label>Bed Type:</label>
                    <div className="bed-type-options">
                        <label className="radio-label">
                            <input
                                type="radio"
                                value="planned"
                                checked={bedType === 'planned'}
                                onChange={(e) => setBedType(e.target.value)}
                            />
                            Planned
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                value="active"
                                checked={bedType === 'active'}
                                onChange={(e) => setBedType(e.target.value)}
                            />
                            Active
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                value="historical"
                                checked={bedType === 'historical'}
                                onChange={(e) => setBedType(e.target.value)}
                            />
                            Historical
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Select Crops:</label>
                    <div className="crops-selection">
                        {gardenManager.getAllCrops().map((crop, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`crop-button ${selectedCrops.has(crop) ? 'selected' : ''}`}
                                onClick={() => toggleCrop(crop)}
                            >
                                {crop.name}
                            </button>
                        ))}
                    </div>
                </div>

                {bedType === 'historical' && (
                    <div className="form-group">
                        <label htmlFor="weatherDescription">Weather Description:</label>
                        <textarea
                            id="weatherDescription"
                            value={weatherDescription}
                            onChange={(e) => setWeatherDescription(e.target.value)}
                            placeholder="Enter weather description"
                            className="weather-input"
                        />
                    </div>
                )}

                <button type="submit" className="submit-button">
                    Create Bed
                </button>
            </form>
            {message && <div className="success-message">{message}</div>}
        </div>
    );
};

export default NewBedTab;