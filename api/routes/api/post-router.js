const router = require('express').Router()
const PostController = require('../../controllers/post-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')
const { uploadPostImage } = require('../../middlewares/multer')

// Authenticated
router.post('/', checkAuthentication, checkRoles(['user']), uploadPostImage.single('image'), PostController.create)
router.get('/news', checkAuthentication, checkRoles(['user']), PostController.getNews)
router.get('/mine', checkAuthentication, checkRoles(['user']), PostController.getMine)
router.get('/by-user/:userId', checkAuthentication, checkRoles(['user']), PostController.getByUser)
router.put('/:id', checkAuthentication, checkRoles(['user']), PostController.update)
router.delete('/:id', checkAuthentication, checkRoles(['user']), PostController.delete)

module.exports = router
