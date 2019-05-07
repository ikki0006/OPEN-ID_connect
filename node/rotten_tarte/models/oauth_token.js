'use strict';
module.exports = (sequelize, DataTypes) => {
  const oauth_token = sequelize.define('oauth_token', {
    access_token: DataTypes.STRING,
    expires_at: DataTypes.STRING,
    scope: DataTypes.STRING,
    client_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  oauth_token.associate = function(models) {
    // associations can be defined here
  };
  return oauth_token;
};