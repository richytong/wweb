const { init } = require('./singleton')
const search = require('./search')

const redirect = (url) => {
  if (typeof window !== 'object') return
  window.location.replace(url)
}

module.exports = {
  init,
  redirect,
  search,
}
