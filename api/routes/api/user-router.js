const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const authentication = require('../../middlewares/authentication')
const roles = require('../../middlewares/roles')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

// Authentication required
router.delete('/', authentication, roles(['user']), UserController.delete)

module.exports = router
