import { createConnection } from 'typeorm';
import express from 'express';
import router from './routers';
import initNext from './next';

const config = require('../server.config');

// @ts-ignore
const app = express();

app.use('/api', router);

createConnection(config.database)
    .then((): void => {
        console.log(`> Database connection to ${config.database.host}`);

        app.listen(config.port.api, (): void => {
            initNext();
            console.log(`> Api listening on port ${config.port.api}`);
        });
    })
    .catch((error: string): void => {
        console.log(`> Error connection to database ${error}`);
    });