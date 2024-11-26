'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        name: 'Peinture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4c',
        name: 'Sculpture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4d',
        name: 'Photographie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4e',
        name: 'Dessin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
