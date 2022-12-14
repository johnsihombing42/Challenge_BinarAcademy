const express = require("express");
const router = express.Router();
const userHistory = require("../controller/");
const middleware = require("../helpers/middleware");

router.get(
  "/",
  middleware.mustLogin,
  userHistory.user_game_history.readUserHistory
);
router.get(
  "/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.readDetailHistory
);
router.post(
  "/",
  middleware.mustLogin,
  userHistory.user_game_history.createUserHistory
);
router.put(
  "/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.updateUserHistory
);
router.delete(
  "/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.deleteUserHistory
);

module.exports = router;
