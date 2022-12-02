const { Op } = require('sequelize')

// Models
const { User } = require('../database/models/index')

class UserRepository {
  static async create (data) {
    return User.create(data)
  }

  static async getById (id) {
    return User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
  }

  static async getByEmail (email) {
    return User.findOne({
      where: { email }
    })
  }

  static async getByPhone (phone) {
    return User.findOne({
      where: { phone }
    })
  }

  static async search (parameter) {
    return User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${parameter}%` } },
          { email: { [Op.iLike]: `%${parameter}%` } },
          { phone: { [Op.iLike]: `%${parameter}%` } }
        ]
      },
      attributes: ['id', 'name', 'picture']
    })
  }

  static async update (data, id) {
    return User.update(data, {
      where: { id }
    })
  }

  static async delete (id) {
    return User.destroy({
      where: { id }
    })
  }
}

module.exports = UserRepository
