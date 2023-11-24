'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertyImages', {
      propertyImageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      imgName: {
			  allowNull: false,
        type: Sequelize.STRING
      },
      propertyId: {
        type: Sequelize.UUID,
			  allowNull: false,
			  references: {
			  	model: 'Properties',
			  	key: 'propertyId'
			  }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PropertyImages');
  }
};