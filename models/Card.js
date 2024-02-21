const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  languageId: {
    type: mongoose.Schema.ObjectId,
    ref: "languages",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
