function errorHandler(err, req, res, next) { // receives any errors from previous middleware
  if (err.name === 'ValidationError') {
    for (const key in err.errors) { //Tidy up the mongoose error
      err.errors[key] = err.errors[key].message
    }
    return res.status(422).json({ errors: err.errors })
  }
  res.sendStatus(500) // send a response
  next(err) //sends the error to the termindal
}

module.exports = errorHandler
