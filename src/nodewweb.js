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

const init = (config) => {
  if (typeof config.query !== 'object') {
    throw new TypeError('config.query needs to be an object')
  }
  if (typeof config.cookie !== 'object') {
    throw new TypeError('config.cookie needs to be an object')
  }
  serverSearch.update(config.query)
  serverCookie.update(config.cookie)
}

module.exports = {
  init,
  redirect: () => {},
  search,
  cookie,
}
