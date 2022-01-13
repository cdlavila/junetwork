class response {
  static async success (res, code, data, message) {
    res.status(code || 200).json({
      data: data,
      code: code,
      message: message,
      error: null
    })
  }

  static async error (res, code, error) {
    res.status(code || 500).json({
      data: null,
      code: code,
      message: null,
      error: error
    })
  }
}

module.exports = response
