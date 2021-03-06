const path = require('path');

module.exports = {
  port: {
    next: process.env.PORT || 3000,
    api: 8080,
  },
  host: {
    api: 'localhost'
  },
  domain: 'https://native-pet-life.herokuapp.com',
  static: path.join(`${__dirname}/..`),
  database: {
    type: 'mysql',
    host: 'eu-cdbr-west-02.cleardb.net',
    port: 3306,
    username: 'b87f2e80648c19',
    password: '7f831e20',
    database: 'heroku_4d4d87bbe77a652',
    synchronize: true,
    entities: ['./server/build/entities/*.js']
  },
  secret: 'jwt-secret',
};
