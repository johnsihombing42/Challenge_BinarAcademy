const express = require("express");
const router = express.Router();
const userController = require("../controller");

router.post("/register", userController.user_game.registerUser);
router.post("/login", userController.user_game.loginUser);

module.exports = router;
