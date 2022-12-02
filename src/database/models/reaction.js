'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate (models) {
      // define association here
      Reaction.belongsTo(models.Post, { as: 'post', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Reaction.belongsTo(models.Comment, { as: 'comment', foreignKey: 'comment_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Reaction.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Reaction.init({
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
    emoji: {
      type: DataTypes.ENUM(['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'emoji is required'
        },
        isIn: {
          args: [['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']],
          msg: 'emoji must be one of the next words: like, love, care, haha, wow, sad, angry'
        }
      }
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'post_id must be a valid UUID'
        }
      }
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'comment_id must be a valid UUID'
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
    }
  }, {
    sequelize,
    modelName: 'Reaction',
    tableName: 'reactions'
  })

  return Reaction
}
