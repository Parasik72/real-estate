'use strict';

const { demoPropertyAddresses } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PropertyAddresses', demoPropertyAddresses);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PropertyAddresses', null, {});
  }
};
