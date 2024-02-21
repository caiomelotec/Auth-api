const Card = require("../models/Card");
const languageModel = require("../models/Language");

exports.addLanguage = async (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  console.log(req.body);
  try {
    const language = await languageModel.create({ name: name, userId: userId });

    if (language) {
      res.status(200).send({ message: "language added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error in adding language" });
  }
};

exports.fetchLanguagesByUserId = async (req, res) => {
  const user = req.session.userId;
  try {
    const languages = await languageModel.find({ userId: user });

    const lang = languages.map((language) => ({
      id: language._id,
      name: language.name,
      userId: language.userId,
    }));

    res.status(200).send({ lang });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Error in fetching languages" });
  }
};
exports.addCard = async (req, res) => {
  const userId = req.session.userId;
  const { word, meaning, languageId } = req.body;
  try {
    const card = await Card.create({ word, meaning, languageId, userId });

    if (card) {
      res.status(200).send({ message: "card added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error in adding card" });
  }
};
exports.fetchCardByUserAndLanguageId = async (req, res) => {
  const userId = req.session.userId;
  const languageId = req.params.languageId;
  // console.log(req.params);
  try {
    const cards = await Card.find({ userId, languageId });
    // console.log(cards);
    res.status(200).send({ cards });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Error in fetching cards" });
  }
};

exports.deleteCard = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Card.findOneAndDelete({ _id: id });
    if (result) {
      res.status(200).send({ message: "card deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error in deleting card" });
  }
};
