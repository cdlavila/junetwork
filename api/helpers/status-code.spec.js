const statusCode = require('./status-code')

describe('Status Code', () => {
  it('should have status code keys', () => {
    expect(statusCode).toHaveProperty('OK')
    expect(statusCode).toHaveProperty('CREATED')
    expect(statusCode).toHaveProperty('NO_CONTENT')
    expect(statusCode).toHaveProperty('BAD_REQUEST')
    expect(statusCode).toHaveProperty('NOT_AUTHORIZED')
    expect(statusCode).toHaveProperty('PERMISSION_DENIED')
    expect(statusCode).toHaveProperty('NOT_FOUND')
    expect(statusCode).toHaveProperty('SERVER_ERROR')
  })

  it('should have status code values', () => {
    expect(statusCode.OK).toEqual(200)
    expect(statusCode.CREATED).toEqual(201)
    expect(statusCode.NO_CONTENT).toEqual(204)
    expect(statusCode.BAD_REQUEST).toEqual(400)
    expect(statusCode.NOT_AUTHORIZED).toEqual(401)
    expect(statusCode.PERMISSION_DENIED).toEqual(403)
    expect(statusCode.NOT_FOUND).toEqual(404)
    expect(statusCode.SERVER_ERROR).toEqual(500)
  })
})
