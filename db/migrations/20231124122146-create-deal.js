'use strict';

const tableName = 'Deals';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        dealId CHAR(36) PRIMARY KEY NOT NULL,
        signDate BIGINT,
        totalPrice DECIMAL,
        dealStatusId CHAR(36) NOT NULL,
        propertyId CHAR(36) NOT NULL,
        sellerUserId CHAR(36) NOT NULL,
        buyerUserId CHAR(36) NOT NULL,
        createdAt BIGINT NOT NULL,
        updatedAt BIGINT NOT NULL,

        CONSTRAINT ${tableName}_dealStatusId_foreign_idx
        FOREIGN KEY (dealStatusId)
        REFERENCES DealStatuses (dealStatusId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

        CONSTRAINT ${tableName}_propertyId_foreign_idx
        FOREIGN KEY (propertyId)
        REFERENCES Properties (propertyId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

        CONSTRAINT ${tableName}_sellerUserId_foreign_idx
        FOREIGN KEY (sellerUserId)
        REFERENCES Users (userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
        CONSTRAINT ${tableName}_buyerUserId_foreign_idx
        FOREIGN KEY (buyerUserId)
        REFERENCES Users (userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      );
    `;
    await queryInterface.sequelize.query(query);
  },

  async down(queryInterface, Sequelize) {
    const query = `
      DROP TABLE IF EXISTS ${tableName};
    `;
    await queryInterface.sequelize.query(query);
  }
};
