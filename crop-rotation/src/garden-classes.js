// Base classes representing core entities
class Crop {
    constructor(name, datePlanted, icon = '') {
        this.name = name;
        this.datePlanted = datePlanted;
        this.icon = icon;
        this.recipes = new Set();
    }

    addRecipe(recipe) {
        this.recipes.add(recipe);
    }

    removeRecipe(recipe) {
        this.recipes.delete(recipe);
    }
}

class Recipe {
    constructor(name) {
        this.name = name;
        this.cropsUsed = new Set();
    }

    addCrop(crop) {
        this.cropsUsed.add(crop);
    }

    removeCrop(crop) {
        this.cropsUsed.delete(crop);
    }
}

class CropBed {
    constructor(name, year) {
        this.name = name;
        this.year = year;
        this.crops = new Set();
        this.success = 0; // 0-100 rating
        this.weatherDescription = '';
    }

    addCrop(crop) {
        this.crops.add(crop);
    }

    removeCrop(crop) {
        this.crops.delete(crop);
    }

    setSuccess(rating) {
        this.success = Math.max(0, Math.min(100, rating));
    }

    setWeatherDescription(description) {
        this.weatherDescription = description;
    }
}

// Management classes for different bed states
class PlannedCropBeds {
    constructor() {
        this.plannedBeds = new Set();
    }

    addBed(bed) {
        this.plannedBeds.add(bed);
    }

    removeBed(bed) {
        this.plannedBeds.delete(bed);
    }

    getBeds() {
        return Array.from(this.plannedBeds);
    }
}

class ActiveCropBeds {
    constructor() {
        this.currentBeds = new Set();
    }

    addBed(bed) {
        this.currentBeds.add(bed);
    }

    removeBed(bed) {
        this.currentBeds.delete(bed);
    }

    getBeds() {
        return Array.from(this.currentBeds);
    }
}

class BedHistory {
    constructor() {
        this.priorBeds = [];
    }

    addBed(bed) {
        this.priorBeds.push(bed);
    }

    getBedsByYear(year) {
        return this.priorBeds.filter(bed => bed.year === year);
    }

    getAllBeds() {
        return [...this.priorBeds];
    }
}

// Garden Manager to orchestrate all operations
class GardenManager {
    constructor() {
        this.plannedBeds = new PlannedCropBeds();
        this.activeBeds = new ActiveCropBeds();
        this.bedHistory = new BedHistory();
    }

    // Bed management methods
    planBed(name, year) {
        const bed = new CropBed(name, year);
        this.plannedBeds.addBed(bed);
        return bed;
    }

    activateBed(bed) {
        this.plannedBeds.removeBed(bed);
        this.activeBeds.addBed(bed);
    }

    archiveBed(bed) {
        this.activeBeds.removeBed(bed);
        this.bedHistory.addBed(bed);
    }

    // Utility methods
    getAllActiveBeds() {
        return this.activeBeds.getBeds();
    }

    getAllPlannedBeds() {
        return this.plannedBeds.getBeds();
    }

    getHistoricalBeds(year) {
        return this.bedHistory.getBedsByYear(year);
    }
}

export {
    Crop,
    Recipe,
    CropBed,
    PlannedCropBeds,
    ActiveCropBeds,
    BedHistory,
    GardenManager
};