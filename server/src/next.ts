const next = require('next');
const express = require('express');
const proxy = require('http-proxy-middleware');
const routes = require('../../web/routes');
const config = require('../../server.config');

const app = next({ dev: process.env.NODE_ENV !== 'production', dir: './web' });
const handler = routes.getRequestHandler(app);
const server = express();

const initNext = (): void => {
	app.prepare().then((): void => {
		server.use(proxy('/api', {
			target: `http://localhost:${config.port.api}`,
			changeOrigin: true
		}));

		server.use(handler);

		server.listen(config.port.next, (err: string): void => {
			if (err) {
				throw err;
			}

			console.log(`> Next listening on port ${config.port.next}`);
		});
	});
};

export default initNext;
