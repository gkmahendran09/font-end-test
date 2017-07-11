// require dependencies
const express = require('express')
const history = require('connect-history-api-fallback');

// port
const port = 3000

// express app
const app = express()

// Use history api fallback
app.use(history());

// setup static path
app.use(express.static('dist'))

// listen on port
app.listen(process.env.PORT || port)