const nextRoutes = require('next-routes');

module.exports = nextRoutes()
  .add('blog')
  .add('about')
  .add('user', '/user/:id');
