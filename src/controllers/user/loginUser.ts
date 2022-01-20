import { Handler } from "express";
import User from "../../entities/userEntity";
import Db from "../../middleware/db";

const loginUser : Handler = async (req, res, next) => {
    const { id } = req.body;
    console.log(id);
    const user = await Db.connection.getRepository(User).findOne(id);
    console.log(user);
    res.send({success : true, data : { user }});
}

export default loginUser;