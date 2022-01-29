import { Handler, Router } from 'express';
import UserInterface from '../models/interfaces/UserInterface';

class UserRoutes {
    private static instance : UserRoutes;
    private static service : UserInterface;
    private static router : Router;
    constructor(service : UserInterface, app : Router) {
        if (!UserRoutes.instance) {
            UserRoutes.service = service;
            UserRoutes.router = Router();
            app.use('/user', UserRoutes.router);
            UserRoutes.router.post('/login', this.login);
            UserRoutes.router.post('/signup', this.signup);
        } else return UserRoutes.instance;
    }

    private login : Handler = async (req, res, next) => {
        try {
            const resp = await UserRoutes.service.login(req.body.name, req.body.password);
            res.send({ success : true, data : resp })
        } catch (error) {
            next(error);
        }
    }

    private signup : Handler = async (req, res, next) => {
        try {
            const resp = await UserRoutes.service.signup(req.body.name, req.body.email, req.body.password);
            res.send({ success : resp.success })
        } catch (error) {
            next(error);
        }
    }
}

export default UserRoutes;