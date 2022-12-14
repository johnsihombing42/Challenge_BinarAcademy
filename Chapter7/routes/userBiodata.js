const express = require("express");
const router = express.Router();
const userBiodata = require("../controllers");
const middleware = require("../helpers/middleware");
const restrict = require("../middlewares/restrict");
const authorize = require("../middlewares/authorize");
const roles = require("../utils/roles");

router.get(
  "/",
  middleware.mustLogin,
  userBiodata.user_game_biodata.readAllData
);
router.get(
  "/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.readDetailUser
);

router.post(
  "/",
  restrict,
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userBiodata.user_game_biodata.create
);
router.put(
  "/:userId",
  restrict,
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userBiodata.user_game_biodata.update
);
router.delete(
  "/:userId",
  restrict,
  authorize([roles.admin, roles.superadmin]),
  middleware.mustLogin,
  userBiodata.user_game_biodata.delete
);

module.exports = router;
