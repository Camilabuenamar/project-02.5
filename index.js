// load in 3rd-party packages
const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'The {PATH} {VALUE} is already in use, try a new one.'
})
const bodyParser = require('body-parser')
const {dbURI} =require('./config/environment')

const router = require('./config/routes')
const queryHandler = require('./lib/queryHandler')
const errorHandler = require('./lib/errorHandler')

const app = express() // creates a HTTP request handler: EXPRESS

// Connect to a specific database: MONGOOSE
mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(bodyParser.json())

app.use(queryHandler)

app.use('/api', router)

app.use(errorHandler)

// Tell tell the API to listen to port 4000 for incoming request: EXPRESS
app.listen(4000, () => console.log('listening to port 4000'))

module.exports = app
