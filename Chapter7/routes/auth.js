const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

//login biasa
router.post("/user/register", controller.auth.register);
router.post("/user/login", controller.auth.login);

// login oauth google
router.get("/login/google", controller.auth.google);

// login oauth facebook
router.get("/login/facebook", controller.auth.facebook);

module.exports = router;
