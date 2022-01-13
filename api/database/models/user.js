'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      // define association here
      User.hasMany(models.Post, { as: 'posts', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      User.hasMany(models.Reaction, { as: 'reactions', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      User.hasMany(models.Comment, { as: 'comments', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      User.hasMany(models.Follower, { as: 'followers', foreignKey: 'follower_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      User.hasMany(models.Follower, { as: 'following', foreignKey: 'followed_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
       isUrl: true
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM(['male', 'female', 'other']),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set (value) {
        this.setDataValue('password', bcrypt.hashSync(value, 12))
      }
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  })

  return User
}
