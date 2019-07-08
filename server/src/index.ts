import { createConnection } from 'typeorm';
import { listenNext } from './next';
import { listenApp } from './app';

const config = require('../../server.config.json');

createConnection(config.database)
  .then((): void => {
    listenNext();
    listenApp();
    console.log(`> Database connection to ${config.database.host}`);
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
