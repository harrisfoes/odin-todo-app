import { ProjectController } from "./todoParts.js";
import { Storage } from "./storage.js";

export class UI {
    constructor(){
        this.app = new ProjectController;
        this.storage = new Storage("todoApp");
    }

    initUI(){

        if(this.storage.containsStorage()){
            this.app = this.storage.retrieveStorage();
        }
    }

    displayProjectBoard = () => {
        this.displayProjectList();
        this.createProjectForm();
    }

    displayProjectList = () => {
    
    }

    createProjectForm = () => {

    }

}


