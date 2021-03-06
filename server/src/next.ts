const cookieParser = require('cookie-parser');
const next = require('next');
const express = require('express');
const proxy = require('http-proxy-middleware');
const routes = require('../../web/routes');
const config = require('../../server.config.json');

const app = next({ dev: process.env.NODE_ENV !== 'production', dir: './web' });
const handler = routes.getRequestHandler(app);
const server = express();

export const listenNext = (): void => {
  app.prepare().then((): void => {
    server.use(cookieParser());
    server.use(proxy('/api', { target: `http://localhost:${config.port.api}` }));
    server.use(proxy('/pages', { target: `http://localhost:${config.port.api}` }));
    server.use(proxy('/upload', { target: `http://localhost:${config.port.api}` }));
    server.use(handler);

    server.listen(config.port.next, (err: string): void => {
      if (err) {
        throw err;
      }

      console.log(`> Next listening on port ${config.port.next}`);
    });
  });
};

export default listenNext;
