const express = require("express");
const user = require("./userGame");
const user_biodata = require("./userBiodata");
const user_history = require("./userHistory");
const auth = require("./auth");
const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);
router.use("/biodata", user_biodata);
router.use("/history", user_history);

module.exports = router;
