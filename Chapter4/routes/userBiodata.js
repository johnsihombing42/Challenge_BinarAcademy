const express = require("express");
const router = express.Router();
const userBiodata = require("../controller");
const middleware = require("../helpers/middleware");

router.get(
  "/show",
  middleware.mustLogin,
  userBiodata.user_game_biodata.readAllData
);
router.get(
  "/show/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.readDetailUser
);
router.post(
  "/create",
  middleware.mustLogin,
  userBiodata.user_game_biodata.createUserBiodata
);
router.patch(
  "/update/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.updateUserBiodata
);
router.delete(
  "/delete/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.deleteUserBiodata
);

module.exports = router;
