const Response = require('./response')

describe('Response class', () => {
  test('Success response', () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    Response.success(res, 200, { name: 'Success test' }, 'Success')
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: { name: 'Success test' },
      code: 200,
      message: 'Success',
      error: null
    })
  })

  test('Success response with no content', () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    Response.success(res, 204, null, 'No content')
    expect(res.status.mock.calls[0][0]).toBe(204)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 204,
      message: 'No content',
      error: null
    })
  })

  test('Error response', () => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    Response.error(res, 500, ['Error test'])
    expect(res.status.mock.calls[0][0]).toBe(500)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 500,
      message: null,
      errors: ['Error test']
    })
  })
})
