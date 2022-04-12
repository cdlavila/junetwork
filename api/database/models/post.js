'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate (models) {
      // define association here
      Post.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Post.hasMany(models.Reaction, { as: 'reactions', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Post.hasMany(models.Comment, { as: 'comments', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Post.init({
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
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('body must be a string')
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'image must be a valid url'
        }
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user_id is required'
        },
        isUUID: {
          args: 4,
          msg: 'user_id must be a valid UUID'
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
    modelName: 'Post',
    tableName: 'posts'
  })

  return Post
}
