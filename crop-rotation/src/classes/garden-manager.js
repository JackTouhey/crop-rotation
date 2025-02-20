import {
    Crop,
    CropBed,
    GardenManager
} from './garden-classes';

class GardenStorage {
    static STORAGE_KEY = 'garden_manager_data';

    static serialize(gardenManager) {
        const serializedData = {
            crops: Array.from(gardenManager.crops).map(crop => ({
                name: crop.name,
                icon: crop.icon,
                recipes: Array.from(crop.recipes).map(recipe => recipe.name)
            })),
            plannedBeds: gardenManager.getAllPlannedBeds().map(bed => ({
                name: bed.name,
                year: bed.year,
                crops: Array.from(bed.crops).map(crop => crop.name),
                success: bed.success,
                weatherDescription: bed.weatherDescription,
                datePlanted: bed.datePlanted ? bed.datePlanted.toISOString() : null
            })),
            activeBeds: gardenManager.getAllActiveBeds().map(bed => ({
                name: bed.name,
                year: bed.year,
                crops: Array.from(bed.crops).map(crop => crop.name),
                success: bed.success,
                weatherDescription: bed.weatherDescription,
                datePlanted: bed.datePlanted ? bed.datePlanted.toISOString() : null
            })),
            historicalBeds: gardenManager.bedHistory.getAllBeds().map(bed => ({
                name: bed.name,
                year: bed.year,
                crops: Array.from(bed.crops).map(crop => crop.name),
                success: bed.success,
                weatherDescription: bed.weatherDescription,
                datePlanted: bed.datePlanted ? bed.datePlanted.toISOString() : null
            }))
        };

        return JSON.stringify(serializedData);
    }

    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const gardenManager = new GardenManager();

        // Clear default crops
        gardenManager.crops.clear();

        // Rebuild crops
        const cropMap = new Map();
        data.crops.forEach(cropData => {
            const crop = new Crop(cropData.name, cropData.icon);
            cropMap.set(cropData.name, crop);
            gardenManager.addCrop(crop);
        });

        // Helper function to reconstruct a bed
        const reconstructBed = (bedData) => {
            const bed = new CropBed(bedData.name, bedData.year);
            bedData.crops.forEach(cropName => {
                const crop = cropMap.get(cropName);
                if (crop) bed.addCrop(crop);
            });
            bed.setSuccess(bedData.success);
            bed.setWeatherDescription(bedData.weatherDescription);
            if (bedData.datePlanted) {
                bed.setDatePlanted(new Date(bedData.datePlanted));
            }
            return bed;
        };

        // Rebuild planned beds
        data.plannedBeds.forEach(bedData => {
            const bed = reconstructBed(bedData);
            gardenManager.plannedBeds.addBed(bed);
        });

        // Rebuild active beds
        data.activeBeds.forEach(bedData => {
            const bed = reconstructBed(bedData);
            gardenManager.activeBeds.addBed(bed);
        });

        // Rebuild historical beds
        data.historicalBeds.forEach(bedData => {
            const bed = reconstructBed(bedData);
            gardenManager.bedHistory.addBed(bed);
        });

        return gardenManager;
    }

    static save(gardenManager) {
        try {
            const serializedData = this.serialize(gardenManager);
            localStorage.setItem(this.STORAGE_KEY, serializedData);
            return true;
        } catch (error) {
            console.error('Error saving garden data:', error);
            return false;
        }
    }

    static load() {
        try {
            const serializedData = localStorage.getItem(this.STORAGE_KEY);
            if (!serializedData) return new GardenManager();
            return this.deserialize(serializedData);
        } catch (error) {
            console.error('Error loading garden data:', error);
            return new GardenManager();
        }
    }
}

export { GardenStorage };