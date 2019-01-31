const genCache = () => {
  let store = {}
  return {
    get: name => store[name] || null,
    getAll: () => Object.assign({}, store),
    set: (name, val) => { store[name] = val },
    update: (obj) => { store = Object.assign({}, obj) },
    remove: (name) => { delete store[name] },
    clear: () => { store = {} },
  }
}

const search = genCache()
const cookie = genCache()
const localStorage = genCache()

const init = (config = {}) => {
  if (!config.search || typeof config.search !== 'object') {
    throw new TypeError('config.search needs to be an object')
  }
  if (!config.cookie || typeof config.cookie !== 'object') {
    throw new TypeError('config.cookie needs to be an object')
  }
  search.update(config.search)
  cookie.update(config.cookie)
}

module.exports = {
  init,
  redirect: () => {},
  search,
  cookie,
  localStorage,
}
