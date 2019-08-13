function queryHandler(req, res, next) {
  for(const key in req.query) {
    // Convert boolean values to booleans
    if(req.query[key] === 'true') req.query[key] = true
    if(req.query[key] === 'false') req.query[key] = false

    // Convert numeric values to numbers
    // if(!isNaN(req.query[key])) {
    //   req.query[key] = +req.query[key]
    // }

    // Convert string values to regular expression
    if(typeof req.query[key] === 'string') {
      req.query[key] = new RegExp(req.query[key], 'i')
    }

    // Convert array values to non-specific search
    if(req.query[key] instanceof Array) {
      req.query[key] = { $all: req.query[key] }
    }
  }
  next()
}

module.exports = queryHandler
