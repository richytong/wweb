const sinon = require('sinon')

module.exports = (opts = {}) => {
  global.window = {
    history: {
      pushState: sinon.spy(),
    },
    location: {
      replace: sinon.spy(),
      pathname: opts.pathname || '/',
      hash: opts.hash || '',
      search: opts.search || '',
    },
    document: {
      cookie: opts.cookie || '',
    },
  }
}
