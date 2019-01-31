# wweb
Tired of using `window`? Don't know if you're in SERVER or BROWSER? Didn't know you needed a consistent api across common places you put stuff like the search query, cookies, or localStorage? Maybe try wweb

wweb is a library designed for isomorphic webapps so that you can stop checking if `typeof window !== 'undefined'`. wweb is built around Web APIs that expose the same interfaces over `location.search`, `localStorage`, and `document.cookie` so you can forget about getters and setters and maybe even `window`. wweb assumes that your browser or your users' browsers have web APIs. Finally, wweb supports node all the way back to 4.9.1.

# Installation
```bash
$ npm install wweb
```

# Usage
```javascript
/* server.js */
const wweb = require('wweb')

const app = yourWebAppFrameworkHere()

app.get('/*', (req, res) => {
  // you need to init wweb in your server.js file
  // so it knows query params and cookies during SSR
  wweb.init({
    search: req.query, // query object made from parsed query string
    cookie: req.cookies, // cookies object made from parsed Cookies header <- you'll need middleware if you use express
    // ^ express does not parse these automatically for you so you need some middleware like cookie-parser
  })
  // ...
})

/* anywhere.jsx? */
const wweb = require('wweb')

wweb.redirect('https://myawesomewebsite.com')
// redirects to myawesomewebsite.com, same as window.location = '...'

console.log(window.location.search)
// => '?foo=bar'

const myQueryParam = wweb.search.get('foo')
// => 'bar'

const search = wweb.search.getAll()
// => { foo: 'bar' }

wweb.search.remove('foo')
console.log(window.location.search)
// => ''

wweb.search.set('foo', 'bar')
wweb.search.set('baz', 'qux')
console.log(window.location.search)
// => '?foo=bar&baz=qux'

wweb.search.update('quux', 'quuz')
console.log(window.location.search)
// => '?quux=quuz'

wweb.search.clear()
console.log(window.location.search)
// => ''

console.log(window.document.cookie)
// => 'foo=bar; baz=qux'

const myCookie = wweb.cookies.get('foo')
// => 'bar'

const cookies = wweb.cookies.getAll()
// => { foo: 'bar', baz: 'qux' }

wweb.cookies.remove('foo')
console.log(window.document.cookie)
// => 'baz=qux'

wweb.cookies.set('foo', 'bar')
console.log(window.document.cookie)
// => 'foo=bar; baz=qux'

wweb.cookies.update('quux', 'quuz')
console.log(window.document.cookie)
// => 'quux=quuz'

wweb.cookies.clear()
console.log(window.document.cookie)
// => ''

wweb.localStorage.update({ foo: 'bar' })
console.log({ ...window.localStorage })
// => { foo: 'bar' }

wweb.localStorage.get('foo')
// => 'bar'

wweb.localStorage.set('quux', 'quuz')
console.log({ ...window.localStorage })
// => { foo: 'bar', quux: 'quuz' }

wweb.localStorage.remove('quux')
console.log({ ...window.localStorage })
// => { foo: 'bar' }

wweb.lcoalStorage.clear()
console.log({ ...window.localStorage })
// => {}
```

# API
<h1>wweb.redirect(url)</h1>
Redirects you to url. Same thing as using window.location = url

Example:
```javascript
wweb.redirect('https://example.com')
```

<h1>wweb.search.get(name)</h1>
Gets a search parameter by name from the search query in the browser or req.query in the server. Returns null if parameter not found

Example:
```javascript
const foo = wweb.search.get('foo')
```

<h1>wweb.search.getAll(name)</h1>
Gets all search parameters in the form of an object.

Example:
```javascript
const searchObj = wweb.search.getAll()
```

<h1>wweb.search.set(name, value)</h1>
Adds or updates a search parameter 

Example:
```javascript
wweb.search.set('foo', 'bar')
```

<h1>wweb.search.update(obj)</h1>
Updates entire search to represent obj

Example:
```javascript
wweb.search.update({ foo: 'bar' })
```

<h1>wweb.search.clear()</h1>
Clears the search query

Example:
```javascript
wweb.search.clear()
```

<h1>wweb.cookie.get(name)</h1>
Gets a cookie by name from the document or req.cookies in the server. Returns null if parameter not found

Example:
```javascript
const foo = wweb.cookie.get('foo')
```

<h1>wweb.cookie.getAll(name)</h1>
Gets all cookie names and their values in the form of an object

Example:
```javascript
const cookieObj = wweb.cookie.getAll()
```

<h1>wweb.cookie.set(name, value, opts)</h1>
Adds or updates a cookie. [opts](https://www.npmjs.com/package/cookie#options)

Example:
```javascript
wweb.cookie.set('foo', 'bar')
```

<h1>wweb.cookie.update(obj)</h1>
Updates all cookies in document to represent obj. There is no support for options for this at the moment

Example:
```javascript
wweb.cookie.update({ foo: 'bar' })
```

<h1>wweb.cookie.clear()</h1>
Clears all cookies in document

Example:
```javascript
wweb.cookie.clear()
```

<h1>wweb.localStorage.get(name)</h1>
Gets an item by name in localStorage. Returns null if not found

Example:
```javascript
const foo = wweb.localStorage.get('foo')
```

<h1>wweb.localStorage.getAll(name)</h1>
Gets all items in localStorage in the form of an object

Example:
```javascript
const store = wweb.localStorage.getAll()
```

<h1>wweb.localStorage.set(name, value)</h1>
Adds or updates an item in localStorage

Example:
```javascript
wweb.localStorage.set('foo', 'bar')
```

<h1>wweb.localStorage.update(obj)</h1>
Updates all items in localStorage to represent obj

Example:
```javascript
wweb.localStorage.update({ foo: 'bar' })
```

<h1>wweb.localStorage.clear()</h1>
Clears all items in localStorage

Example:
```javascript
wweb.localStorage.clear()
```

# Notes
Don't see your favorite web storage mechanism? Raise an [issue](https://github.com/richytong/wweb/issues/new)

# License
<b>wweb</b> © [richytong](https://github.com/richytong)
