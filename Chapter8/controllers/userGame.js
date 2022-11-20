const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../utils/roles");

module.exports = {
  //Membuat fungsi untuk melakukan CRUD usergame
  read: async (req, res) => {
    try {
      const user = await user_game.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read all data",
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  readDetailUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await user_game.findOne({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Read Data",
        data: user,
      });
    } catch (error) {
      res.json(error).status(422);
    }
  },

  update: async (req, res) => {
    try {
      const { username, password } = req.body;
      const { userId } = req.params;
      const newuser = await user_game.findAll();

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.update(
        {
          username,
          password: encryptedPassword,
        },
        {
          where: { id: userId },
        }
      );
      return res.status(200).json({
        status: "success",
        mesage: "Update data success",
        data: user,
        data: newuser,
      });
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await user_game.destroy({
        where: { id: userId },
      });
      return res.status(200).json({
        status: "success",
        mesage: "Delete data success",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
