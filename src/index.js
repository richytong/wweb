const { init } = require('./singleton')
const search = require('./search')
const cookie = require('./cookie')

const redirect = (url) => {
  if (typeof window !== 'object') return
  window.location.replace(url)
}

module.exports = {
  init,
  redirect,
  search,
  cookie,
}
