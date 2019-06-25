const nextRoutes = require('next-routes');

module.exports = nextRoutes()
  .add('about')
  .add('profile', '/profile/:id');
