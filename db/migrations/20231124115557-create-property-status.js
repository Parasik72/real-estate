'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertyStatuses', {
      propertyStatusId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      statusName: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PropertyStatuses');
  }
};