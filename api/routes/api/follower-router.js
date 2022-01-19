const router = require('express').Router()
const FollowerController = require('../../controllers/follower-controller')
const checkAuthentication = require('../../middlewares/check-authentication')
const checkRoles = require('../../middlewares/check-roles')

// Public
router.post('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.create)
router.delete('/:followedId', checkAuthentication, checkRoles(['user']), FollowerController.delete)

module.exports = router
