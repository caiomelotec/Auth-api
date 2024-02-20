const express = require("express");
const router = express.Router();
const verifyUser = require("../util/verifyUser");
const languageControllers = require("../controllers/LanguageController");

router.get(
  "/fetchlanguages",
  verifyUser,
  languageControllers.fetchLanguagesByUserId
);
router.post("/addlanguage", verifyUser, languageControllers.addLanguage);

module.exports = router;
