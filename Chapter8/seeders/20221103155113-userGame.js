"use strict";
const bcrypt = require("bcrypt");

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const passwprdHash = await bcrypt.hash(password, salt);
  return passwprdHash;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_games", [
      {
        name: "AdminJohn",
        username: "jtps",
        email: "admin@example.com",
        password: await hash("password123"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "UserJohn",
        username: "userjtps",
        email: "user@example.com",
        password: await hash("userpassword123"),
        role: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_games", null, {});
  },
};
