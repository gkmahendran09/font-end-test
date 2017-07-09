// require dependencies
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

// express app
const app = express()

const port = 3000

// add rendering engine and setup directories
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// setup static path
app.use(express.static('dist'))

// routes
app.get('/', (request, response) => {
    response.render('login')
})

app.listen(port)

// To debug
//DEBUG=express* node index.js