# wweb
Simple, isomorphic interface around common Web APIs. Perfect for intuitively interacting with your browser. Tired of checking for `window`? This may interest you.

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
  wweb.init(req) // parse cookies, search query params, and more from SSR
  // ...
})

/* anywhere.jsx? */
const wweb = require('wweb')

// redirect to myawesomewebsite.com
wweb.redirect('https://myawesomewebsite.com')

// gets the current page from query params ?my_query_param=something
const myQueryParam = wweb.getSearchQueryParam('my_query_param')

// gets entire search query as an object
const searchQuery = wweb.getSearchQuery()

// removes my_query_param from the query params
wweb.clearSearchQueryParam('my_query_param')

// clears entire search query
wweb.clearSearchQuery()

// gets my_cookie from the document cookies
const myCookie = wweb.getCookie('my_cookie')

// gets all cookies from document
const cookies = wweb.getCookies()

// clears my_cookie from the document cookies
wweb.clearCookie('my_cookie')

// clears all cookies from document
wweb.clearCookies()
```

# License/Author
<b>wweb</b> © [richytong](https://github.com/richytong)

Created and maintained by richytong.
