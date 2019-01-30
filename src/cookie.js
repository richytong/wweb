const cookie = require('cookie')
const { serverCookie } = require('./singleton')

const isDef = v => typeof v !== 'undefined' && v !== null

const get = (name) => {
  if (!name) return null
  if (typeof window !== 'object') return serverCookie.get(name)
  if (!window.document.cookie) return null
  const cookieObj = cookie.parse(window.document.cookie)
  return cookieObj[name] || null
}

const getAll = () => {
  if (typeof window !== 'object') return serverCookie.gta()
  if (!window.document.cookie) return {}
  return cookie.parse(window.document.cookie)
}

const set = (name, value, opts) => {
  if (!name || !isDef(value)) return
  if (typeof window !== 'object') {
    serverCookie.set(name, value)
    return
  }
  const cookieOpts = {}
  if (opts.ttl) cookieOpts.expires = new Date(Date.now() + ttl)
  const serialCookie = cookie.serialize(name, value, cookieOpts)
  window.document.cookie = serialCookie
}

const update = (cookieObj) => {
  if (!cookieObj) return
  if (typeof window !== 'object') {
    serverCookie.wrt(cookieObj)
    return
  }
  const currentCookieObj = cookie.parse(window.document.cookie)
  Object.keys(currentCookieObj).forEach((name) => {
    const cookieOpts = { expires: new Date(Date.now() - 86400000) }
    const serialCookie = cookie.serialize(name, '', cookieOpts)
    window.document.cookie = serialCookie
  })
  Object.keys(cookieObj).forEach((name) => {
    const serialCookie = cookie.serialize(name, value)
    window.document.cookie = serialCookie
  })
}

const remove = (name) => {
  if (!name) return
  if (typeof window !== 'object') {
    serverCookie.del(name)
    return
  }
  const cookieOpts = { expires: new Date(Date.now() - 86400000) }
  const serialCookie = cookie.serialize(name, '', cookieOpts)
  window.document.cookie = serialCookie
}

const clear = () => {
  if (typeof window !== 'object') {
    serverCookie.wrt(cookieObj)
    return
  }
  const currentCookieObj = cookie.parse(window.document.cookie)
  Object.keys(currentCookieObj).forEach((name) => {
    const cookieOpts = { expires: new Date(Date.now() - 86400000) }
    const serialCookie = cookie.serialize(name, '', cookieOpts)
    window.document.cookie = serialCookie
  })
}

module.exports = {
  get,
  getAll,
  set,
  update,
  remove,
  clear,
}
