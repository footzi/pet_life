const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const config = require('./server.config');

const nextConfig = {
  env: {
    DOMAIN: config.domain,
  }
};

module.exports = withPlugins(
  [withSass],
  nextConfig
);
