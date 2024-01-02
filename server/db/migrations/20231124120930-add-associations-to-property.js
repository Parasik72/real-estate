'use strict';

const tableName = 'Properties';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addColumnsQuery = `
      ALTER TABLE ${tableName}
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
      ON UPDATE CASCADE;
    `;
    await queryInterface.sequelize.query(addColumnsQuery);
  },

  async down(queryInterface, Sequelize) {
    const removeColumnsQuery = `
      ALTER TABLE ${tableName}  
      DROP FOREIGN KEY ${tableName}_userId_foreign_idx,
      DROP COLUMN userId,
      
      DROP FOREIGN KEY ${tableName}_propertyAddressId_foreign_idx,
      DROP COLUMN propertyAddressId;
    `;
    await queryInterface.sequelize.query(removeColumnsQuery);
  }
};
