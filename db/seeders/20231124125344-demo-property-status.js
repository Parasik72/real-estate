'use strict';

const { demoPropertyStatuses } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PropertyStatuses', demoPropertyStatuses);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PropertyStatuses', null, {});
  }
};
