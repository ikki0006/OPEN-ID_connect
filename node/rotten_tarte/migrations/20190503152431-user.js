'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'users', 'code', {
        type: Sequelize.CHAR(12),
        allowNull: false,
        defaultValue: "123456789012",
        after: 'password' // PostgreSQLでは無効なオプションです
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
