import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import api from './routers/api';
import pages from './routers/pages'
import initNext from './next';

const config = require('../../server.config.json');

const app = express();

app.use(express.static(config.static));
app.use(passport.initialize());
app.use('/api', cors(), api);
app.use('/pages', cors(), pages);

createConnection(config.database)
  .then((): void => {
    initNext();
    console.log(`> Database connection to ${config.database.host}`);

    app.listen(config.port.api, config.host.api, (): void => {
      console.log(`> Api listening on http://${config.host.api}:${config.port.api}`);
    });
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
