import { useState } from 'react';
import { useGardenManager } from '../hooks/useGardenManager';
import './ImportExportTab.css';

const ImportExportTab = () => {
    const gardenManager = useGardenManager();
    const [jsonData, setJsonData] = useState('');
    const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

    const handleExport = () => {
        try {
            const exportData = gardenManager.exportToJson();
            setJsonData(exportData);
            setStatusMessage({ text: 'Garden data exported successfully!', isError: false });
        } catch (error) {
            setStatusMessage({ text: `Export failed: ${error.message}`, isError: true });
        }
    };

    const handleImport = () => {
        try {
            if (!jsonData.trim()) {
                setStatusMessage({ text: 'Please enter JSON data to import', isError: true });
                return;
            }

            gardenManager.importFromJson(jsonData);
            setStatusMessage({ text: 'Garden data imported successfully!', isError: false });
        } catch (error) {
            setStatusMessage({ text: `Import failed: ${error.message}`, isError: true });
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonData)
            .then(() => setStatusMessage({ text: 'Copied to clipboard!', isError: false }))
            .catch(() => setStatusMessage({ text: 'Failed to copy to clipboard', isError: true }));
    };

    const handleClear = () => {
        setJsonData('');
        setStatusMessage({ text: '', isError: false });
    };

    return (
        <div className="import-export-container">
            <h2 className="import-export-title">Import / Export Garden Data</h2>

            <div className="import-export-content">
                <div className="button-group">
                    <button
                        className="action-button export-button"
                        onClick={handleExport}
                    >
                        Export Garden Data
                    </button>
                    <button
                        className="action-button copy-button"
                        onClick={handleCopy}
                        disabled={!jsonData}
                    >
                        Copy to Clipboard
                    </button>
                    <button
                        className="action-button clear-button"
                        onClick={handleClear}
                        disabled={!jsonData}
                    >
                        Clear
                    </button>
                </div>

                <div className="json-textarea-container">
                    <textarea
                        className="json-textarea"
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        placeholder="Paste JSON data here to import, or export your garden data to see it here..."
                        rows={12}
                    />
                </div>

                <div className="status-message-container">
                    {statusMessage.text && (
                        <p className={statusMessage.isError ? "error-message" : "success-message"}>
                            {statusMessage.text}
                        </p>
                    )}
                </div>

                <div className="import-section">
                    <button
                        className="action-button import-button"
                        onClick={handleImport}
                        disabled={!jsonData}
                    >
                        Import Garden Data
                    </button>
                    <p className="import-warning">
                        Warning: Importing data will replace your current garden data. Make sure to export and save your current data first.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImportExportTab;