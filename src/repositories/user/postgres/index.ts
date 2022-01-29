import { Connection } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from "../../../models/entities/userEntity";
import UserInterface from "../../../models/interfaces/UserInterface";
import GenericPostgres from "../../generic/postgres";
import Auth from "../../../dependencies/auth";

class UserPosgres extends GenericPostgres<User> implements UserInterface{
    private static instance : UserPosgres;
    private static auth : Auth;
    constructor(connection : Connection, auth : Auth) {
        if(!UserPosgres.instance) {
            super(connection, 'User');
            UserPosgres.auth = auth;
            UserPosgres.instance = this;
        } else return UserPosgres.instance
    }

    async login(user_name: string, password: string): Promise<{ token: string; }> {
        const user = await this.repository.findOne({name : user_name});
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const { ...payload } : any  = user;
                delete payload.password;
                const token = UserPosgres.auth.generateToken(payload);
                if (token) return { token };
            }
            const err = { message: 'Incorrect Password', statusCode: 401 };
            throw err;
        }
        const err = { message: `User ${user_name} not found`, statusCode: 404 };
        throw err;
    }

    async signup(user_name: string, email: string, password: string): Promise<{ success: boolean; }> {
        const saltRounds : any = process.env.SALT_ROUNDS;
        const hashedPassword = bcrypt.hashSync(password, parseInt(saltRounds));
        const user = new User(uuidv4(), user_name, email, hashedPassword);
        await this.createEntity(user);
        return {success : true};
    }
}

export default { class : UserPosgres, dependencies : ['connection', 'auth']};