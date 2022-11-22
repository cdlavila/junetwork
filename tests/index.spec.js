const app = require('../index')
const request = require('supertest')

describe('Server', () => {
  it('/', async () => {
    const response = await request(app).get('/').send()
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Welcome to the social network server')
  })

  it('/api', async () => {
    const response = await request(app).get('/api').send()
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Welcome to the social network REST API')
  })
})
