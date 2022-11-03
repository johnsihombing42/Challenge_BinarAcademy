const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

//login biasa
router.post("/user/register", controller.auth.register);
router.post("/user/login", controller.auth.login);

router.get("/login/google", controller.auth.google);
router.get("/login/facebook", controller.auth.facebook);
// login oauth

module.exports = router;
