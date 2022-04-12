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
      User.hasMany(models.Follower, { as: 'followers', foreignKey: 'follower_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      User.hasMany(models.Follower, { as: 'following', foreignKey: 'followed_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: {
          args: 4,
          msg: 'id must be a valid UUID'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is required'
        },
        is: {
          args: /^[a-zñáéíóú ]+$/i,
          msg: 'name must be a valid string'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'picture must be an url'
        }
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'birthday is required'
        },
        isDate: {
          msg: 'birthday must be a date'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM(['male', 'female', 'other']),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'gender is required'
        },
        isIn: {
          args: [['male', 'female', 'other']],
          msg: 'gender must be one of the next words: male, female or other'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phone is required'
        },
        isNumeric: {
          msg: 'phone must contains only numbers'
        }
      },
      unique: {
        msg: 'An user with this phone number already exists'
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'An user with this email already exists'
      },
      validate: {
        notNull: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'email has not the correct format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        isValid(value) {
          if (typeof value !== 'string' || value?.length < 8 || value.length > 32) {
            throw new Error('password must be a string and it must be between 8 and 32 characters')
          } else {
            this.setDataValue('password', bcrypt.hashSync(value, 12))
          }
        }
      }
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
      set () {
        this.setDataValue('creation_date', new Date())
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  })

  return User
}
