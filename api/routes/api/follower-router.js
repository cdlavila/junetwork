const router = require('express').Router()
const FollowerController = require('../../controllers/follower-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Authenticated
router.post('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.create)
router.get('/followers', checkAuthentication, checkRoles(['user']), FollowerController.getFollowers)
router.get('/following', checkAuthentication, checkRoles(['user']), FollowerController.getFollowing)
router.delete('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.delete)

module.exports = router
