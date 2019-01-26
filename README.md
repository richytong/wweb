# wweb
Simple, isomorphic interface around common Web APIs. Perfect for intuitively interacting with your browser. Tired of checking for `window`? This may interest you.

# Installation
```bash
$ npm install wweb
```

# Usage
```javascript
// server.js
const wweb = require('wweb')

const app = yourWebAppFrameworkHere()

app.get('/*', (req, res) => {
  wweb.init(req) // parse cookies, search query params, and more from SSR
  // ...
})

// anywhere.jsx?
const wweb = require('wweb')

wweb.redirect('https://myawesomewebsite.com') // redirect to myawesomewebsite.com

const myQueryParam = wweb.getSearchQueryParam('my_query_param') // gets the current page from query params ?my_query_param=something

const searchQuery = wweb.getSearchQuery() // gets entire search query as an object

wweb.clearSearchQueryParam('my_query_param') // removes my_query_param from the query params

wweb.clearSearchQuery() // clears entire search query

const myCookie = wweb.getCookie('my_cookie') // gets my_cookie from the document cookies

const cookies = wweb.getCookies() // gets all cookies from document

wweb.clearCookie('my_cookie') // clears my_cookie from the document cookies

wweb.clearCookies() // clears all cookies from document
```

# License/Author
<b>wweb</b> © [richytong](https://github.com/richytong)

Created and maintained by richytong.
