const cookie = require('cookie')

const isDef = v => typeof v !== 'undefined' && v !== null

const _setCookie = (name, value, opts) => {
  const serialCookie = cookie.serialize(name, value, opts)
  window.document.cookie = serialCookie
}

const _removeCookie = (name) => {
  const cookieOpts = { expires: new Date(Date.now() - 86400000) }
  const serialCookie = cookie.serialize(name, '', cookieOpts)
  window.document.cookie = serialCookie
}

const get = (name) => {
  if (!name) return null
  if (!window.document.cookie) return null
  const cookieObj = cookie.parse(window.document.cookie)
  return cookieObj[name] || null
}

const getAll = () => {
  if (!window.document.cookie) return {}
  return cookie.parse(window.document.cookie)
}

const set = (name, value, opts) => {
  if (!name || !isDef(value)) return
  _setCookie(name, value, opts)
}

const update = (cookieObj) => {
  if (!cookieObj) return
  const currentCookieObj = cookie.parse(window.document.cookie)
  Object.keys(currentCookieObj).forEach(_removeCookie)
  Object.keys(cookieObj).forEach((name) => {
    _setCookie(name, cookieObj[name])
  })
}

const remove = (name) => {
  if (!name) return
  _removeCookie(name)
}

const clear = () => {
  const currentCookieObj = cookie.parse(window.document.cookie)
  Object.keys(currentCookieObj).forEach(_removeCookie)
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
