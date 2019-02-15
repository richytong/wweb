const assert = require('assert')
const qsarr = require('../src/query-string-arr')

const { stringify } = qsarr

describe('stringify', () => {
  it('turns empty array to string', (done) => {
    const arr = []
    const str = ''
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array w/ 1 value to string', (done) => {
    const arr = [['a', '5']]
    const str = 'a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array w/ 2 values to string', (done) => {
    const arr = [['d', '1'], ['a', '5']]
    const str = 'd=1&a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array w/ 3 values to string', (done) => {
    const arr = [['m', 20], ['d', '1'], ['a', '5']]
    const str = 'm=20&d=1&a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
})

describe('stringify with objects', () => {
  it('turns empty obj to string', (done) => {
    const obj = {}
    const str = ''
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj w/ 1 key-value pair to string', (done) => {
    const obj = { a: '5' }
    const str = 'a=5'
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj w/ 2 key-value pairs to string', (done) => {
    const obj = { d: '1', a: '5' }
    const str = 'a=5&d=1'
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj w/ 3 key-value pairs to string', (done) => {
    const obj = { d: '1', z: 10, a: '5' }
    const str = 'a=5&d=1&z=10'
    assert.strictEqual(stringify(obj), str)
    done()
  })
})
