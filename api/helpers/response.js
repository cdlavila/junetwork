class response {
  static success (res, code, data, message) {
    if (code === 204) { // No-content response
      res.status(code)
    }

    res.status(code || 200).json({
      data: data,
      code: code,
      message: message,
      error: null
    })
  }

  static error (res, code, error) {
    res.status(code || 500).json({
      data: null,
      code: code,
      message: null,
      error: error
    })
  }
}

module.exports = response
