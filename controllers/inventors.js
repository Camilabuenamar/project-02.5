const Inventor = require('../models/Inventor')

function indexRoute (req, res, next) {
  // get all inventors from the database: MONGOOSE
  req.query.name = new RegExp(req.query.name, 'i')

  Inventor.find(req.query)
    // .select('-comments')
    .then(stations => res.json(stations)) // send them as JSON: EXPRESS
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser._id
  const inventor = new Inventor(req.body) // create a new inventor: MONGOOSE

  inventor.save() // save it in the database: MONGOOSE
    .then(inventor => res.status(201).json(inventor)) // send it as JSON: EXPRESS
    .catch(next)
}

function showRoute(req, res, next) {
  //the ID in now on req.params.id
  Inventor.findById(req.params.id) //get the inventor from the database: Mongoose
    .populate('user', 'username email')
    .populate('comments.user')
    .then(inventor => {
      if(!inventor) return res.sendStatus(404) // return 404 Express
      return res.json(inventor) // send it as json: express
    })
    .catch(next)
}

function deleteRoute(req, res, next) {
  Inventor.findById(req.params.id) // find the inventor from the db with mongoose
    .then(inventor => {
      if(!inventor) return res.sendStatus(404) // return 404 Express
      return inventor.remove() // remove the inventor: Mongoose
    })
    .then(() => res.sendStatus(204)) //return a 204: Express
    .catch(next)
}

function updateRoute(req, res, next) {
  Inventor.findById(req.params.id) // find the inventor from the db with mongoose
    .then(inventor => {
      if(!inventor) return res.sendStatus(404) // return 404 Express
      return inventor.set(req.body) //update inventor with the date from the request data
    })
    .then(inventor => inventor.save()) //save the new inventor: MONGOOSE
    .then(inventor => res.json(inventor))
    .catch(next)
}

function commentCreateRoute(req,res, next) {
  req.body.user = req.currentUser._id
  Inventor.findById(req.params.id)
    .then(inventor => {
      if(!inventor) return res.sendStatus(404)
      inventor.comments.push(req.body)
      return inventor.save()
    })
    .then(inventor => res.json(inventor))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Inventor.findById(req.params.id)
    .then(inventor => {
      if(!inventor) return res.sendStatus(404)

      const comment = inventor.comments.id(req.params.commentId)
      if(!comment) return res.sendStatus(404)

      comment.remove()
      return inventor.save()
    })
    .then(inventor => res.json(inventor))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute,
  update: updateRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
