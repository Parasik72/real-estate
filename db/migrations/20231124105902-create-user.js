'use strict';

const tableName = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        userId CHAR(36) PRIMARY KEY NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt BIGINT NOT NULL,
        updatedAt BIGINT NOT NULL
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