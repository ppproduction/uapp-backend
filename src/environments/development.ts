import fs from "fs";
import UserPosgres from "../repositories/user/postgres";
import UserService from "../services/user";
import Db from "../dependencies/db";
import Auth from "../dependencies/auth";
import Services from "../models/types/Services";
import { Connection } from "typeorm";

class DevelopmentEnvironment {
    private static instance : DevelopmentEnvironment; 
    static services : Services;
    static providers : { connection : Connection, auth : Auth};
    constructor() {
        if(!DevelopmentEnvironment.instance) {
            this.initializeDependencies();
            console.log('Waiting for DB connection');
            const timeout = setTimeout(() => {
                if(Db.connection) 
                {
                    DevelopmentEnvironment.providers = {
                        connection : Db.connection,
                        auth : new Auth(),
                    }
                    this.initializeServices();
                    console.log('DB connection successfully');
                    clearTimeout(timeout);
                }
            }, 1000);
        } else return DevelopmentEnvironment.instance;
    }

    private initializeDependencies = () => {
        const dependencies = fs.readdirSync(`${__dirname}/../dependencies`);
        dependencies.forEach((dependency) => {
            import(`../dependencies/${dependency}`).then((value) => {
                new value.default();
            })
        });
    }
    
    private initializeServices = () => {
        DevelopmentEnvironment.services = {
            user : new UserService(new UserPosgres(DevelopmentEnvironment.providers.connection, DevelopmentEnvironment.providers.auth))
        };
    }
}

export default DevelopmentEnvironment;