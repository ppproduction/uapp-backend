import dotenv from 'dotenv';
import express from 'express';
import Db from './middleware/db';
import routes from './routes';

dotenv.config();

const startServer = async() => {
    const app = express();
    new Db();
    app.listen(process.env.PORT);
    app.use(express.json());
    app.use('/api', routes);
}

startServer();
