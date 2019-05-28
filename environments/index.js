const fs = require('fs');
const path = require('path');
const dev = require('./dev.js');
const prod = require('./prod.js');

const config = path.join(`${__dirname}/../server.config.json`);
const isDev = process.argv.some((val) => val === '--dev');
const isProd = process.argv.some((val) => val === '--prod');

const write = (env, type) => {
    fs.writeFile(config, JSON.stringify(env, null, 2), (err) => {
        if (err) throw err;
        console.log(`Config setup as ${type}`);
    });
};
console.log(isDev, 'isdev');
console.log(isProd, 'prod');
console.log(process.env.PORT);

if (isDev) {
    write(dev, 'development');
}

if (isProd) {
    write(prod, 'production');
}
