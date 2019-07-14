module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['/'],
      alias: {
        store: './store',
        web: './web',
        components: './mobile/components',
        config: './server.config.json',
        helpers: './helpers'
      }
    }]
  ]
};
