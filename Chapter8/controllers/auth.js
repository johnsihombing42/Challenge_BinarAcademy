const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../utils/roles");
const googleOauth2 = require("../utils/oauth2/google");
const facebookOauth2 = require("../utils/oauth2/facebook");
const userType = require("../utils/oauth2/enum");
const util = require("../utils");

const { JWT_SECRET_KEY } = process.env;

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

      const link = `http://localhost:3000/auth/verify`;

      htmlEmail = await util.email.getHtml("welcome.ejs", {
        name: user.name,
        link: link,
      });

      await util.email.sendEmail(user.email, "Welcome", htmlEmail);

      return res.status(201).json({
        status: true,
        message: "Register user success",
        data: {
          user_game: user.username,
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

  forgotPasswordView: (req, res) => {
    return res.render("auth/forgot-password", { message: null });
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await user_game.findOne({ where: { email } });
      if (user) {
        const payload = { user_id: user.id };
        const token = jwt.sign(payload, JWT_SECRET_KEY);
        const link = `http://localhost:3000/auth/reset-password?token=${token}`;

        htmlEmail = await util.email.getHtml("reset-password.ejs", {
          name: user.name,
          link: link,
        });
        await util.email.sendEmail(
          user.email,
          "Reset your password",
          htmlEmail
        );
      }

      return res.render("auth/forgot-password", {
        message:
          "we will send email for reset password if the email is exist on our database!",
      });
    } catch (err) {
      next(err);
    }
  },

  resetPasswordView: (req, res) => {
    const { token } = req.query;
    return res.render("auth/reset-password", { message: null, token });
  },

  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;
      const { new_password, confirm_new_password } = req.body;

      console.log("TOKEN :", token);

      if (!token)
        return res.render("auth/reset-password", {
          message: "invalid token",
          token,
        });
      if (new_password != confirm_new_password)
        return res.render("auth/reset-password", {
          message: "password doesn't match!",
          token,
        });

      const payload = jwt.verify(token, JWT_SECRET_KEY);

      const encryptedPassword = await bcrypt.hash(new_password, 10);

      const user = await user_game.update(
        { password: encryptedPassword },
        { where: { id: payload.user_id } }
      );
      return res.render("auth/login", { error: null });
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
      const userExist = await user_game.findOne({
        where: { email: userInfo.email },
      });

      // if !ada -> simpan data user
      if (!userExist) {
        userExist = await user_game.create({
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
