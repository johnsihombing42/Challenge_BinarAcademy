var express = require("express");
var router = express.Router();
var auth = require("../controllers/authController");
var mid = require("../helpers/middleware");
var userBiodata = require("../controllers/userBiodata");
var userHistory = require("../controllers/userHistory");

router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.post("/auth/whoami", mid.mustLogin, auth.whoami);

router.post("/userbiodata", mid.mustLogin, userBiodata.create);
router.get("/userbiodata", mid.mustLogin, userBiodata.readAllData);
// router.get("/userbiodata/:userId", mid.mustLogin, userBiodata.readDetailUser);
router.put("/userbiodata/:userId", mid.mustLogin, userBiodata.update);
router.delete("userbiodata/:userId", mid.mustLogin, userBiodata.delete);

router.post("/userhistory", mid.mustLogin, userHistory.create);
router.get("/userhistory", mid.mustLogin, userHistory.readUserHistory);
router.put("/userhistory:userId", mid.mustLogin, userHistory.update);
router.delete("/userhistory:userId", mid.mustLogin, userHistory.delete);

module.exports = router;
