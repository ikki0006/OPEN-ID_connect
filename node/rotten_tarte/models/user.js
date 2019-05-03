'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    code: DataTypes.CHAR(12)
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
