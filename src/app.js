'use strict';
import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import body_parser from 'body-parser';
import 'dotenv/config';
import config from './lib/config';
import AppError from './lib/app_error';
import routes from './routes';
import {init as mysql_init} from './lib/mysql_connector';
import response from './lib/middlewares/res';
import {error404, errorHandler} from './lib/middlewares/error_handler';
import extractUserInfo from "./lib/middlewares/req";

global['config'] = config;
global['AppError'] = AppError;
const app = express();

mysql_init(config.mysql);

if (config.environment === 'production') {
    process.env['http_proxy'] = 'http://118.70.7.229:80/';
    process.env['https_proxy'] = 'http://118.70.7.229:80/';
}

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
}));
app.use(morgan(':remote-addr :remote-user :user-agent :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
app.use(response());
app.use(extractUserInfo);
app.use(body_parser.json({limit: '50mb'}));
app.use(body_parser.urlencoded({extended: false, limit: '50mb'}));

app.get('/server-info', (req, res, next) => {
    res.json({
        status: "running",
        info: {
            name: "customer-service",
            port: config.http.port,
            code: "expressjs"
        },
        date: new Date()
    })
});
app.use('/api/', routes);

app.use(error404());
app.use(errorHandler());


app.listen(config.http.port, () => {
    console.log(`\nStart server at: ${new Date()}
                 HTTP server is listening at: http: ${config.http.port} https: ${config.https.port}
                 Node Env: ${config.environment}
                 Mysql: ${config.mysql.host}, Database: ${config.mysql.database}
    `);
});



// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }, app).listen(config.https.port);
