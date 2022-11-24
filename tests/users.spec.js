const { app, server } = require('../index')
const Redis = require('../api/utils/redis')
const request = require('supertest')
const { User } = require('../api/database/models')

describe('Users Endpoints', () => {
  beforeAll(async () => {
    await User.destroy({ where: { email: 'samuelcataño@gmail.com' } })
  })

  let token

  test('POST /api/users/sign-up', async () => {
    const response = await request(app).post('/api/users/sign-up').send({
      name: 'Samuel Cataño Londoño',
      birthday: '2008-01-02',
      gender: 'male',
      phone: '3145406608',
      email: 'samuelcataño@gmail.com',
      password: 'samuel123'
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('You have registered successfully')
    expect(response.body.data).toMatchObject({
      name: 'Samuel Cataño Londoño',
      birthday: '2008-01-02',
      gender: 'male',
      phone: '3145406608',
      email: 'samuelcataño@gmail.com'
    })
  })

  test('POST /api/users/sign-in', async () => {
    const response = await request(app).post('/api/users/sign-in').send({
      email: 'samuelcataño@gmail.com',
      password: 'samuel123'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('You have authenticated successfully')
    expect(response.body.data.user).toMatchObject({
      name: 'Samuel Cataño Londoño',
      birthday: '2008-01-02',
      gender: 'male',
      phone: '3145406608',
      email: 'samuelcataño@gmail.com'
    })
    expect(response.body.data.token).toBeDefined()
    token = response.body.data.token
  })

  test('POST /api/users/refresh', async () => {
    const response = await request(app)
      .get('/api/users/refresh').send()
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.message).toEqual('You have authenticated successfully')
    expect(response.body.data.user).toMatchObject({
      name: 'Samuel Cataño Londoño',
      birthday: '2008-01-02',
      gender: 'male',
      phone: '3145406608',
      email: 'samuelcataño@gmail.com'
    })
    expect(response.body.data.token).toBeDefined()
  })

  afterAll(() => {
    server.close()
    Redis.quit()
  })
})
