import { createConnection } from 'typeorm';
import express from 'express';
import router from './routers';
import initNext from './next';

const config = require('../../server.config.json');

const app = express();

app.use((req, res, next): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

console.log(config.domain);

app.use('/api', router);
app.get('/api/test', (req, res) => {
    res.send('hello api test')
});
app.get('/test', (req, res) => {
    res.send('hello')
});

createConnection(config.database)
    .then((): void => {
        console.log(`> Database connection to ${config.database.host}`);

        app.listen(config.port.api, config.host.api, (): void => {
            initNext();
            console.log(`> Api listening on http://${config.host.api}:${config.port.api}`);
        });
    })
    .catch((error: string): void => {
        console.log(`> Error connection to database ${error}`);
    });
