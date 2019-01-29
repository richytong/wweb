# wweb
Simple, isomorphic interface around common Web APIs, perfect for intuitively interacting with your browser. Built for modern browsers. Tired of using `window`? Don't know/care if you're in SERVER or BROWSER? This may interest you.

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
  wweb.init({
    query: req.query, // query object made from parsed query string
    cookies: req.cookies, // cookies object made from parsed Cookies header <- you'll need middleware if you use express
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

wweb.cookies.clear()
console.log(window.document.cookie)
// => ''
```

# License
<b>wweb</b> © [richytong](https://github.com/richytong)
