'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reactions', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      emoji: {
        type: Sequelize.ENUM(['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']),
        allowNull: false
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'posts',
          key: 'id',
          as: 'post_id'
        }
      },
      comment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'comments',
          key: 'id',
          as: 'comment_id'
        }
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'user_id'
        }
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('reactions')
  }
}
