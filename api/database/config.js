require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DB_URL,
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  test: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  production: {
    url: process.env.DB_URL,
    logging: false,
    ssl: {
      rejectUnauthorized: false
    },
    define: {
      timestamps: false,
      underscored: true
    }
  }
}
