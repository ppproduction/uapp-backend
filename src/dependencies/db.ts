import { Connection, createConnection } from "typeorm";
import User from "../models/entities/userEntity";

class Db {
    private static instance : Db;
    static connection : Connection;
    constructor() {
        if(!Db.instance) {
            createConnection({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : '5432'),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB,
                synchronize: true,
                entities: [
                    User
                ]
            }).then(conn => {
                Db.connection = conn;
            });
            Db.instance = this;
        } else return Db.instance;
    }
}

export default Db
