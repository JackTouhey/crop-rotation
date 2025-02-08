// components/NewBedTab.jsx
import React, { useState } from 'react';
import { CropBed } from '../garden-classes';
import './NewBedTab.css';

const NewBedTab = ({ gardenManager }) => {
    const [bedName, setBedName] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCrops, setSelectedCrops] = useState(new Set());
    const [bedType, setBedType] = useState('planned');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [message, setMessage] = useState('');

    const years = Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - 3 + i
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bedName.trim()) {
            const newBed = new CropBed(bedName.trim(), selectedYear);
            selectedCrops.forEach(crop => newBed.addCrop(crop));

            if (weatherDescription) {
                newBed.setWeatherDescription(weatherDescription);
            }

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
                    <label htmlFor="bedYear">Year:</label>
                    <select
                        id="bedYear"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="year-select"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
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