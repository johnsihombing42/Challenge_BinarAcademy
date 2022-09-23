const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  //membuat autentikasi register dan login untuk user game
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existUser = await user_game.findOne({
        where: { username: username },
      });
      if (existUser) {
        return res.status(409).json({
          status: false,
          message: "username already used!",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username,
        password: encryptedPassword,
      });

      return res.status(201).json({
        status: false,
        message: "Register user success",
        data: {
          username: user.username,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  //autentikasi login
  loginUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await user_game.findOne({ where: { username: username } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }

      const correct = await bcrypt.compare(password, user.password);
      if (!correct) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }

      // generate token
      payload = {
        id: user.id,
        username: user.username,
        password: user.password,
      };
      const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

      return res.status(200).json({
        status: false,
        message: "success",
        data: {
          token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  //Membuat fungsi untuk melakukan CRUD usergame
  readAllData: async (req, res) => {
    try {
      const userData = req.user;
      const user = await user_game.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read all data",
        data: user,
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

  updateUserGame: async (req, res) => {
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
  deleteDataUser: async (req, res) => {
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
