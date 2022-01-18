const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

// Authentication required
router.delete('/', checkAuthentication, checkRoles(['user']), UserController.delete)

module.exports = router
