const nodewweb = require('./nodewweb')
const browserwweb = require('./browserwweb')

const isNode = (
  typeof process !== 'undefined'
    && Object.prototype.toString.call(process) === '[object process]'
)

module.exports = isNode ? nodewweb : browserwweb
