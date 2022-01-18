const { Op } = require('sequelize')

// Models
const { User } = require('../database/models/index')

class UserRepository {
  static async create (data) {
    return User.create(data)
  }

  static async getAll () {
    return User.findAll()
  }

  static async getById (id) {
    return User.findByPk(id)
  }

  static async getByEmail (email) {
    return User.findOne({
      where: { email }
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
      }
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
