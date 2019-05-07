'use strict';
module.exports = (sequelize, DataTypes) => {
  const oauth_authorization_code = sequelize.define('oauth_authorization_code', {
    code: DataTypes.STRING,
    scope: DataTypes.STRING,
    expires_at: DataTypes.DATE,
    redirect_uri: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  oauth_authorization_code.associate = function(models) {
    // associations can be defined here
  };
  return oauth_authorization_code;
};