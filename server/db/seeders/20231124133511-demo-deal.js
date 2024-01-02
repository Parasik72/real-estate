'use strict';

const { demoDeals } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Deals', demoDeals);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Deals', null, {});
  }
};
