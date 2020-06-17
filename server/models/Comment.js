const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comments', {
  comment: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  }
})

Comment.associate = (models) => {
  Comment.hasMany(models.Reply, {
    foreignKey: 'commentId',
  });
};

Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
};

Comment.sync().then(() => {
  console.log('comment table created');
});

module.exports = Comment