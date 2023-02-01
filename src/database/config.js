require('dotenv').config()

module.exports = {
  development: {
    url: `postgres://${process.env.DATABASE_USER_DEV}:${process.env.DATABASE_PASSWORD_DEV}@${process.env.DATABASE_HOST_DEV}:${process.env.DATABASE_PORT_DEV}/${process.env.DATABASE_NAME_DEV}`,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  test: {
    url: `postgres://${process.env.DATABASE_USER_TEST}:${process.env.DATABASE_PASSWORD_TEST}@${process.env.DATABASE_HOST_TEST}:${process.env.DATABASE_PORT_TEST}/${process.env.DATABASE_NAME_TEST}`,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  },
  production: {
    url: `postgres://${process.env.DATABASE_USER_PROD}:${process.env.DATABASE_PASSWORD_PROD}@${process.env.DATABASE_HOST_PROD}:${process.env.DATABASE_PORT_PROD}/${process.env.DATABASE_NAME_PROD}`,
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
