import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import api from './routers/api';
import pages from './routers/pages';

const config = require('../../server.config.json');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(config.static));
app.use(passport.initialize());
app.use('/api', cors({ credentials: true, origin: `http://localhost:${config.port.next}` }), api);
app.use('/pages', cors({ credentials: true, origin: `http://localhost:${config.port.next}` }), pages);

export const listenApp = (): void => {
  app.listen(config.port.api, config.host.api, (): void => {
    console.log(`> Api listening on http://${config.host.api}:${config.port.api}`);
  });
};

export default app;
