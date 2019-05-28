const path = require('path');
const ip = require('ip');

const localDomain = true; // Заменить на true если надо переключится на локальный домен
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	port: {
		next: process.env.PORT || 3000,
		api: 8080,
	},
	host: {
		api: isDev ? ip.address() : ''
	},
	domain: localDomain && isDev ? `http://${ip.address()}` : 'https://native-pet-life.herokuapp.com/',
	static: path.join(`${__dirname}/upload`),
	database: {
		type: 'mysql',
		host: 'eu-cdbr-west-02.cleardb.net',
		port: 3306,
		username: 'b87f2e80648c19',
		password: '7f831e20',
		database: 'heroku_4d4d87bbe77a652',
		synchronize: true,
		entities: [
			isDev ? './server/src/entities/*.ts' : './server/build/entities/*.js'
		]
	},
};
