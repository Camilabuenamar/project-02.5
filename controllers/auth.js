const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')

function registerRoute(req, res, next){
  User.create(req.body)
    .then(()=> res.json({ message: 'Registration successful' }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email})
    .then(user => {
      //Check if the user exist AND the user password is valid
      if(!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401)
      }
      //generate a token
      const token = jwt.sign({sub: user._id}, secret, {expiresIn: '6h'})
      //send it to the client
      res.json({ message: `Welcome back ${user.username}!`, token})
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
