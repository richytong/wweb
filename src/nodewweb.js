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

module.exports = {
  redirect: () => {},
  search,
  cookie,
  localStorage,
}
