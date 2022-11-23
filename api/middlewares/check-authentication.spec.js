const checkAuthentication = require('./check-authentication')
const Token = require('../helpers/token')

describe('Check Authentication', () => {
  test('Token is required', () => {
    const req = {
      headers: {}
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    checkAuthentication(req, res, next)
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 401,
      message: null,
      errors: ['Token is required']
    })
  })

  test('Token structure is invalid', () => {
    const req = {
      headers: {
        authorization: 'jshh2hd828d2j2djjd292dj9d2jd2'
      }
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    checkAuthentication(req, res, next)
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 401,
      message: null,
      errors: ['Token structure is invalid']
    })
  })

  test('The user no longer exists', async () => {
    process.env.TOKEN_SECRET_KEY = '1234567890';
    const token = Token.generate('d67871ba-2cf3-45e5-8206-b10b2af190fb', 'user')
    const req = {
      headers: {
        authorization: 'Bearer ' + token
      }
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    await checkAuthentication(req, res, next)
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 401,
      message: null,
      errors: ['The user no longer exists']
    })
  })

  test('The user is authenticated successfully', async () => {
    process.env.TOKEN_SECRET_KEY = '1234567890';
    const token = Token.generate('d39671ba-2cf3-45e5-8206-b10b2af190fb', 'user')
    const req = {
      headers: {
        authorization: 'Bearer ' + token
      }
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    await checkAuthentication(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(req.user.id).toBe( 'd39671ba-2cf3-45e5-8206-b10b2af190fb')
  })
})
