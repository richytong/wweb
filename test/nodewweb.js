const assert = require('assert')
const wweb = require('../src/nodewweb')

const configFixture = {
  search: {
    foo: 'bar',
    baz: 'qux',
  },
  cookie: {
    a: 'b',
    c: 'd',
  },
}

describe('nodewweb.*.<method>', () => {
  it('integration', (done) => {
    wweb.search.update(configFixture.search)
    assert.deepEqual(wweb.search.getAll(), configFixture.search)
    assert.strictEqual(wweb.search.get('foo'), 'bar')
    wweb.search.set('hey', 'ho')
    assert.strictEqual(wweb.search.get('hey'), 'ho')
    wweb.search.remove('hey')
    assert.deepEqual(wweb.search.getAll(), configFixture.search)
    wweb.search.clear()
    assert.deepEqual(wweb.search.getAll(), {})
    done()
  })
})

describe('nodewweb.search', () => {
  it('has the same api as browserwweb.search', (done) => {
    const api = Object.keys(wweb.search)
    assert(api.includes('get'))
    assert(api.includes('getAll'))
    assert(api.includes('set'))
    assert(api.includes('update'))
    assert(api.includes('remove'))
    assert(api.includes('clear'))
    done()
  })
})

describe('nodewweb.cookie', () => {
  it('has the same api as browserwweb.cookie', (done) => {
    const api = Object.keys(wweb.cookie)
    assert(api.includes('get'))
    assert(api.includes('getAll'))
    assert(api.includes('set'))
    assert(api.includes('update'))
    assert(api.includes('remove'))
    assert(api.includes('clear'))
    done()
  })
})

describe('nodewweb.localStorage', () => {
  it('has the same api as browserwweb.localStorage', (done) => {
    const api = Object.keys(wweb.localStorage)
    assert(api.includes('get'))
    assert(api.includes('getAll'))
    assert(api.includes('set'))
    assert(api.includes('update'))
    assert(api.includes('remove'))
    assert(api.includes('clear'))
    done()
  })
})
