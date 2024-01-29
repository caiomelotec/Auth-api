const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/UserController");

router.get("/", UserControllers.hello);

module.exports = router;
