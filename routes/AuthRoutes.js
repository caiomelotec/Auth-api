const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/AuthController");

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
router.post("/google", AuthControllers.google);
router.post("/logout", AuthControllers.logout);

module.exports = router;
