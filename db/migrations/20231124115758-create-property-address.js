'use strict';

const tableName = 'PropertyAddresses';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        propertyAddressId CHAR(36) PRIMARY KEY NOT NULL,
        countryName VARCHAR(255) NOT NULL,
        cityName VARCHAR(255) NOT NULL,
        addressLine1 VARCHAR(255) NOT NULL,
        addressLine2 VARCHAR(255)
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
