const assert = require('assert')
const wweb = require('../src/browserwweb')
const stubWindow = require('./stubWindow')
const arrToObj = require('./arrToObj')

const fixtureQS = '?foo=bar&baz=qux'
const fixtureSearchObj = { foo: 'bar', baz: 'qux' }
const fixtureCookie = 'foo=bar; baz=qux;'
const fixtureCookieObj = { foo: 'bar', baz: 'qux' }

afterEach((done) => {
  global.window = undefined
  done()
})

describe('browserwweb.search.get', () => {
  it('gets a search param by name', (done) => {
    stubWindow({ search: fixtureQS })
    const v = wweb.search.get('foo')
    assert.strictEqual(v, 'bar')
    done()
  })

  it('returns null if falsy name', (done) => {
    stubWindow({ search: fixtureQS })
    const v = wweb.search.get()
    assert.strictEqual(v, null)
    done()
  })

  it('returns null if name not found in querystring', (done) => {
    stubWindow({ search: fixtureQS })
    const v = wweb.search.get('dne')
    assert.strictEqual(v, null)
    done()
  })

  it('returns null if empty querystring', (done) => {
    stubWindow()
    const v = wweb.search.get('anything')
    assert.strictEqual(v, null)
    done()
  })
})

describe('browserwweb.search.getAll', () => {
  it('gets all the search query params as a parsed object', (done) => {
    stubWindow({ search: fixtureQS })
    const searchObj = wweb.search.getAll()
    assert.deepEqual(searchObj, fixtureSearchObj)
    done()
  })

  it('returns empty object if empty querystring', (done) => {
    stubWindow()
    const searchObj = wweb.search.getAll()
    assert.deepEqual(searchObj, {})
    done()
  })
})

describe('browserwweb.search.set', () => {
  it('adds a query parameter to the query string', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.set('aaa', 'bbb')
    const { args } = window.history.pushState.lastCall
    const obj = arrToObj(args[0].search)
    assert.deepEqual(obj, { ...fixtureSearchObj, aaa: 'bbb' })
    done()
  })

  it('noops if falsy name', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.set('', 'hey')
    assert(window.history.pushState.notCalled)
    done()
  })

  it('noops if undefined value', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.set('hey')
    assert(window.history.pushState.notCalled)
    done()
  })

  it('noops if null value', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.set('hey', null)
    assert(window.history.pushState.notCalled)
    done()
  })
})

describe('browserwweb.search.update', () => {
  it('replaces the query string', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.update({ hey: 'sup' })
    const { args } = window.history.pushState.lastCall
    assert.deepEqual(args[0].search, { hey: 'sup' })
    done()
  })

  it('noops if falsy searchObj', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.update()
    assert(window.history.pushState.notCalled)
    done()
  })
})

describe('browserwweb.search.remove', () => {
  it('removes a query parameter from the query string', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.remove('foo')
    const { args } = window.history.pushState.lastCall
    const { foo, ...rest } = fixtureSearchObj
    const obj = arrToObj(args[0].search)
    assert.deepEqual(obj, rest)
    done()
  })

  it('noops if falsy name', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.remove()
    assert(window.history.pushState.notCalled)
    done()
  })

  it('noops if empty querystring', (done) => {
    stubWindow()
    wweb.search.remove('foo')
    assert(window.history.pushState.notCalled)
    done()
  })
})

describe('browserwweb.search.clear', () => {
  it('clears the query string', (done) => {
    stubWindow({ search: fixtureQS })
    wweb.search.clear()
    const { args } = window.history.pushState.lastCall
    assert.deepEqual(args[0].search, {})
    done()
  })

  it('noops if empty querystring', (done) => {
    stubWindow()
    wweb.search.clear()
    assert(window.history.pushState.notCalled)
    done()
  })
})
