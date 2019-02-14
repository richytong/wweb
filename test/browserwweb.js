const assert = require('assert')
const wweb = require('../src/browserwweb')
const stubWindow = require('./stubWindow')

const fixtureCookie = 'foo=bar; baz=qux;'
const fixtureCookieObj = { foo: 'bar', baz: 'qux' }

afterEach((done) => {
  global.window = undefined
  done()
})

describe('browserwweb.redirect', () => {
  it('calls window.location.replace with same argument passed in', (done) => {
    stubWindow()
    const url = 'https://myawesomewebsite.com'
    wweb.redirect(url)
    assert(window.location.replace.calledOnce)
    assert(window.location.replace.calledWith(url))
    done()
  })
})

describe('browserwweb.cookie.get', () => {
  it('gets a cookie by name', (done) => {
    stubWindow({ cookie: fixtureCookie })
    const c = wweb.cookie.get('foo')
    assert.strictEqual(c, fixtureCookieObj.foo)
    done()
  })

  it('returns null if cookie not found', (done) => {
    stubWindow({ cookie: fixtureCookie })
    const c = wweb.cookie.get('hey')
    assert.strictEqual(c, null)
    done()
  })

  it('returns null if falsy name', (done) => {
    stubWindow({ cookie: fixtureCookie })
    const c = wweb.cookie.get()
    assert.strictEqual(c, null)
    done()
  })

  it('returns null if empty document.cookie', (done) => {
    stubWindow()
    const c = wweb.cookie.get('foo')
    assert.strictEqual(c, null)
    done()
  })
})

describe('browserwweb.cookie.getAll', () => {
  it('gets all cookies for current document as an object', (done) => {
    stubWindow({ cookie: fixtureCookie })
    const cookieObj = wweb.cookie.getAll()
    assert.deepEqual(cookieObj, fixtureCookieObj)
    done()
  })

  it('returns empty object if empty document.cookie', (done) => {
    stubWindow()
    const cookieObj = wweb.cookie.getAll()
    assert.deepEqual(cookieObj, {})
    done()
  })
})

describe('browserwweb.cookie.set', () => {
  it('adds a cookie to document cookies', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.set('aaa', 'bbb')
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    const { args } = cookieSetterSpy.lastCall
    assert.strictEqual(args[0], 'aaa=bbb')
    done()
  })

  it('noops if falsy name', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.set('', 'bbb')
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.notCalled)
    done()
  })

  it('noops if undefined value', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.set('aaa')
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.notCalled)
    done()
  })
})

describe('browserwweb.cookie.update', () => {
  it('updates document cookies to match cookie object passed in', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.update({ hey: 'sup' })
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.calledThrice)
    assert.strictEqual(cookieSetterSpy.lastCall.args[0], 'hey=sup')
    done()
  })

  it('noops if undefined cookieObj', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.update()
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.notCalled)
    done()
  })
})

describe('browserwweb.cookie.remove', () => {
  it('removes a cookie by name', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.remove('foo')
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.lastCall.args[0].startsWith('foo'))
    done()
  })

  it('noops if name falsy', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.remove()
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.notCalled)
    done()
  })
})

describe('browserwweb.cookie.clear', () => {
  it('clears all cookies for current document', (done) => {
    stubWindow({ cookie: fixtureCookie })
    wweb.cookie.clear()
    const cookieSetterSpy = (
      Object
        .getOwnPropertyDescriptor(window.Document.prototype, 'cookie')
        .set
    )
    assert(cookieSetterSpy.calledTwice)
    done()
  })
})

describe('browserwweb.localStorage.get', () => {
  it('calls window.localStorage.getItem', (done) => {
    stubWindow()
    wweb.localStorage.get('hey')
    assert(window.localStorage.getItem.calledOnce)
    assert.strictEqual(window.localStorage.getItem.lastCall.args[0], 'hey')
    done()
  })
})

describe('browserwweb.localStorage.getAll', () => {
  it('gets all localStorage entries as an object', (done) => {
    stubWindow()
    const store = wweb.localStorage.getAll()
    assert.strictEqual(typeof store, 'object')
    done()
  })
})

describe('browserwweb.localStorage.set', () => {
  it('calls window.localStorage.setItem', (done) => {
    stubWindow()
    wweb.localStorage.set('foo', 'bar')
    assert(window.localStorage.setItem.calledOnce)
    assert.strictEqual(window.localStorage.setItem.lastCall.args[0], 'foo')
    assert.strictEqual(window.localStorage.setItem.lastCall.args[1], 'bar')
    done()
  })
})

describe('browserwweb.localStorage.update', () => {
  it('updates entire localStorage according to object passed in', (done) => {
    stubWindow()
    wweb.localStorage.update({ foo: 'bar', baz: 'qux' })
    assert(window.localStorage.clear.calledOnce)
    assert(window.localStorage.setItem.calledTwice)
    done()
  })

  it('noops if falsy store', (done) => {
    stubWindow()
    wweb.localStorage.update()
    assert(window.localStorage.clear.notCalled)
    assert(window.localStorage.setItem.notCalled)
    done()
  })
})

describe('browserwweb.localStorage.remove', () => {
  it('calls window.localStorage.removeItem', (done) => {
    stubWindow()
    wweb.localStorage.remove('foo')
    assert(window.localStorage.removeItem.calledOnce)
    done()
  })
})

describe('browserwweb.localStorage.clear', () => {
  it('calls window.localStorage.clear', (done) => {
    stubWindow()
    wweb.localStorage.clear()
    assert(window.localStorage.clear.calledOnce)
    done()
  })
})
