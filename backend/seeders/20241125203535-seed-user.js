'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                id: 'a815906d-7056-4869-aa4b-f83d4cf668ff',
                username: 'user_admin',
                email: 'admin@asp.ca',
                password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
                address: '601 avenue Baillairgé',
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'a815906d-7056-4869-aa4b-f83d4cf668cc',
                username: 'user_a',
                email: 'a@asp.ca',
                password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
                address: '601 avenue Baillairgé',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
              id: 'a815906d-7056-4869-aa4b-f83d4cf668cd',
              username: 'user_b',
              email: 'b@asp.ca',
              password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
              address: '123 Main St',
              isAdmin: false,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
                id: 'a815906d-7056-4869-aa4b-f83d4cf668ce',
                username: 'user_c',
                email: 'c@asp.ca',
                password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
                address: '123 Main St',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'a815906d-7056-4869-aa4b-f83d4cf668cf',
                username: 'user_d',
                email: 'd@asp.ca',
                password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
                address: '123 Main St',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'a815906d-7056-4869-aa4b-f83d4cf668cg',
                username: 'user_e',
                email: 'e@asp.ca',
                password: '$2a$12$yCPQpr9OvET25/FE4zuLcOasrxgOxtDDYefzCTsiPbWo5TeLJ.x.m', // password: 'G@rn3@u!'
                address: '123 Main St',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};