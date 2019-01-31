const get = name => window.localStorage.getItem(name)

const getAll = () => Object.assign({}, window.localStorage)

const set = (name, value) => {
  window.localStorage.setItem(name, value)
}

const update = (store) => {
  if (!store) return
  window.localStorage.clear()
  Object.keys(store).forEach((name) => {
    window.localStorage.setItem(name, store[name])
  })
}

const remove = (name) => {
  window.localStorage.removeItem(name)
}

const clear = () => {
  window.localStorage.clear()
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
