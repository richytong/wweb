const queryString = require('query-string')
const { serverSearch } = require('./singleton')
const { genRelUrl } = require('./url')

const get = (name) => {
  if (!name) return null
  if (typeof window !== 'object') return serverSearch.get(name)
  if (!window.location.search) return null
  const searchObj = queryString.parse(window.location.search)
  return searchObj[name] || null
}

const getAll = () => {
  if (typeof window !== 'object') return serverSearch.gta()
  if (!window.location.search) return {}
  return queryString.parse(window.location.search)
}

const set = (name, value) => {
  if (!name || !value) return
  if (typeof window !== 'object') {
    serverSearch.set(name, value)
    return
  }
  const searchObj = queryString.parse(window.location.search)
  searchObj[name] = value
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, queryString.stringify(searchObj), hash)
  window.history.pushState({ pathname, hash, search: searchObj }, '', relUrl)
}

const update = (searchObj) => {
  if (!searchObj) return
  if (typeof window !== 'object') {
    serverSearch.wrt(obj)
    return
  }
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, queryString.stringify(searchObj), hash)
  window.history.pushState({ pathname, hash, search: searchObj }, '', relUrl)
}

const remove = (name) => {
  if (!name) return
  if (typeof window !== 'object') {
    serverSearch.del(name)
    return
  }
  if (!window.location.search) return
  const searchObj = queryString.parse(window.location.search)
  delete searchObj[name]
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, queryString.stringify(searchObj), hash)
  window.history.pushState({ pathname, hash, search: searchObj }, '', relUrl)
}

const clear = () => {
  if (typeof window !== 'object') {
    serverSearch.clr()
    return
  }
  if (!window.location.search) return
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, '', hash)
  window.history.pushState({ pathname, hash, search: {} }, '', relUrl)
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
