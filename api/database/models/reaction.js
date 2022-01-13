'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate (models) {
      // define association here
      Reaction.belongsTo(models.Post, { as: 'post', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Reaction.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Reaction.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    emoji: {
      type: DataTypes.ENUM(['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']),
      allowNull: false
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Reaction',
    tableName: 'reactions'
  })

  return Reaction
}
