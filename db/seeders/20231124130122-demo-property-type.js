'use strict';

const { demoPropertyTypes } = require('../mock-data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PropertyTypes', demoPropertyTypes);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PropertyTypes', null, {});
  }
};
