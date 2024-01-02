'use strict';

const { demoProperties } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Properties', demoProperties);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Properties', null, {});
  }
};
