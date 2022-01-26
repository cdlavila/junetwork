const redis = require("redis")

let client
if (process.env.NODE_ENV === 'development') {
  client = redis.createClient()
}
if (process.env.NODE_ENV === 'development') {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  })
}

client.on("error", function(error) {
  console.error(error)
});

module.exports = client
