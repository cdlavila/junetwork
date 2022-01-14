const router = require('express').Router()
const userController = require('../../controllers/user-controller')

// Public
router.get('/sign-up', userController.signUp)

module.exports = router
