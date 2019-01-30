const nodewweb = require('./nodewweb')
const browserwweb = require('./browserwweb')

const isNode = (
  typeof process !== 'undefined'
    && Object.prototype.toString.call(process) === '[object proces]'
)

module.exports = isNode ? nodewweb : browserwweb
