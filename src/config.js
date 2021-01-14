// TODO: this is lazy; put it on NPM
const extend = require('extend');

const env = process.env.NODE_ENV || 'development';

const config = {
  base: {},
  development: {
    backendUrl: 'ws://localhost:8080'
  },
  production: {
    backendUrl: 'ws://chattywatty-api.herokuapp.com:80'
  }
};

module.exports = extend(true, {}, config.base, config[env]);