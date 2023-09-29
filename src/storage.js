export class Storage{
    constructor(storageId) {
        this.storageId = storageId;
    }

    containsStorage = () => {
        return localData = localStorage.getItem(JSON.parse(this.storageId)); 
    }
}