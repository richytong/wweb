const cleanHash = (hash) => {
  const dirtyHashPos = hash.indexOf('?')
  if (dirtyHashPos > -1) return hash.slice(0, dirtyHashPos)
  return hash
}

const fmtQS = qs => (qs ? `?${qs}` : '')

const genRelUrl = (pathname, qs, hash) => `${pathname}${fmtQS(qs)}${cleanHash(hash)}`

module.exports = genRelUrl
