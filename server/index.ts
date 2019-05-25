// @ts-ignore
import IConfig from './interfaces'
import { createConnection } from 'typeorm';
import config from './config';
import router from './routers';
import * as express from "express"
 // @ts-ignore
import initNext from "./next";

const app = express();

app.use('/api', router);

// @ts-ignore
createConnection(config.database)
    .then(() => {
        // @ts-ignore
        app.listen(config.port.api, () => {
            initNext();
            console.log(`> Api listening on port ${config.port.api}`);
        })
    })
    .catch((error: string) => {
        console.log(`Error connection to database ${error}`);
    });    