const languageModel = require("../models/Language");

exports.addLanguage = async (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  console.log(req.body);
  try {
    const language = await languageModel.create({ name: name, userId: userId });

    console.log(language);
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
