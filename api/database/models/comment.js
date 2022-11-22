'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate (models) {
      // define association here
      Comment.hasMany(models.Reaction, { as: 'reactions', foreignKey: 'comment_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Comment.belongsTo(models.Post, { as: 'post', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Comment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Comment.init({
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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'body is required'
        },
        isString (value) {
          if (typeof value !== 'string') {
            throw new Error('body must be a string')
          }
        }
      }
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'post_id is required'
        },
        isUUID: {
          args: 4,
          msg: 'post_id must be a valid UUID'
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
    modelName: 'Comment',
    tableName: 'comments'
  })
  return Comment
}
