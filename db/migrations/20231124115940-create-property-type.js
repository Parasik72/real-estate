'use strict';

const tableName = 'PropertyTypes';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        propertyTypeId CHAR(36) PRIMARY KEY NOT NULL,
        typeName VARCHAR(255) UNIQUE NOT NULL
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
