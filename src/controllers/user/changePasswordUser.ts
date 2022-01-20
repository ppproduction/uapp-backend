import { Handler } from "express";

const changePasswordUser : Handler = (req , res, next) => {
    res.send('CHANGE PASSWORD');
}

export default changePasswordUser;