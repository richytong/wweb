const queryString = require('query-string')
const { serverSearch } = require('./singleton')
const { genRelUrl } = require('./url')

const isDef = v => typeof v !== 'undefined' && v !== null

const _updateWindowQueryStringFromSearchObj = (searchObj) => {
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, queryString.stringify(searchObj), hash)
  window.history.pushState({ pathname, hash, search: searchObj }, '', relUrl)
}

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
  if (!name || !isDef(value)) return
  if (typeof window !== 'object') {
    serverSearch.set(name, value)
    return
  }
  const searchObj = queryString.parse(window.location.search)
  searchObj[name] = value
  _updateWindowQueryStringFromSearchObj(searchObj)
}

const update = (searchObj) => {
  if (!searchObj) return
  if (typeof window !== 'object') {
    serverSearch.wrt(searchObj)
    return
  }
  _updateWindowQueryStringFromSearchObj(searchObj)
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
  _updateWindowQueryStringFromSearchObj(searchObj)
}

const clear = () => {
  if (typeof window !== 'object') {
    serverSearch.clr()
    return
  }
  if (!window.location.search) return
  _updateWindowQueryStringFromSearchObj({})
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
