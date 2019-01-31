const genCache = () => {
  let store = {}
  return {
    get: name => store[name] || null,
    getAll: () => ({ ...store }),
    set: (name, val) => { store[name] = val },
    update: (obj) => { store = { ...obj } },
    remove: (name) => { delete store[name] },
    clear: () => { store = {} },
  }
}

const search = genCache()
const cookie = genCache()
const localStorage = genCache()

const init = (config) => {
  if (!config.query || typeof config.query !== 'object') {
    throw new TypeError('config.query needs to be an object')
  }
  if (!config.cookie || typeof config.cookie !== 'object') {
    throw new TypeError('config.cookie needs to be an object')
  }
  search.update(config.query)
  cookie.update(config.cookie)
}

module.exports = {
  init,
  redirect: () => {},
  search,
  cookie,
  localStorage,
}
