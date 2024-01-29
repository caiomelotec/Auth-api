const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/AuthController");

router.post("/register", AuthControllers.register);

module.exports = router;
