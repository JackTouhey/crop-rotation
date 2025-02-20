import { useState, useEffect } from 'react';
import { Crop } from '../classes/garden-classes';
import { useGardenManager } from '../hooks/useGardenManager';
import './NewCropTab.css';

const NewCropTab = () => {
    const gardenManager = useGardenManager();
    const [cropName, setCropName] = useState('');
    const [message, setMessage] = useState('');
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        setCrops(gardenManager.getAllCrops());
    }, [gardenManager]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cropName.trim()) {
            const newCrop = new Crop(cropName.trim());
            gardenManager.addCrop(newCrop);
            setMessage(`Crop "${cropName}" created successfully!`);
            setCropName('');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="new-crop-container">
            <h2 className="new-crop-title">Create New Crop</h2>
            <form onSubmit={handleSubmit} className="new-crop-form">
                <div className="form-group">
                    <label htmlFor="cropName">Crop Name:</label>
                    <input
                        type="text"
                        id="cropName"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        placeholder="Enter crop name"
                        className="crop-input"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Create Crop
                </button>
            </form>
            {message && <div className="success-message">{message}</div>}
            <div className="existing-crops">
                <h3>Existing Crops</h3>
                <div className="crops-list">
                    {crops.map((crop, index) => (
                        <div key={index} className="crop-item">
                            {crop.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewCropTab;