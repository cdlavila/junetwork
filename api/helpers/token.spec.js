const Token = require('./token')

describe('Token class', () => {
  test('generate and verify should work properly', () => {
    process.env.TOKEN_SECRET_KEY = '1234567890'
    const token = Token.generate('d76309ba-2cf3-45e5-8206-b10b1af190fb', 'admin')
    expect(token).toBeDefined()
    const payload = Token.verify(token)
    expect(payload.sub).toEqual('d76309ba-2cf3-45e5-8206-b10b1af190fb')
    expect(payload.role).toEqual('admin')
  })
})
