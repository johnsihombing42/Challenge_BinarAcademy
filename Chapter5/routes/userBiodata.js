const express = require("express");
const router = express.Router();
const userBiodata = require("../controller");
const middleware = require("../helpers/middleware");

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
  middleware.mustLogin,
  userBiodata.user_game_biodata.createUserBiodata
);
router.put(
  "/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.updateUserBiodata
);
router.delete(
  "/:userId",
  middleware.mustLogin,
  userBiodata.user_game_biodata.deleteUserBiodata
);

module.exports = router;
