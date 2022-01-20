import { Handler } from "express";
import { v4 as uuidv4 } from 'uuid';
import User from "../../entities/userEntity";
import Db from "../../middleware/db";

const createUser : Handler = async (req, res, next) => {
    const { email, user_name, password } = req.body;
    console.log(email, user_name, password);
    const user = new User(
        uuidv4(),
        user_name,
        email,
        password
    );
    await Db.connection.getRepository(User).save(user);   
    res.send({ success : true, data : { user }});
}

export default createUser;