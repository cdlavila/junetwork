require('dotenv').config()

module.exports = {
  development: {
    url: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE_NAME}`,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  test: {
    url: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE_NAME}`,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps: false,
      underscored: true
    }
  }
}
