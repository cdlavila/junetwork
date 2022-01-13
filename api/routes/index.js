const router = require('express').Router()
const userRouter = require('./api/user')

router.use('/users', userRouter)

router.get('/', (req, res) => {
    res.send({ message: 'Welcome to the social network REST API' })
})

module.exports = router