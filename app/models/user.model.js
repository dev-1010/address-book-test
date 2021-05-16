'use strict'

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {   
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
