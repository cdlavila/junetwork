const checkRoles = require('./check-roles')

describe('Check Roles', () => {
  it('User has permission', () => {
    const req = {
      userRole: 'user'
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    checkRoles(['user'])(req, res, next)
    expect(next.mock.calls.length).toBe(1)
  })

  it('User has not permission', () => {
    const req = {
      userRole: 'user'
    }
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()
    checkRoles(['admin'])(req, res, next)
    expect(res.status.mock.calls[0][0]).toBe(403)
    expect(res.json.mock.calls[0][0]).toEqual({
      data: null,
      code: 403,
      message: null,
      errors: ['User has not permission for this action']
    })
  })
})
