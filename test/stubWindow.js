const sinon = require('sinon')

function Document() {}

module.exports = (opts = {}) => {
  Object.defineProperty(Document.prototype, 'cookie', {
    get: () => opts.cookie || '',
    set: sinon.spy(),
    configurable: true,
  })
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
    document: new Document(),
    localStorage: {
      setItem: sinon.spy(),
      getItem: sinon.spy(),
      removeItem: sinon.spy(),
      clear: sinon.spy(),
    },
    Document,
  }
}
