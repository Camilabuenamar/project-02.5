const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')
const User = require('../models/User')

function secureRoute(req, res, next) {

  // if theres no authorization header OR it doesnt start with Bearer
  if(!req.headers.authorization ||
  !req.headers.authorization.startsWith('Bearer')) {
    //sendback a 401 response
    return res.sendStatus(401)
  }

  //get the token from the header (remove 'Bearer')
  const token = req.headers.authorization.replace('Bearer ', '')
  //validate the token
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.sendStatus(401) // if it's invalid send a 401 response
    User.findById(payload.sub) //Attempt to find the user by the sub property of the payload
      .then(user => {
        if(!user) return res.sendStatus(401)
        //Add the current user to the request object
        req.currentUser = user
        next() // otherwise allow the request through
      })
  })
}

module.exports = secureRoute
