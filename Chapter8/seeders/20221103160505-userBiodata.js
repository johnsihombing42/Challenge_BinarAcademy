"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_game_biodata", [
      {
        id_user: 10,
        name: "Sihombing",
        email: "sihombing@example.com",
        address: "Medan",
        phone: "085757",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: 11,
        name: "Putra",
        email: "putra@example.com",
        address: "Jakarta",
        phone: "08123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_game_biodata", null, {});
  },
};
