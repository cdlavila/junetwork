'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate (models) {
      // define association here
      Follower.belongsTo(models.User, { as: 'follower', foreignKey: 'follower_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Follower.belongsTo(models.User, { as: 'followed', foreignKey: 'followed_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Follower.init({
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
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'follower_id is required'
        },
        isUUID: {
          args: 4,
          msg: 'follower_id must be a valid UUID'
        }
      }
    },
    followed_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'followed_id is required'
        },
        isUUID: {
          args: 4,
          msg: 'followed_id must be a valid UUID'
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
    modelName: 'Follower',
    tableName: 'followers'
  })

  return Follower
}
