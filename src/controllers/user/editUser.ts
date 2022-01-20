import { Handler } from "express";

const editUser : Handler = (req, res, next) => {
    res.send('CREATE USER');
}

export default editUser;