'use strict';

const { demoDealStatuses } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DealStatuses', demoDealStatuses);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DealStatuses', null, {});
  }
};
