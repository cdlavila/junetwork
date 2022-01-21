const router = require('express').Router()
const FollowerController = require('../../controllers/follower-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Authenticated
router.post('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.create)
router.get('/me/followers', checkAuthentication, checkRoles(['user']), FollowerController.getMyFollowers)
router.get('/me/following', checkAuthentication, checkRoles(['user']), FollowerController.getWhoIAmFollowing)
router.get('/followers/:userId', checkAuthentication, checkRoles(['user']), FollowerController.getFollowers)
router.get('/following/:userId', checkAuthentication, checkRoles(['user']), FollowerController.getFollowing)
router.delete('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.delete)

module.exports = router
