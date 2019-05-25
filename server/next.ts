const next = require('next');
const app = next({dev: process.env.NODE_ENV !== 'production', dir: './web'});
const express = require('express');
const routes = require('../web/routes');
const handler = routes.getRequestHandler(app);
const proxy = require('http-proxy-middleware');
const server = express();
import config from './config';

const initNext = () => {
	app.prepare().then(() => {
		server.use(proxy('/api', {
			target: `http://localhost:${config.port.api}`, 
			changeOrigin: true
		}));

		server.use(handler);
	
		server.listen(config.port.next, (err) => {
			if (err) {
				throw err;
			}
	
			console.log(`> Next listening on port ${config.port.next}`);
		});
	});
};

export default initNext;
