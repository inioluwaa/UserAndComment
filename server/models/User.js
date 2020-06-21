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
      isNotShort: (value) => {
        if (value.length < 8) {
          throw new Error('Password should be at least 8 characters');
        }
      },
    },
  }
})

User.associate = (models) => {
  User.hasMany(models.Comment, {
    foreignKey: 'userId',
  });
};

User.sync({ force: true }).then(() => {
  console.log('table created');
});

module.exports = User