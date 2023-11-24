'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DealStatuses', {
      dealStatusId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      statusName: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DealStatuses');
  }
};