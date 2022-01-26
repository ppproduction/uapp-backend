import fs from "fs";
import Db from "../dependencies/db";
import Auth from "../dependencies/auth";
import Services from "../models/types/Services";
import { Connection } from "typeorm";

class ProductionEnvironment {
    private static instance : ProductionEnvironment; 
    static services : any = {};
    static providers : any = {};
    constructor() {
        if(!ProductionEnvironment.instance) {
            this.initializeDependencies();
            console.log('Waiting for DB connection');
            const timeout = setTimeout(() => {
                if(Db.connection) 
                {
                    ProductionEnvironment.providers = {
                        connection : Db.connection,
                        auth : new Auth(),
                    }
                    this.initializeServices();
                    console.log('DB connection successfully');
                    clearTimeout(timeout);
                }
            }, 1000);
        } else return ProductionEnvironment.instance;
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
        const services = fs.readdirSync(`${__dirname}/../services`);
        services.forEach((service) => {
            if(service !== 'generic') import(`../services/${service}`).then((value) => {
                import(`../repositories/${service}/postgres`).then((repo) => {
                    ProductionEnvironment.services[value.default.name] = new value.default.service(new repo.default.class(...repo.default.dependencies.map((val: string | number) => ProductionEnvironment.providers[val])));
                })
            })
        });
    }
}

export default ProductionEnvironment;