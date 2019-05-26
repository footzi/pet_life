import IConfig from './interfaces'
import { createConnection } from 'typeorm';
import router from './routers';
import express from "express"
import initNext from "./next";
const config = require('../server.config');

//@ts-ignore
const app = express();

app.use('/api', router);

createConnection(config.database)
    .then(() => {
        console.log(`> Database connection to ${config.database.host}`);
    
        app.listen(config.port.api, () => {
            initNext();
            console.log(`> Api listening on port ${config.port.api}`);
        })
    })
    .catch((error: string) => {
        console.log(`> Error connection to database ${error}`);
    });    