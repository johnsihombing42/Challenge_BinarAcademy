"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    generateToken() {
      const payload = {
        id: this.id,
        username: this.username,
        role: this.role,
      };

      return jwt.sign(payload, process.env.JWT_SECRET_KEY);
    }

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username: username } });
        if (!user) return Promise.reject(new Error("user not found!"));

        const valid = user.checkPassword(password);
        if (!valid) return Promise.reject(new Error("wrong password!"));

        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  user_game.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game",
    }
  );
  return user_game;
};
