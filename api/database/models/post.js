'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate (models) {
      // define association here
      Post.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Post.hasMany(models.Reaction, { as: 'reactions', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Post.hasMany(models.Comment, { as: 'comments', foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }

  Post.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  })

  return Post
}
