const queryString = require('query-string')

let SERVER_SEARCH = {}

const cleanHash = (hash) => {
  const dirtyHashPos = hash.indexOf('?')
  if (dirtyHashPos > -1) return hash.slice(0, dirtyHashPos)
  return hash
}

const generateRelativeUrl = (pathname, qs, hash) => `${pathname}?${qs}${cleanHash(hash)}`

module.exports = {
  init: (config) => {
    if (typeof config.query !== 'object') {
      throw new TypeError('config.query needs to be an object')
    }
    SERVER_SEARCH = { ...config.query }
  },
  redirect: (url) => {
    if (typeof window !== 'object') return
    window.location.replace(url)
  },
  search: {
    get: (name) => {
      if (!name) return null
      if (typeof window !== 'object') return SERVER_SEARCH[name] || null
      if (!window.location.search) return null
      const searchObj = queryString.parse(window.location.search)
      return searchObj[name] || null
    },
    getAll: () => {
      if (typeof window !== 'object') return SERVER_SEARCH
      if (!window.location.search) return {}
      return queryString.parse(window.location.search)
    },
    set: (name, value) => {
      if (!name || !value) return
      if (typeof window !== 'object') {
        SERVER_SEARCH[name] = value
        return
      }
      const searchObj = queryString.parse(window.location.search)
      searchObj[name] = value
      const relUrl = generateRelativeUrl(
        window.location.pathname,
        queryString.stringify(searchObj),
        window.location.hash,
      )
      window.history.pushState({}, '', relUrl)
    },
    remove: (name) => {
      if (!name) return
      if (typeof window !== 'object') {
        delete SERVER_SEARCH[name]
        return
      }
      if (!window.location.search) return
      const searchObj = queryString.parse(window.location.search)
      delete searchObj[name]
      const relUrl = generateRelativeUrl(
        window.location.pathname,
        queryString.stringify(searchObj),
        window.location.hash,
      )
      window.history.pushState({}, '', relUrl)
    },
    clear: () => {
      if (typeof window !== 'object') {
        SERVER_SEARCH = {}
        return
      }
      if (!window.location.search) return
      const relUrl = generateRelativeUrl(
        window.location.pathname,
        '',
        window.location.hash,
      )
      window.history.pushState({}, '', relUrl)
    },
  },
}
