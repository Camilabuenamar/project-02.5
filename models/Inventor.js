const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true, maxlength: 380},
  rating: {type: Number, min: 1, max: 5, required: true},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
},{
  timestamps: true
})

// Define a schema for inventors: MONGOOSE
const inventorSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a {PATH}', unique: true},
  life: { type: String, required: 'Please provide a {PATH}'},
  inventions: { type: [ String ], required: 'Please provide a {PATH}'},
  bio: { type: String, required: 'Please provide a {PATH}'},
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
})

// Create a station model, using the schema: MONGOOSE
module.exports = mongoose.model('Inventor', inventorSchema)
