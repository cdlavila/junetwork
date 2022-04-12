const router = require('express').Router()
const UserController = require('../../controllers/user-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')
const { uploadProfilePicture } = require('../../middlewares/multer')

// Public
router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/sign-in/phone/request', UserController.requestSignInWithPhone)
router.post('/sign-in/phone', UserController.signInWithPhone)
router.post('/recovery-password/request', UserController.requestRecoveryPassword)
router.post('/recovery-password', UserController.recoveryPassword)

// Authenticated
router.get('/refresh', checkAuthentication, checkRoles(['user']), UserController.refresh)
router.post('/upload-picture', checkAuthentication, checkRoles(['user']), uploadProfilePicture.single('picture'), UserController.uploadPicture)
router.get('/search', checkAuthentication, checkRoles(['user']), UserController.search)
router.get('/myself', checkAuthentication, checkRoles(['user']), UserController.getMyself)
router.get('/:id', checkAuthentication, checkRoles(['user']), UserController.getById)
router.put('/myself', checkAuthentication, checkRoles(['user']), UserController.updateMySelf)
router.delete('/myself', checkAuthentication, checkRoles(['user']), UserController.deleteMySelf)

module.exports = router
