const express = require("express");
const router = express.Router();
const verifyUser = require("../util/verifyUser");
const UserControllers = require("../controllers/UserController");


router.get("/user", UserControllers.fetchUserById);
router.put("/updateuser", verifyUser, UserControllers.updateUser);

module.exports = router;
