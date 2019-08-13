const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Inventor = require('../models/Inventor')
const inventorsData = require('./data/inventorsData')
const {dbURI} = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Inventor.create(inventorsData))
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())