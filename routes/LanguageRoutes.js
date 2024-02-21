const express = require("express");
const router = express.Router();
const verifyUser = require("../util/verifyUser");
const languageControllers = require("../controllers/LanguageController");

router.get(
  "/fetchlanguages",
  verifyUser,
  languageControllers.fetchLanguagesByUserId
);
router.get(
  "/card/:languageId",
  verifyUser,
  languageControllers.fetchCardByUserAndLanguageId
);

router.post("/addlanguage", verifyUser, languageControllers.addLanguage);
router.post("/addcard", verifyUser, languageControllers.addCard);
router.delete("/card/:id", verifyUser, languageControllers.deleteCard);
module.exports = router;
