import { useState, useEffect, useCallback } from 'react';
import { GardenStorage } from '../classes/GardenStorage';

export function useGardenManager() {
    const [gardenManager, setGardenManager] = useState(() => GardenStorage.load());
    const [updateCounter, setUpdateCounter] = useState(0);

    // Force a re-render when garden manager state changes
    const forceUpdate = useCallback(() => {
        setUpdateCounter(prev => prev + 1);
    }, []);

    const wrappedGardenManager = {
        ...gardenManager,
        addCrop: (crop) => {
            gardenManager.addCrop(crop);
            forceUpdate();
        },
        plannedBeds: {
            ...gardenManager.plannedBeds,
            addBed: (bed) => {
                gardenManager.plannedBeds.addBed(bed);
                forceUpdate();
            },
            removeBed: (bed) => {
                gardenManager.plannedBeds.removeBed(bed);
                forceUpdate();
            }
        },
        activeBeds: {
            ...gardenManager.activeBeds,
            addBed: (bed) => {
                gardenManager.activeBeds.addBed(bed);
                forceUpdate();
            },
            removeBed: (bed) => {
                gardenManager.activeBeds.removeBed(bed);
                forceUpdate();
            }
        },
        bedHistory: {
            ...gardenManager.bedHistory,
            addBed: (bed) => {
                gardenManager.bedHistory.addBed(bed);
                forceUpdate();
            }
        },
        activateBed: (bed) => {
            gardenManager.activateBed(bed);
            forceUpdate();
        },
        archiveBed: (bed) => {
            gardenManager.archiveBed(bed);
            forceUpdate();
        }
    };

    useEffect(() => {
        GardenStorage.save(gardenManager);
    }, [gardenManager, updateCounter]);

    return wrappedGardenManager;
}