const express = require("express");
const router = express.Router();
const userHistory = require("../controller/");
const middleware = require("../helpers/middleware");

router.get(
  "/show",
  middleware.mustLogin,
  userHistory.user_game_history.readUserHistory
);
router.get(
  "/show/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.readDetailHistory
);
router.post(
  "/create",
  middleware.mustLogin,
  userHistory.user_game_history.createUserHistory
);
router.patch(
  "/update/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.updateUserHistory
);
router.delete(
  "/delete/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.deleteUserHistory
);

module.exports = router;
