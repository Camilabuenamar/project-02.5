const router = require('express').Router()
const inventorsController = require('../controllers/inventors')
const authController = require('../controllers/auth')
const secureRoute =require('../lib/secureRoute')

// app.get('/') - define a GET request handler for the homepage: EXPRESS
router.get('/', (req, res) => {
  // res.json() - send back a JSON response: EXPRESS
  res.json({ message: 'Welcome to women inventors API' }) // convert the object into JSON
})

router.route('/inventors')
  .get(inventorsController.index)
  .post(secureRoute, inventorsController.create)

router.route('/inventors/:id')
  .get(inventorsController.show)
  .put(secureRoute, inventorsController.update)
  .delete(secureRoute, inventorsController.delete)

router.post('/inventors/:id/comments', secureRoute, inventorsController.commentCreate)
router.delete('/inventors/:id/comments/:commentId', secureRoute, inventorsController.commentDelete)


router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
