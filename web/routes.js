const nextRoutes = require('next-routes');

module.exports = nextRoutes()
  .add('index')
  .add('checkin')
  .add('about')
  .add('profile', '/profile/:id');
