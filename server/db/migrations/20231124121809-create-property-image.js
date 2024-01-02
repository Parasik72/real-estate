'use strict';

const tableName = 'PropertyImages';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        propertyImageId CHAR(36) PRIMARY KEY NOT NULL,
        imgName VARCHAR(255) NOT NULL,
        propertyId CHAR(36) NOT NULL,
        CONSTRAINT ${tableName}_propertyId_foreign_idx
        FOREIGN KEY (propertyId)
        REFERENCES Properties (propertyId)
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
