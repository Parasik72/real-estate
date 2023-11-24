'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Properties', 'propertyStatusId', { 
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'PropertyStatuses',
				key: 'propertyStatusId'
			}
		});
    await queryInterface.addColumn('Properties', 'userId', { 
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'userId'
			}
		});
    await queryInterface.addColumn('Properties', 'propertyAddressId', { 
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'PropertyAddresses',
				key: 'propertyAddressId'
			}
		});
    await queryInterface.addColumn('Properties', 'propertyTypeId', { 
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'PropertyTypes',
				key: 'propertyTypeId'
			}
		});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Properties', 'propertyStatusId');
  }
};
