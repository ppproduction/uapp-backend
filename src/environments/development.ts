import UserPosgres from "../repositories/user/postgres";
import UserService from "../services/user";
import Db from "../dependencies/db";
import Auth from "../dependencies/auth";
import Services from "../models/types/Services";

class DevelopmentEnvironment {
    private static instance : DevelopmentEnvironment; 
    static services : Services;
    constructor() {
        if(!DevelopmentEnvironment.instance) {
            this.initializeDependencies();
            console.log('Waiting for DB connection');
            const timeout = setTimeout(() => {
                if(Db.connection) 
                {
                    this.initializeServices();
                    console.log('DB connection successfully');
                    clearTimeout(timeout);
                }
            }, 1000);
        } else return DevelopmentEnvironment.instance;
    }

    private initializeDependencies = () => {
        new Db();
        new Auth();
    }
    
    private initializeServices = () => {
        DevelopmentEnvironment.services = {
            user : new UserService(new UserPosgres(Db.connection, new Auth()))
        };
    }
}

export default DevelopmentEnvironment;