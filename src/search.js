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
  const relUrl = genRelUrl(
    window.location.pathname,
    queryString.stringify(searchObj),
    window.location.hash,
  )
  window.history.pushState({}, '', relUrl)
}

const update = (searchObj) => {
  if (!qs) return
  if (typeof window !== 'object') {
    serverSearch.wrt(obj)
    return
  }
  const relUrl = genRelUrl(
    window.location.pathname,
    queryString.stringify(searchObj),
    window.location.hash,
  )
  window.history.pushState({}, '', relUrl)
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
  const relUrl = genRelUrl(
    window.location.pathname,
    queryString.stringify(searchObj),
    window.location.hash,
  )
  window.history.pushState({}, '', relUrl)
}

const clear = () => {
  if (typeof window !== 'object') {
    serverSearch.clr()
    return
  }
  if (!window.location.search) return
  const relUrl = genRelUrl(
    window.location.pathname,
    '',
    window.location.hash,
  )
  window.history.pushState({}, '', relUrl)
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}