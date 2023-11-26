'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      propertyId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      bedRooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bathRooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      area: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      priceAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
  }
};