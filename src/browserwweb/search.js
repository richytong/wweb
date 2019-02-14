const queryString = require('../query-string-arr')
const genRelUrl = require('./genRelUrl')

const isDef = v => typeof v !== 'undefined' && v !== null

const _updateQueryString = (searchObj) => {
  const { pathname, hash } = window.location
  const relUrl = genRelUrl(pathname, queryString.stringify(searchObj), hash)
  window.history.pushState({ pathname, hash, search: searchObj }, '', relUrl)
}

const get = (name) => {
  if (!name) return null
  if (!window.location.search) return null
  const searchObj = queryString.parse(window.location.search)
  return searchObj[name] || null
}

const getAll = () => {
  if (!window.location.search) return {}
  return queryString.parse(window.location.search)
}

const set = (name, value) => {
  if (!name || !isDef(value)) return
  const searchArr= queryString.parse(window.location.search, { array: true })
  searchArr.push([name, value])
  _updateQueryString(searchArr)
}

const update = (searchObj) => {
  if (!searchObj) return
  _updateQueryString(searchObj)
}

const remove = (name) => {
  if (!name) return
  if (!window.location.search) return
  const searchArr = queryString.parse(window.location.search, { array: true })
  for (let i = 0; i < searchArr.length; i++) {
    if (searchArr[i][0] == name) {
      searchArr.splice(i,1)
    }
  }
  _updateQueryString(searchArr)
}

const clear = () => {
  if (!window.location.search) return
  _updateQueryString({})
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
