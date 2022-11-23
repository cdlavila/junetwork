const { app, server } = require('../index')
const Redis = require('../api/utils/redis')
const request = require('supertest')

describe('Server', () => {
  test('GET /', async () => {
    const response = await request(app).get('/').send()
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Welcome to the social network server')
  })

  test('GET /api', async () => {
    const response = await request(app).get('/api').send()
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Welcome to the social network REST API')
  })

  afterAll(() => {
    server.close()
    Redis.quit()
  })
})
