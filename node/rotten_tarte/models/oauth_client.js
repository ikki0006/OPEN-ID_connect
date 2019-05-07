'use strict';
module.exports = (sequelize, DataTypes) => {
  const oauth_client = sequelize.define('oauth_client', {
    client_name: DataTypes.STRING,
    client_id: DataTypes.STRING,
    client_secret: DataTypes.STRING,
    redirect_uri: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  oauth_client.associate = function(models) {
    // associations can be defined here
  };
  return oauth_client;
};