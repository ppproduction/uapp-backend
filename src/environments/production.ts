import UserPosgres from "../repositories/user/postgres";
import UserService from "../services/user";
import Db from "../dependencies/db";
import Auth from "../dependencies/auth";
import Services from "../models/types/Services";

class ProductionEnvironment {
    private static instance : ProductionEnvironment; 
    static services : Services;
    constructor() {
        if(!ProductionEnvironment.instance) {
            const db = new Db();
            console.log('Waiting for DB connection');
            const timeout = setTimeout(() => console.log('.'), 1000);
            while(!Db.connection) {};
            ProductionEnvironment.services = {
                user : 
                    new UserService(
                        new UserPosgres(
                            Db.connection, 
                            new Auth(), 
                        )
                    ),
            };
        } else return ProductionEnvironment.instance;
    }
}

export default ProductionEnvironment;