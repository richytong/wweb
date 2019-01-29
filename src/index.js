let SERVER_SEARCH = {}

module.exports = {
  init: (config) => {
    if (typeof config.query !== 'object') {
      throw new TypeError('config.query needs to be an object')
    }
    SERVER_SEARCH = { ...config.query }
  },
  redirect: (url) => {
    if (typeof window !== 'object') return
    window.location = url
  },
  search: {
    get: (name) => {
      if (!name) return null
      if (typeof window !== 'object') return SERVER_SEARCH[name] || null
      if (!window.location.search) return null
      const eqpairs = decodeURIComponent(window.location.search).slice(1).split('&')
      for (let i = 0; i < eqpairs.length; i++) {
        const [sname, sval] = eqpairs[i].split('=')
        if (sname === name) return sval
      }
      return null
    },
    getAll: () => {
      if (typeof window !== 'object') return SERVER_SEARCH
      if (!window.location.search) return {}
      const searchObj = {}
      const eqpairs = decodeURIComponent(window.location.search).slice(1).split('&')
      for (let i = 0; i < eqpairs.length; i++) {
        const [sname, sval] = eqpairs[i].split('=')
        searchObj[sname] = sval
      }
      return searchObj
    },
  },
}
