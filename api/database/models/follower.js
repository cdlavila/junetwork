'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate (models) {
      // define association here
      Follower.belongsTo(models.User, { as: 'follower', foreignKey: 'follower_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Follower.belongsTo(models.User, { as: 'followed', foreignKey: 'followed_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }

  Follower.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    followed_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follower',
    tableName: 'followers'
  })

  return Follower
}
