import dotenv from 'dotenv';
import express, { Router } from 'express';
import contentType from './modules/contentType';
import errorHandler from './modules/errorHandler';
import Server from './Server';
dotenv.config();

const startServer = async() => {
    const app = express();
    const apiRouter = Router();
    app.listen(process.env.PORT);
    app.use(express.json());
    app.use(contentType);
    app.use('/api', apiRouter);
    new Server(apiRouter);
    app.use(errorHandler);
}

startServer();
