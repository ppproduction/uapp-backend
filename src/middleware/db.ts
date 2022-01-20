import { Connection, createConnection } from "typeorm";
import User from "../entities/userEntity";

class Db {
    static connection : Connection;
    constructor() {
        createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: "uapp",
            synchronize: true,
            entities: [
                User
            ]
        }).then(conn => {Db.connection = conn})
    }
}
export default Db
