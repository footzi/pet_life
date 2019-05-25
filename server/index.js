// const express = require('express');
// const next = require('next');
// const path = require('path');
// const routes = require('../web/routes');
// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({dev, dir: './web'});
// const handler = routes.getRequestHandler(app)

// const server = express();

// app.prepare().then(() => {
//     express().use(handler);

//     server.listen(port, (err) => {
//         if (err) {throw err;}
//         console.error(`> Ready on http://localhost:${port}`);
//     });
// });

const { createServer } = require('http')
const next = require('next')
const routes = require('../web/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev, dir: './web'})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  createServer(handler).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})