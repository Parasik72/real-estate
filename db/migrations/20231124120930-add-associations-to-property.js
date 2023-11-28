'use strict';

const tableName = 'Properties';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addColumnsQuery = `
      ALTER TABLE ${tableName}
      ADD COLUMN propertyStatusId CHAR(36) NOT NULL,
      ADD CONSTRAINT ${tableName}_propertyStatusId_foreign_idx
      FOREIGN KEY (propertyStatusId)
      REFERENCES PropertyStatuses (propertyStatusId)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      
      ADD COLUMN userId CHAR(36) NOT NULL,
      ADD CONSTRAINT ${tableName}_userId_foreign_idx
      FOREIGN KEY (userId)
      REFERENCES Users (userId)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      
      ADD COLUMN propertyAddressId CHAR(36) NOT NULL,
      ADD CONSTRAINT ${tableName}_propertyAddressId_foreign_idx
      FOREIGN KEY (propertyAddressId)
      REFERENCES PropertyAddresses (propertyAddressId)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      
      ADD COLUMN propertyTypeId CHAR(36) NOT NULL,
      ADD CONSTRAINT ${tableName}_propertyTypeId_foreign_idx
      FOREIGN KEY (propertyTypeId)
      REFERENCES PropertyTypes (propertyTypeId)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `;
    await queryInterface.sequelize.query(addColumnsQuery);
  },

  async down(queryInterface, Sequelize) {
    const removeColumnsQuery = `
      ALTER TABLE ${tableName}
      DROP FOREIGN KEY ${tableName}_propertyStatusId_foreign_idx,
      DROP COLUMN propertyStatusId,
      
      DROP FOREIGN KEY ${tableName}_userId_foreign_idx,
      DROP COLUMN userId,
      
      DROP FOREIGN KEY ${tableName}_propertyAddressId_foreign_idx,
      DROP COLUMN propertyAddressId,
      
      DROP FOREIGN KEY ${tableName}_propertyTypeId_foreign_idx,
      DROP COLUMN propertyTypeId;
    `;
    await queryInterface.sequelize.query(removeColumnsQuery);
  }
};
