# wweb
Simple, isomorphic interface around common Web APIs. Perfect for intuitively interacting with your browser. Tired of using `window`? Don't know/care if you're in SERVER or BROWSER? This may interest you.

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

// redirect to myawesomewebsite.com
wweb.redirect('https://myawesomewebsite.com')

// gets the current page from query params ?my_query_param=something
const myQueryParam = wweb.search.get('my_query_param')

// gets entire search query as an object
const search = wweb.search.getAll()

// removes my_query_param from the query params
wweb.search.remove('my_query_param')

// clears entire search query
wweb.search.removeAll()
wweb.search.clear()

// gets my_cookie from the document cookies
const myCookie = wweb.cookies.get('my_cookie')

// gets all cookies from document
const cookies = wweb.cookies.getAll()

// removes my_cookie from the document cookies
wweb.cookies.remove('my_cookie')

// clears all cookies from document
wweb.cookies.removeAll()
wweb.cookies.clear()
```

# License/Author
<b>wweb</b> © [richytong](https://github.com/richytong)

Created and maintained by richytong.
