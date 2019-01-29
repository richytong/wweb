const genCache = () => {
  let store = {}
  return {
    wrt: (obj) => { store = { ...obj } },
    get: name => store[name] || null,
    gta: () => ({ ...store }),
    set: (name, val) => { store[name] = val },
    del: (name) => { delete store[name] },
    clr: () => { store = {} },
  }
}

const serverSearch = genCache()

const init = (config) => {
  if (typeof config.query !== 'object') {
    throw new TypeError('config.query needs to be an object')
  }
  serverSearch.wrt(config.query)
}

module.exports = {
  init,
  serverSearch,
}
