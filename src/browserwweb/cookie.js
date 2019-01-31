const cookie = require('cookie')

const isDef = v => typeof v !== 'undefined' && v !== null

// acts like window.document.cookie,
// in fact we're referencing the implementation directly
// do yourself a favor and never use getters/setters
const _cookieGetter = () => (
  Object
    .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
    .get.bind(window.document)
)()

// acts like window.document.cookie = 'foo=bar'
// also references the direct implementation
const _cookieSetter = fmtCookie => (
  Object
    .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
    .set.bind(window.document)
)(fmtCookie)

const _setCookie = (name, value, opts) => {
  const serialCookie = cookie.serialize(name, value, opts)
  _cookieSetter(serialCookie)
}

const _removeCookie = (name) => {
  const cookieOpts = { expires: new Date(Date.now() - 86400000) }
  const serialCookie = cookie.serialize(name, '', cookieOpts)
  _cookieSetter(serialCookie)
}

const get = (name) => {
  if (!name) return null
  if (!window.document.cookie) return null
  const cookieObj = cookie.parse(_cookieGetter())
  return cookieObj[name] || null
}

const getAll = () => {
  if (!window.document.cookie) return {}
  return cookie.parse(_cookieGetter())
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
