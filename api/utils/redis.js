const redis = require("redis")

let client
if (process.env.NODE_ENV === 'production') {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  })
} else {
  client = redis.createClient()
}

client.on("error", function(error) {
  console.error(error)
});

module.exports = client
