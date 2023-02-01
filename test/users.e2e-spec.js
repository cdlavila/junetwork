const { app, server } = require('../index')
// const Redis = require('../src/utils/redis')
const request = require('supertest')
const { User } = require('../src/database/models')

describe('Users Endpoints', () => {
  let token

  test('POST /api/users/sign-up', async () => {
    const response = await request(app).post('/api/users/sign-up').send({
      name: 'Carlos Daniel Londoño',
      birthday: '2001-08-10',
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniel.londono@utp.edu.co',
      password: '12345678'
    })
    console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('You have registered successfully')
    expect(response.body.data).toMatchObject({
      name: 'Carlos Daniel Londoño',
      birthday: '2001-08-10',
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniel.londono@utp.edu.co'
    })
  })

  test('POST /api/users/sign-in', async () => {
    const response = await request(app).post('/api/users/sign-in').send({
      email: 'carlosdaniel.londono@utp.edu.co',
      password: '12345678'
    })
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('You have authenticated successfully')
    expect(response.body.data.user).toMatchObject({
      name: 'Carlos Daniel Londoño',
      birthday: '2001-08-10',
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniel.londono@utp.edu.co'
    })
    expect(response.body.data.token).toBeDefined()
    token = response.body.data.token
  })

  test('POST /api/users/refresh', async () => {
    const response = await request(app)
      .get('/api/users/refresh').send()
      .set('Authorization', `Bearer ${token}`)
    console.log(response.body)
    expect(response.body.message).toEqual('You have authenticated successfully')
    expect(response.body.data.user).toMatchObject({
      name: 'Carlos Daniel Londoño',
      birthday: '2001-08-10',
      gender: 'male',
      phone: '3205821741',
      email: 'carlosdaniel.londono@utp.edu.co'
    })
    expect(response.body.data.token).toBeDefined()
  })

  afterAll(async () => {
    // await User.destroy({ where: { email: 'carlosdaniel.londono@utp.edu.co' } })
    server.close()
    // Redis.quit()
  })
})
