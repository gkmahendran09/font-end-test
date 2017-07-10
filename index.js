// require dependencies
const express = require('express')
const history = require('connect-history-api-fallback');

// port
const port = 3000

// express app
const app = express()

// setup static path
app.use(express.static('dist'))

// Use history api fallback
app.use(history());

// listen on port
app.listen(port)
