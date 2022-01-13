'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM(['male', 'female', 'other']),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        set (value) {
          this.setDataValue('password', bcrypt.hashSync(value, 12))
        }
      },
      creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('users')
  }
}
