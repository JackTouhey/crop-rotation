import React, { useState } from 'react';
import './NewCropTab.css';

const NewCropTab = ({ gardenManager }) => {
    const [cropName, setCropName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cropName.trim()) {
            const crop = new Crop(cropName.trim(), new Date());
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
        </div>
    );
};

export default NewCropTab;