'use strict';

const tableName = 'Deals';

const statusAwaiting = 'Awaiting';
const statusCanceled = 'Canceled';
const statusDone = 'Done';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        dealId CHAR(36) PRIMARY KEY NOT NULL,
        signDate BIGINT,
        totalPrice DECIMAL NOT NULL,
        dealStatus ENUM('${statusAwaiting}', '${statusCanceled}', '${statusDone}') NOT NULL,
        propertyId CHAR(36) NOT NULL,
        sellerUserId CHAR(36) NOT NULL,
        buyerUserId CHAR(36) NOT NULL,
        createdAt BIGINT NOT NULL,
        updatedAt BIGINT NOT NULL,

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
