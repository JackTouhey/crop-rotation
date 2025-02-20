import { useState, useEffect, useCallback } from 'react';
import { GardenStorage } from '../classes/garden-manager';

export function useGardenManager() {
    const [gardenManager, setGardenManager] = useState(() => GardenStorage.load());
    const [updateCounter, setUpdateCounter] = useState(0);

    // Force a re-render when garden manager state changes
    const forceUpdate = useCallback(() => {
        setUpdateCounter(prev => prev + 1);
    }, []);

    // Wrap the garden manager methods that modify state
    const wrappedGardenManager = {
        ...gardenManager,
        // Getters
        getAllActiveBeds: () => gardenManager.activeBeds.getBeds(),
        getAllPlannedBeds: () => gardenManager.plannedBeds.getBeds(),
        getAllCrops: () => Array.from(gardenManager.crops),
        getHistoricalBeds: (year) => gardenManager.bedHistory.getBedsByYear(year),

        // Crop methods
        addCrop: (crop) => {
            gardenManager.addCrop(crop);
            forceUpdate();
        },

        // Planned beds methods
        plannedBeds: {
            ...gardenManager.plannedBeds,
            addBed: (bed) => {
                gardenManager.plannedBeds.addBed(bed);
                forceUpdate();
            },
            removeBed: (bed) => {
                gardenManager.plannedBeds.removeBed(bed);
                forceUpdate();
            },
            getBeds: () => gardenManager.plannedBeds.getBeds()
        },

        // Active beds methods
        activeBeds: {
            ...gardenManager.activeBeds,
            addBed: (bed) => {
                gardenManager.activeBeds.addBed(bed);
                forceUpdate();
            },
            removeBed: (bed) => {
                gardenManager.activeBeds.removeBed(bed);
                forceUpdate();
            },
            getBeds: () => gardenManager.activeBeds.getBeds()
        },

        // Bed history methods
        bedHistory: {
            ...gardenManager.bedHistory,
            addBed: (bed) => {
                gardenManager.bedHistory.addBed(bed);
                forceUpdate();
            },
            getBedsByYear: (year) => gardenManager.bedHistory.getBedsByYear(year),
            getAllBeds: () => gardenManager.bedHistory.getAllBeds()
        },

        // Bed state transition methods
        activateBed: (bed) => {
            gardenManager.activateBed(bed);
            forceUpdate();
        },
        archiveBed: (bed) => {
            gardenManager.archiveBed(bed);
            forceUpdate();
        },
        planBed: (name, year) => {
            const bed = gardenManager.planBed(name, year);
            forceUpdate();
            return bed;
        }
    };

    useEffect(() => {
        GardenStorage.save(gardenManager);
    }, [gardenManager, updateCounter]);

    return wrappedGardenManager;
}