const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter your name'
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter your email address'
    },
    unique: {
      args: true,
      msg: 'Email already exists'
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Please enter a valid email address'
      },
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter a password'
    },
    validate: {
      min: 6
    },
  }
})

User.associate = (models) => {
  User.hasMany(models.Comment, {
    foreignKey: 'userId',
  });
};

User.sync().then(() => {
  console.log('table created');
});

module.exports = User