const search = require('./search')
const cookie = require('./cookie')

const redirect = (url) => {
  if (!url) return
  window.location.replace(url)
}

module.exports = {
  init: () => {},
  redirect,
  search,
  cookie,
}
