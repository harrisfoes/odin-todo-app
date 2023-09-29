export class Storage {
    constructor(storageId) {
        this.storageId = storageId;
    }

    containsStorage = () => {
        return localStorage.getItem(this.storageId); 
    }

    retrieveStorage = () => {

        if(!containsStorage()){
            alert("retrieveStorage error: storage doesn't exist!")
        }
            return localData = localStorage.getItem(JSON.parse(this.storageId)); 
    }

    storeObject = (object) => {
        localStorage.setItem(this.storageId, JSON.stringify(object));
    }
}