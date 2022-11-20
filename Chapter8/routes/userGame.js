const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helpers/middleware");
const authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");

router.get("/show", middleware.mustLogin, userController.user_game.read);
router.get(
  "/show/:userId",
  middleware.mustLogin,
  userController.user_game.readDetailUser
);
router.put(
  "/:userId",
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userController.user_game.update
);
router.delete(
  "/:userId",
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userController.user_game.delete
);

//transaction route
router.post("/transaction", userController.transaction.paymentStatus);

module.exports = router;
module.exports = router;
