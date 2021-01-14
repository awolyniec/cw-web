// TODO: this is lazy; put it on NPM
const extend = require('extend');

const env = process.env.REACT_APP_ENV || 'development';

// TODO: add back-end port to global config
const config = {
  base: {},
  development: {
    backendUrl: 'ws://localhost:8080'
  },
  production: {
    backendUrl: 'ws://chattywatty-api.herokuapp.com'
  }
};

module.exports = extend(true, {}, config.base, config[env]);