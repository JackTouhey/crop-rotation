import { useState, useEffect } from 'react';
import { GardenStorage } from '../classes/garden-manager';

export function useGardenManager() {
    const [gardenManager, setGardenManager] = useState(() => GardenStorage.load());

    useEffect(() => {
        // Save whenever garden manager changes
        GardenStorage.save(gardenManager);
    }, [gardenManager]);

    return gardenManager;
}
