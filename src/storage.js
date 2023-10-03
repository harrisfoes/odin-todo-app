export class Storage {
    constructor(storageId) {
        this.storageId = storageId;
    }

    containsStorage = () => {
        return localStorage.getItem(this.storageId); 
    }

    retrieveStorage = () => {

        if(!this.containsStorage()){
            alert("retrieveStorage error: storage doesn't exist!")
        }

        console.log(this.storageId);
        const localData = localStorage.getItem(this.storageId); 
        console.log(localData);
        console.log(JSON.parse(localData));
        return JSON.parse(localData);
    }

    storeObject = (object) => {
        localStorage.setItem(this.storageId, JSON.stringify(object));
    }
}