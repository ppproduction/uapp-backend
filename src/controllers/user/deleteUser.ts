import { Handler } from "express";

const deleteUser : Handler = (req, res, next) => {
    res.send('DELETE USER');
}

export default deleteUser;