require('dotenv').config()
const express = require('express')
const cors = require('cors')
const apiRouter = require('./api/routes/index')
const port = process.env.PORT || 3001

// Database connection
const { sequelize } = require('./api/database/models/index')

// Initialize express
const app = express()

// To use JSON format in the request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Allows all requests from any origin
app.use(cors())

// API main route
app.use('/api', apiRouter)

// Statics
app.use('/public', express.static('public'))

// Server main route
app.get('/', (req, res) => (
  res.status(200).json({ message: 'Welcome to the social network server' })
))

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`)
  await sequelize.sync()
})

module.exports = app
