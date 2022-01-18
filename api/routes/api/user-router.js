const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.get('/:id', UserController.getById)

// Authenticated
router.put('/', checkAuthentication, checkRoles(['user']), UserController.update)
router.delete('/', checkAuthentication, checkRoles(['user']), UserController.delete)

module.exports = router
