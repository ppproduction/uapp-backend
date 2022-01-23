import { Router } from "express";
import Services from "./models/types/Services";
import UserRoutes from "./routes/user";

class Server {
    constructor(app : Router) {
        const environment = process.env.ENV ? process.env.ENV : 'development';
        import(`./environments/${environment}`).then((config) => {
            new config.default();
            console.log('Waiting for Configuration');
            const conf : { services : Services } = config.default;
            const timeout = setTimeout(() => {
                if(conf.services) {
                    this.initializeRoutes(conf.services , app);
                    console.log('Configuration successful');
                    clearTimeout(timeout);
                }
            }, 1000);
        });
    };

    private initializeRoutes = (services : Services, app : Router) => {
        new UserRoutes(services.user, app);
    };
};

export default Server;