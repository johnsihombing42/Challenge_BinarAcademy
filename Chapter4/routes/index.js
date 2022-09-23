const express = require("express");
const user = require("./userGame");
const user_biodata = require("./userBiodata");
const usershistory = require("./userHistory");
const router = express.Router();

router.use("/users", user);
router.use("/biodata", user_biodata);
router.use("/history", usershistory);

module.exports = router;
