const statusCode = require('./status-code')

class Response {
  static success (res, code, data, message) {
    if (code === statusCode?.NO_CONTENT) { // No-content response
      res.status(code)
    }

    res.status(code || statusCode?.OK).json({
      data: data,
      code: code,
      message: message,
      error: null
    })
  }

  static error (res, code, error) {
    res.status(code || statusCode?.SERVER_ERROR).json({
      data: null,
      code: code,
      message: null,
      error: error
    })
  }
}

module.exports = Response
