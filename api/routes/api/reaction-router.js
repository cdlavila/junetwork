const router = require('express').Router()
const ReactionController = require('../../controllers/reaction-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Authenticated
router.post('/toggle-post', checkAuthentication, checkRoles(['user']), ReactionController.togglePost)
router.post('/toggle-comment', checkAuthentication, checkRoles(['user']), ReactionController.toggleComment)
router.get('/by-post/:postId', checkAuthentication, checkRoles(['user']), ReactionController.getByPost)
router.get('/by-comment/:commentId', checkAuthentication, checkRoles(['user']), ReactionController.getByComment)

module.exports = router
