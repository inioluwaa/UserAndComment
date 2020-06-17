const Sequelize = require('sequelize');
const db = require('../config/database');

const Reply = db.define('replies', {
  reply: {
    type: Sequelize.STRING,
  },
  commentId: {
    type: Sequelize.INTEGER,
  }
})

Reply.associate = (models) => {
  Reply.belongsTo(models.Comment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE'
  });
};

Reply.sync().then(() => {
  console.log('Reply table created');
});

module.exports = Reply