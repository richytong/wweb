const search = require('./search')
const cookie = require('./cookie')
const localStorage = require('./localStorage')

const redirect = (url) => {
  if (!url) return
  window.location.replace(url)
}

module.exports = {
  init: () => {},
  redirect,
  search,
  cookie,
  localStorage,
}
