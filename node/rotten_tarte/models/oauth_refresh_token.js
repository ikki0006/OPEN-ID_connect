'use strict';
module.exports = (sequelize, DataTypes) => {
  const oauth_refresh_token = sequelize.define('oauth_refresh_token', {
    refresh_token: DataTypes.STRING,
    expires_at: DataTypes.STRING,
    scope: DataTypes.STRING,
    client_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  oauth_refresh_token.associate = function(models) {
    // associations can be defined here
  };
  return oauth_refresh_token;
};