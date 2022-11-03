const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../utils/roles");
const googleOauth2 = require("../utils/oauth2/google");
const facebookOauth2 = require("../utils/oauth2/facebook");
const userType = require("../utils/oauth2/enum");

module.exports = {
  //membuat autentikasi register dan login untuk user game
  register: async (req, res, next) => {
    try {
      const { name, username, email, password, role = roles.user } = req.body;

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
        name,
        username,
        email,
        password: encryptedPassword,
        role: role,
      });

      return res.status(201).json({
        status: true,
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
  login: async (req, res, next) => {
    try {
      const user = await user_game.authenticate(req.body);

      const accesstoken = user.generateToken();

      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          id: user.id,
          username: user.username,
          role: user.role,
          token: accesstoken,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  //login google
  google: async (req, res, next) => {
    try {
      const code = req.query.code;

      // form login jika code tidak ada
      if (!code) {
        const url = googleOauth2.generateAuthURL();
        return res.redirect(url);
      }

      // get token
      await googleOauth2.setCredentials(code);

      // get data user
      const { data } = await googleOauth2.getUserData();

      // check apakah user email ada di database
      let userExist = await user_game.findOne({ where: { email: data.email } });

      // if !ada -> simpan data user
      if (!userExist) {
        userExist = await user_game.create({
          name: data.name,
          email: data.email,
          role: userType.google,
        });
      }

      // generate token
      const payload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      // return token
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user_id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  //login facebook
  facebook: async (req, res, next) => {
    try {
      const code = req.query.code;

      // form login jika code tidak ada
      if (!code) {
        const url = facebookOauth2.generateAuthURL();
        return res.redirect(url);
      }

      // acces_token
      const access_token = await facebookOauth2.getAccessToken(code);

      // get user info
      const userInfo = await facebookOauth2.getUserInfo(access_token);

      // check apakah user email ada di database
      const userExist = await User.findOne({
        where: { email: userInfo.email },
      });

      // if !ada -> simpan data user
      if (!userExist) {
        userExist = await User.create({
          name: [userInfo.first_name, userInfo.Last_name].join(" "),
          email: userInfo.email,
          role: userType.facebook,
        });
      }

      // generate token
      const payload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      // return token
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user_id: userExist.id,
          name: userExist.name,
          email: userExist.email,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
