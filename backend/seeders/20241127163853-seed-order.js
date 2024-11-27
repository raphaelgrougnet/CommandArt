'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2025, 0, 1);

    function getRandomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    await queryInterface.bulkInsert('Orders', [
      {
        id: '4f7f0f0c-4c3f-4b1e-9e6d-1e8b0f5a1d8c',
        name: 'Order 1',
        description: 'Description 1',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: '1c92d41a-f437-4b67-abd1-ec5931029bf0',
        name: 'Order 2',
        description: 'Description 2',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: 'd5b1552c-572b-491e-9441-52fe0d4ae234',
        name: 'Order 3',
        description: 'Description 3',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: '4561908b-49c6-42fe-bc47-7aeb52a95586',
        name: 'Order 4',
        description: 'Description 4',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: '47f25a70-c204-41bd-ab85-f348209b05e8',
        name: 'Order 5',
        description: 'Description 5',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: '563a622e-472c-4b11-9d30-487c31d79796',
        name: 'Order 6',
        description: 'Description 6',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
      {
        id: '04d7f189-01e3-4148-b42f-dad0299b47df',
        name: 'Order 7',
        description: 'Description 7',
        cost: 100.00,
        limitDate: getRandomDate(startDate, endDate),
        maxRadius: 100.00,
        userId: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
        categoryId: '5c1f3e5f-4a9c-4e4b-8c0f-1b6f3e8f4f4b',
        createdAt: getRandomDate(startDate, endDate),
        updatedAt: getRandomDate(startDate, endDate)
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};