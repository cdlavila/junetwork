const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/request-recovery-password', UserController.requestRecoveryPassword)
router.post('/recovery-password', UserController.recoveryPassword)

// Authenticated
router.get('/refresh', checkAuthentication, checkRoles(['user']), UserController.refresh)
router.get('/search', checkAuthentication, checkRoles(['user']), UserController.search)
router.get('/myself', checkAuthentication, checkRoles(['user']), UserController.getMyself)
router.get('/:id', checkAuthentication, checkRoles(['user']), UserController.getById)
router.put('/', checkAuthentication, checkRoles(['user']), UserController.update)
router.delete('/', checkAuthentication, checkRoles(['user']), UserController.delete)

module.exports = router
