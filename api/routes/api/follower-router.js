const router = require('express').Router()
const FollowerController = require('../../controllers/follower-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Authenticated
router.post('/toggle/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.toggle)
router.get('/me/followers', checkAuthentication, checkRoles(['user']), FollowerController.getMyFollowers)
router.get('/me/following', checkAuthentication, checkRoles(['user']), FollowerController.getWhoIAmFollowing)
router.get('/by-user/followers/:userId', checkAuthentication, checkRoles(['user']), FollowerController.getFollowers)
router.get('/by-user/following/:userId', checkAuthentication, checkRoles(['user']), FollowerController.getFollowing)

module.exports = router
