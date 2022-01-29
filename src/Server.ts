import { Router } from "express";
import Services from "./models/types/Services";
import fs from "fs";
class Server {
    constructor(app : Router) {
        const environment = process.env.ENV ? process.env.ENV : 'development';
        import(`./environment`).then((config) => {
            new config.default(environment);
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
        const routes = fs.readdirSync(`${__dirname}/routes`);
        routes.forEach((route) => {
            import(`./routes/${route}`).then((value) => {
                new value.default(services.user, app);
            })
        });
    };
};

export default Server;