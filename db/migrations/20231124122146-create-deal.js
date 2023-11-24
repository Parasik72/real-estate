'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deals', {
      dealId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      signDate: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      dealStatusId: {
        type: Sequelize.UUID,
			  allowNull: false,
			  references: {
			  	model: 'DealStatuses',
			  	key: 'dealStatusId'
			  }
      },
      propertyId: {
        type: Sequelize.UUID,
			  allowNull: false,
			  references: {
			  	model: 'Properties',
			  	key: 'propertyId'
			  }
      },
      sellerUserId: {
        type: Sequelize.UUID,
			  allowNull: false,
			  references: {
			  	model: 'Users',
			  	key: 'userId'
			  }
      },
      buyerUserId: {
        type: Sequelize.UUID,
			  allowNull: false,
			  references: {
			  	model: 'Users',
			  	key: 'userId'
			  }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Deals');
  }
};