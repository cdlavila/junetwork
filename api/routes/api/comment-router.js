const router = require('express').Router()
const CommentController = require('../../controllers/comment-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Authenticated
router.post('/', checkAuthentication, checkRoles(['user']), CommentController.create)
router.put('/:id', checkAuthentication, checkRoles(['user']), CommentController.update)
router.delete('/:id', checkAuthentication, checkRoles(['user']), CommentController.delete)

module.exports = router
