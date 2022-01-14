const router = require('express').Router()
const UserController = require('../../controllers/user-controller')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

module.exports = router
