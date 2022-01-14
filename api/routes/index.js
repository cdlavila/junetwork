const router = require('express').Router()
const userRouter = require('./api/user-router')
const postRouter = require('./api/post-router')
const commentRouter = require('./api/comment-router')
const reactionRouter = require('./api/reaction-router')
const followerRouter = require('./api/follower-router')

router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/reactions', reactionRouter)
router.use('/followers', followerRouter)

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to the social network REST API' })
})

module.exports = router
