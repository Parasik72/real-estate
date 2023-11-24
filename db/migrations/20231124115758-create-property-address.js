'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertyAddresses', {
      propertyAddressId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      countryName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cityName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressLine1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      addressLine2: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PropertyAddresses');
  }
};