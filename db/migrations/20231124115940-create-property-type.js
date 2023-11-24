'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertyTypes', {
      propertyTypeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      typeName: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PropertyTypes');
  }
};