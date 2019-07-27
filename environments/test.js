const path = require('path');
const ip = require('ip');

module.exports = {
  port: {
    next: 3000,
    api: 8080,
  },
  host: {
    api: ip.address()
  },
  domain: `http://${ip.address()}:8080`,
  static: path.join(`${__dirname}/..`),
  database: {
    type: 'mysql',
    host: 'eu-cdbr-west-02.cleardb.net',
    port: 3306,
    username: 'b16e3102e893b3',
    password: '5dd4eca7',
    database: 'heroku_4ddaed2aed39346',
    synchronize: true,
    entities: ['./server/src/entities/*.ts']
  },
  secret: 'jwt-secret',
  expire_access: '120',
  expire_refresh: '30d'
};
