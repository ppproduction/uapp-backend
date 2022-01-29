import fs from "fs";
import Db from "./dependencies/db";

class Environment {
    private static instance : Environment; 
    static services : any = {};
    static providers : any = {};
    static environment : string;
    constructor(environment : string) {
        if(!Environment.instance) {
            Environment.environment = environment;
            this.initializeDependencies();
            console.log('Waiting for DB connection');
            const timeout = setTimeout(() => {
                if(Db.connection) 
                {
                    import('./providers').then((value) => {
                        Environment.providers = value.default;
                        this.initializeServices();
                        console.log('DB connection successfully');
                        clearTimeout(timeout);
                    })
                }
            }, 1000);
        } else return Environment.instance;
    }

    private initializeDependencies = () => {
        const dependencies = fs.readdirSync(`${__dirname}/dependencies`);
        dependencies.forEach((dependency) => {
            import(`./dependencies/${dependency}`).then((value) => {
                new value.default();
            })
        });
    }
    
    private initializeServices = () => {
        const services = fs.readdirSync(`${__dirname}/services`);
        services.forEach(async (service) => {
            const dev : any = await import(`./envs/${Environment.environment}.json`);
            if(service !== 'generic') import(`./services/${service}`).then((value) => {
                import(`./repositories/${service}/${dev.default[service]}`).then((repo) => {
                    Environment.services[value.default.name] = new value.default.service(new repo.default.class(...repo.default.dependencies.map((val: string | number) => Environment.providers[val])));
                })
            })
        });
    }
}

export default Environment;