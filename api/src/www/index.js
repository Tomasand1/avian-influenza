import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import DefaultRouter from '../routes/default-router';
import DataRouter from '../routes/data-router';

export default class Server {
    static bootstrap() {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.config();

        this.routes();
    }

    config() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Authorization, Content-Type, Accept',
            );
            res.header(
                'Access-Control-Allow-Methods',
                'GET,POST,OPTIONS,DELETE,PUT',
            );
            res.header(
                'Access-Control-Expose-Headers',
                'X-Pagination-Page, X-Pagination-Limit, X-Pagination-Count',
            );
            next();
        });
        this.app.use(cors());

        // Use json form parser
        this.app.use(bodyParser.json());

        // Use query string parser
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );

        // Log requests
        this.app.use((req, res, next) => {
            console.log('handling request: ' + req.method + ' ' + req.url);
            next();
        });

        // Error handling
        this.app.use(errorHandler());
    }

    routes() {
        const defaultRouter = new DefaultRouter().init();
        this.app.use('/v1/', defaultRouter);

        const dataRouter = new DataRouter().init();
        this.app.use('/v1/', dataRouter);
    }
}
