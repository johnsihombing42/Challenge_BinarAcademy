const express = require("express");
const router = express.Router();
const userController = require("../controller");
const middleware = require("../helpers/middleware");

router.get("/", middleware.mustLogin, userController.user_game.readAllData);
router.get(
  "/:userId",
  middleware.mustLogin,
  userController.user_game.readDetailUser
);
router.put(
  "/:userId",
  middleware.mustLogin,
  userController.user_game.updateUserGame
);
router.delete(
  "/:userId",
  middleware.mustLogin,
  userController.user_game.deleteDataUser
);

module.exports = router;
