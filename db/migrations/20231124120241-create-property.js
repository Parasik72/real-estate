'use strict';

const tableName = 'Properties';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = `
      CREATE TABLE ${tableName} (
        propertyId CHAR(36) PRIMARY KEY NOT NULL,
        bedRooms INTEGER NOT NULL,
        bathRooms INTEGER NOT NULL,
        area INTEGER NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        priceAmount DECIMAL NOT NULL,
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
