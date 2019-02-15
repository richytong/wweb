const assert = require('assert')
const qsarr = require('../src/query-string-arr')

const { parse } = qsarr

describe('parse to array', () => {
  it('returns empty array if input is not a string', (done) => {
    const notStr = 123
    assert.deepStrictEqual(parse(notStr, { array: true }), [])
    done()
  })
  it('returns empty array if string = ?', (done) => {
    const str = '?'
    assert.deepStrictEqual(parse(str, { array: true }), [])
    done()
  })
  it('turns string to array', (done) => {
    const arr = [['a', '1']]
    const str = '?a=1'
    assert.deepStrictEqual(parse(str, { array: true }), arr)
    done()
  })
  it('turns string to array w/ 2 values', (done) => {
    const arr = [['z', '10'], ['a', '1']]
    const str = '?z=10&a=1'
    assert.deepStrictEqual(parse(str, { array: true }), arr)
    done()
  })
  it('returns 3d array if string has repeats', (done) => {
    const str = '?a=1&a=2&a=3&b=5'
    const arr = [['a', ['1', '2', '3']], ['b', '5']]
    assert.deepStrictEqual(parse(str, { array: true }), arr)
    done()
  })
})

describe('parse to object', () => {
  it('returns empty object if not string', (done) => {
    const notStr = 123
    assert.deepStrictEqual(parse(notStr), {})
    done()
  })
  it('returns empty object if string = ?', (done) => {
    const str = '?'
    assert.deepStrictEqual(parse(str), {})
    done()
  })
  it('turns string to object', (done) => {
    const obj = { a: '1' }
    const str = '?a=1'
    assert.deepEqual(parse(str), obj)
    done()
  })
  it('turns string to object w/ 2 values', (done) => {
    const obj = { a: '1', z: '10' }
    const str = '?z=10&a=1'
    assert.deepEqual(parse(str), obj)
    done()
  })
  it('returns array as value if string has repeats', (done) => {
    const str = '?a=1&a=2&a=3&b=5'
    const obj = { a: ['1', '2', '3'], b: '5' }
    assert.deepEqual(parse(str), obj)
    done()
  })
})
