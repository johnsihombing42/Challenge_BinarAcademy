const express = require("express");
const router = express.Router();
const userHistory = require("../controllers");
const middleware = require("../helpers/middleware");
const authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");

router.get(
  "/",
  middleware.mustLogin,
  userHistory.user_game_history.readUserHistory
);
router.get(
  "/show/:userId",
  middleware.mustLogin,
  userHistory.user_game_history.readDetailHistory
);
router.post(
  "/",
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userHistory.user_game_history.create
);
router.put(
  "/:userId",
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userHistory.user_game_history.update
);
router.delete(
  "/:userId",
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userHistory.user_game_history.delete
);

module.exports = router;
